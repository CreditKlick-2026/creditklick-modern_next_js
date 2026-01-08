"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BiSolidTachometer } from "react-icons/bi";
import { FaUser, FaTags } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { MdNewReleases } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { Loader2, AlertCircle, Info, Bookmark, CreditCard, Users, ArrowLeft, HelpCircle, MessageSquare } from 'lucide-react'
import { creditReportAPI } from '@/services/api'
import experianImg from '@/assets/Images/experian.png'
import Cookies from 'js-cookie'

import PDFDownloadButton from '@/components/ReportAnalysis/PDFDownloadButton';

// --- Constants & Helpers ---

const STATUS_CODES = {
    ACTIVE: ["11", "71", "78", "80", "82", "83", "84", "DEFAULTVALUE", "21", "22", "23", "24", "25"],
    CLOSED: ["13", "14", "15", "16", "17", "12"],
    NEGATIVE: ["0", "89", "93", "97", "32", "33", "36", "37", "38", "43", "45", "47", "48", "49", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "66", "67", "68", "69", "70", "72", "73", "74", "75", "77", "79", "81", "85", "86", "87", "88", "94", "90", "91"]
};

const ACCOUNT_TYPES: any = {
    CREDIT_CARD: ["10", "31", "35", "36"],
    HOME_LOAN: ["2", "3", "42", "44"],
    PERSONAL_LOAN: ["5", "9", "41", "45"],
    AUTO_LOAN: ["1", "13", "17", "32", "34", "46"],
};

const dateformat = (dateStr: any) => {
    if (!dateStr) return "N/A";
    const str = String(dateStr).trim();
    if (!str) return "N/A";
    if (/^\d{8}$/.test(str)) {
        return `${str.substring(6, 8)}-${str.substring(4, 6)}-${str.substring(0, 4)}`;
    }
    return str;
};

function HistoryToDates(inputArray: any[] = []) {
    if (!inputArray) return {};
    const resultObject: any = {};

    inputArray.forEach((item) => {
        const yearNode = item.children?.find((child: any) => child.name === "Year");
        const monthNode = item.children?.find((child: any) => child.name === "Month");
        const daysNode = item.children?.find((child: any) => child.name === "Days_Past_Due");

        if (yearNode && monthNode && daysNode) {
            const year = yearNode.value;
            const month = monthNode.value;
            const daysPastDue = daysNode.value;

            if (!resultObject[year]) {
                resultObject[year] = [];
            }
            resultObject[year].push({ month, value: daysPastDue });
        }
    });

    return resultObject;
}

const findValueInXMLJSON = (node: any, targetName: string): any => {
    if (!node) return null;
    if (node.name === targetName) {
        if (node.value) return node.value;
        if (node.content) return node.content;
        if (node.children && node.children.length > 0 && node.children[0].value) return node.children[0].value;
        return null;
    }
    if (node.children && Array.isArray(node.children)) {
        for (let child of node.children) {
            const result = findValueInXMLJSON(child, targetName);
            if (result) return result;
        }
    }
    return null;
}

const findNodesInXMLJSON = (node: any, targetName: string): any[] => {
    let results: any[] = [];
    if (!node) return results;
    if (node.name === targetName) results.push(node);
    if (node.children && Array.isArray(node.children)) {
        for (let child of node.children) {
            results = results.concat(findNodesInXMLJSON(child, targetName));
        }
    }
    return results;
}

function parseExperianReport(rawData: any) {
    if (!rawData) return null
    let data = rawData
    if (typeof rawData === 'string') {
        try { data = JSON.parse(rawData) } catch (e) { console.error('Parse error:', e); return null }
    }

    let report: any = {
        score: 0,
        name: 'User',
        reportDate: new Date().toLocaleDateString(),
        accounts: [],
        enquiries: [],
        summary: null,
        enquirySummary: null,
        personalInfo: {}
    };

    if (data.children) {
        const scoreVal = findValueInXMLJSON(data, 'SCORE') || findValueInXMLJSON(data, 'Score') || findValueInXMLJSON(data, 'BureauScore');
        if (scoreVal) report.score = parseInt(scoreVal, 10);

        report.name = findValueInXMLJSON(data, 'ConsumerName1') || findValueInXMLJSON(data, 'Name') || findValueInXMLJSON(data, 'First_Name') || 'User';
        report.personalInfo = {
            dob: findValueInXMLJSON(data, 'Date_Of_Birth_Applicant') || findValueInXMLJSON(data, 'Date_of_Birth'),
            pan: findValueInXMLJSON(data, 'IncomeTaxPan') || findValueInXMLJSON(data, 'Income_TAX_PAN') || findValueInXMLJSON(data, 'Income_Tax_PAN'),
            passport: findValueInXMLJSON(data, 'Passport_number') || findValueInXMLJSON(data, 'Passport_Number'),
            voterId: findValueInXMLJSON(data, 'Voter_s_Identity_Card') || findValueInXMLJSON(data, 'Voter_ID_Number'),
            driverLicense: findValueInXMLJSON(data, 'Driver_License_Number'),
            mobile: findValueInXMLJSON(data, 'MobilePhoneNumber') || findValueInXMLJSON(data, 'Mobile_Telephone_Number') || findValueInXMLJSON(data, 'Telephone_Number'),
            email: findValueInXMLJSON(data, 'EMailId') || findValueInXMLJSON(data, 'Email_ID')
        };

        const addressNodes = [
            ...findNodesInXMLJSON(data, 'Current_Applicant_Address_Details'),
            ...findNodesInXMLJSON(data, 'CAIS_Holder_Address_Details'),
            ...findNodesInXMLJSON(data, 'CAPS_Applicant_Address_Details')
        ];

        const uniqueAddresses = new Set();
        addressNodes.forEach(node => {
            const addrLine1 = findValueInXMLJSON(node, 'First_Line_Of_Address_non_normalized') || findValueInXMLJSON(node, 'FlatNoPlotNoHouseNo') || '';
            const addrLine2 = findValueInXMLJSON(node, 'Second_Line_Of_Address_non_normalized') || findValueInXMLJSON(node, 'BldgNoSocietyName') || '';
            const addrLine3 = findValueInXMLJSON(node, 'Third_Line_Of_Address_non_normalized') || findValueInXMLJSON(node, 'RoadNoNameAreaLocality') || '';
            const city = findValueInXMLJSON(node, 'City_non_normalized') || findValueInXMLJSON(node, 'City') || '';
            const state = findValueInXMLJSON(node, 'State_non_normalized') || findValueInXMLJSON(node, 'State') || '';
            const pin = findValueInXMLJSON(node, 'ZIP_Postal_Code_non_normalized') || findValueInXMLJSON(node, 'PINCode') || '';

            const fullAddr = `${addrLine1} ${addrLine2} ${addrLine3}, ${city}, ${state} - ${pin}`.replace(/[\s,]+$/g, '').replace(/\s+/g, ' ').trim();
            if (fullAddr.length > 5 && !fullAddr.match(/^[,\-\s]*$/)) {
                uniqueAddresses.add(fullAddr);
            }
        });
        report.personalInfo.addresses = Array.from(uniqueAddresses);
        report.personalInfo.address = report.personalInfo.addresses[0] || '';

        const employmentNode = findNodesInXMLJSON(data, 'Current_Other_Details')[0];
        if (employmentNode) {
            report.personalInfo.income = findValueInXMLJSON(employmentNode, 'Income');
            report.personalInfo.employmentStatus = findValueInXMLJSON(employmentNode, 'Employment_Status');
        }

        const dateVal = findValueInXMLJSON(data, 'Date_of_Issue');
        if (dateVal) report.reportDate = dateformat(dateVal);

        const summaryNodes = findNodesInXMLJSON(data, 'CAIS_Summary');
        if (summaryNodes.length > 0) {
            const summaryNode = summaryNodes[0];
            const creditAccountNode = findNodesInXMLJSON(summaryNode, 'Credit_Account')[0];
            const outstandingNode = findNodesInXMLJSON(summaryNode, 'Total_Outstanding_Balance')[0];

            if (creditAccountNode && outstandingNode) {
                report.summary = {
                    activeCount: parseInt(findValueInXMLJSON(creditAccountNode, 'CreditAccountActive') || findValueInXMLJSON(creditAccountNode, 'Active') || 0),
                    closedCount: parseInt(findValueInXMLJSON(creditAccountNode, 'CreditAccountClosed') || findValueInXMLJSON(creditAccountNode, 'Closed') || 0),
                    defaultCount: parseInt(findValueInXMLJSON(creditAccountNode, 'CreditAccountDefault') || findValueInXMLJSON(creditAccountNode, 'Default') || 0),
                    totalOutstanding: parseInt(findValueInXMLJSON(outstandingNode, 'Outstanding_Balance_All') || findValueInXMLJSON(outstandingNode, 'Outstanding') || 0)
                };
            }
        }

        const accountNodes = findNodesInXMLJSON(data, 'CAIS_Account_DETAILS');
        report.accounts = accountNodes.map(node => {
            const historyProfile = findValueInXMLJSON(node, 'Payment_History_Profile');
            return {
                title: findValueInXMLJSON(node, 'Subscriber_Name') || 'Unknown',
                outstanding: findValueInXMLJSON(node, 'Current_Balance') || '0',
                accountOpenDate: findValueInXMLJSON(node, 'Open_Date'),
                Total_Loan_Amount: findValueInXMLJSON(node, 'Amount_Financed') || findValueInXMLJSON(node, 'Highest_Credit_or_Original_Loan_Amount') || findValueInXMLJSON(node, 'Credit_Limit_Amount') || '0',
                Account_Status: findValueInXMLJSON(node, 'Account_Status') || 'DEFAULTVALUE',
                Last_Pay_date: findValueInXMLJSON(node, 'Date_of_Last_Payment'),
                Account_Type: findValueInXMLJSON(node, 'Account_Type') || '0',
                accNumber: findValueInXMLJSON(node, 'Account_Number'),
                paymentRating: findValueInXMLJSON(node, 'Payment_Rating'),
                dateReported: findValueInXMLJSON(node, 'Date_Reported'),
                paymentHistoryProfile: (!historyProfile || historyProfile === 'N') ? '0' : historyProfile,
                writtenOffAmount: findValueInXMLJSON(node, 'Written_Off_Amt_Total'),
                settlementAmount: findValueInXMLJSON(node, 'Settlement_Amount'),
                suitFiledStatus: findValueInXMLJSON(node, 'SuitFiledWillfulDefaultWrittenOffStatus') || findValueInXMLJSON(node, 'SuitFiled_WilfulDefault'),
                interestRate: findValueInXMLJSON(node, 'Rate_of_Interest'),
                tenure: findValueInXMLJSON(node, 'Repayment_Tenure'),
                paymentFrequency: findValueInXMLJSON(node, 'Terms_Frequency'),
                actualPaymentAmount: findValueInXMLJSON(node, 'Scheduled_Monthly_Payment_Amount'),
                history: findNodesInXMLJSON(node, 'CAIS_Account_History')
            };
        });

        const capsSummary = findNodesInXMLJSON(data, 'TotalCAPS_Summary')[0];
        if (capsSummary) {
            report.enquirySummary = {
                last7Days: findValueInXMLJSON(capsSummary, 'TotalCAPSLast7Days'),
                last30Days: findValueInXMLJSON(capsSummary, 'TotalCAPSLast30Days'),
                last90Days: findValueInXMLJSON(capsSummary, 'TotalCAPSLast90Days'),
                last180Days: findValueInXMLJSON(capsSummary, 'TotalCAPSLast180Days'),
            };
        }

        const enqNodes = findNodesInXMLJSON(data, 'CAPS_Application_Details');
        report.enquiries = enqNodes.map(node => ({
            Subscriber_Name: findValueInXMLJSON(node, 'Subscriber_Name') || 'Unknown',
            Enquiry_Reason: findValueInXMLJSON(node, 'Enquiry_Reason'),
            Amount_Financed: findValueInXMLJSON(node, 'Amount_Financed'),
            Date_of_Enquiry: findValueInXMLJSON(node, 'Date_of_Enquiry')
        }));
    }

    return report;
}

const Speedometer = ({ score }: { score: number }) => {
    const minScore = 300;
    const maxScore = 900;
    const clampedScore = Math.max(minScore, Math.min(maxScore, score));
    const rotation = ((clampedScore - minScore) / (maxScore - minScore)) * 180 - 90;

    return (
        <div className="relative w-48 h-24 mx-auto overflow-hidden">
            <div className="absolute w-48 h-48 rounded-full border-[10px] border-gray-200 top-0 left-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
            <div className={`absolute w-48 h-48 rounded-full border-[10px] top-0 left-0`}
                style={{
                    borderColor: 'transparent',
                    borderTopColor: score >= 750 ? '#16a34a' : score >= 650 ? '#ca8a04' : '#dc2626',
                    borderRightColor: 'transparent',
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    transformOrigin: 'center center',
                    transform: `rotate(${rotation}deg)`
                }}>
            </div>
            <div className="absolute bottom-0 left-1/2 -ml-[1px] w-0.5 h-16 bg-gray-800 origin-bottom" style={{ transform: `rotate(${rotation}deg)` }}></div>
            <div className="absolute bottom-0 left-1/2 -ml-3 mb-[-12px] w-6 h-6 bg-gray-800 rounded-full border-2 border-white"></div>
        </div>
    );
};

const AccountHistory = ({ item }: { item: any }) => {
    const history = HistoryToDates(item?.history);
    const years = Object.keys(history).sort().reverse();
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="w-full mt-4 bg-gray-50 p-2 rounded overflow-x-auto border">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Payment History</h4>
            <table className="w-full text-center text-[10px] border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-1 text-left">Year</th>
                        {monthNames.map(m => <th key={m} className="p-1">{m}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {years.map(year => (
                        <tr key={year} className="border-b whitespace-nowrap">
                            <td className="p-1 text-left font-bold">{year}</td>
                            {months.map(mon => {
                                const record = history[year]?.find((d: any) => d.month === mon);
                                let icon = <span className="text-gray-200">.</span>;
                                if (record) {
                                    icon = record.value === "0" || record.value === "000"
                                        ? <BsCheckLg className="text-green-600 mx-auto" />
                                        : <RiCloseLine className="text-red-600 mx-auto font-bold text-base" />;
                                }
                                return <td key={mon} className="p-1">{icon}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PaymentHistory = ({ accounts }: { accounts: any[] }) => {
    const [openIndex, setOpenIndex] = useState<Record<number, boolean>>({});

    const toggle = (i: number) => {
        setOpenIndex(prev => ({ ...prev, [i]: !prev[i] }));
    };

    return (
        <div className="space-y-4">
            {accounts.map((acc, idx) => {
                const isOpen = openIndex[idx];
                const active = STATUS_CODES.ACTIVE.includes(acc.Account_Status);
                const closed = STATUS_CODES.CLOSED.includes(acc.Account_Status);
                const negative = STATUS_CODES.NEGATIVE.includes(acc.Account_Status);

                return (
                    <div key={idx} className="bg-white border rounded shadow-sm">
                        <div
                            onClick={() => toggle(idx)}
                            className="p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-2 hover:bg-gray-50"
                        >
                            <div className="flex-1">
                                <div className="font-bold text-blue-900 uppercase">
                                    {acc.title}
                                    <span className={`ml-3 text-[10px] px-2 py-0.5 rounded ${active ? 'bg-green-100 text-green-700' : closed ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'}`}>
                                        {active ? 'Active' : closed ? 'Closed' : 'Negative'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 font-medium">Account No: {acc.accNumber}</div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="text-right">
                                    <div className="text-xs text-gray-400 font-bold uppercase">Balance</div>
                                    <div className="font-bold text-emerald-800">₹ {parseInt(acc.outstanding).toLocaleString('en-IN')}</div>
                                </div>
                                <div className={`transform transition ${isOpen ? 'rotate-90' : ''}`}>▶</div>
                            </div>
                        </div>

                        {isOpen && (
                            <div className="p-4 border-t bg-white">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 uppercase font-bold text-[10px]">Type</span>
                                        <span className="font-medium">{acc.Account_Type}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 uppercase font-bold text-[10px]">Opened</span>
                                        <span className="font-medium">{dateformat(acc.accountOpenDate)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 uppercase font-bold text-[10px]">Loan Amt</span>
                                        <span className="font-medium">₹ {parseInt(acc.Total_Loan_Amount).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 uppercase font-bold text-[10px]">Last Pay</span>
                                        <span className="font-medium">{dateformat(acc.Last_Pay_date)}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4 border-t pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 uppercase font-bold text-[10px]">Rating</span>
                                        <span className="font-medium">{acc.paymentRating}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 uppercase font-bold text-[10px]">Reported</span>
                                        <span className="font-medium">{dateformat(acc.dateReported)}</span>
                                    </div>
                                    {acc.writtenOffAmount && acc.writtenOffAmount !== '0' && (
                                        <div className="flex flex-col">
                                            <span className="text-red-400 uppercase font-bold text-[10px]">Written Off</span>
                                            <span className="font-bold text-red-600">₹ {acc.writtenOffAmount}</span>
                                        </div>
                                    )}
                                    {acc.settlementAmount && acc.settlementAmount !== '0' && (
                                        <div className="flex flex-col">
                                            <span className="text-orange-400 uppercase font-bold text-[10px]">Settled</span>
                                            <span className="font-bold text-orange-600">₹ {acc.settlementAmount}</span>
                                        </div>
                                    )}
                                </div>

                                <AccountHistory item={acc} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const TotalAccounts = ({ accounts, summary }: { accounts: any[], summary: any }) => {
    const [filter, setFilter] = useState('ALL');

    const activeCount = summary ? summary.activeCount : accounts.filter(a => STATUS_CODES.ACTIVE.includes(a.Account_Status)).length;
    const closedCount = summary ? summary.closedCount : accounts.filter(a => STATUS_CODES.CLOSED.includes(a.Account_Status)).length;
    const negativeCount = summary ? summary.defaultCount : accounts.filter(a => STATUS_CODES.NEGATIVE.includes(a.Account_Status)).length;
    const totalOutstanding = summary ? summary.totalOutstanding : accounts.reduce((sum, a) => sum + parseInt(a.outstanding || 0), 0);

    const filteredAccounts = accounts.filter(a => {
        if (filter === 'ACTIVE') return STATUS_CODES.ACTIVE.includes(a.Account_Status);
        if (filter === 'CLOSED') return STATUS_CODES.CLOSED.includes(a.Account_Status);
        if (filter === 'NEGATIVE') return STATUS_CODES.NEGATIVE.includes(a.Account_Status);
        return true;
    });

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div onClick={() => setFilter('ACTIVE')} className={`p-4 bg-white shadow rounded text-center cursor-pointer border-b-4 ${filter === 'ACTIVE' ? 'border-green-600 bg-green-50' : 'border-transparent'}`}>
                    <div className="text-2xl font-bold text-green-700">{activeCount}</div>
                    <div className="text-xs uppercase text-gray-500 font-semibold tracking-tighter">Active Accounts</div>
                </div>
                <div onClick={() => setFilter('CLOSED')} className={`p-4 bg-white shadow rounded text-center cursor-pointer border-b-4 ${filter === 'CLOSED' ? 'border-gray-500 bg-gray-50' : 'border-transparent'}`}>
                    <div className="text-2xl font-bold text-gray-700">{closedCount}</div>
                    <div className="text-xs uppercase text-gray-500 font-semibold tracking-tighter">Closed Accounts</div>
                </div>
                <div onClick={() => setFilter('NEGATIVE')} className={`p-4 bg-white shadow rounded text-center cursor-pointer border-b-4 ${filter === 'NEGATIVE' ? 'border-red-600 bg-red-50' : 'border-transparent'}`}>
                    <div className="text-2xl font-bold text-red-700">{negativeCount}</div>
                    <div className="text-xs uppercase text-gray-500 font-semibold tracking-tighter">Negative Accounts</div>
                </div>
                <div className="p-4 bg-white shadow rounded text-center">
                    <div className="text-2xl font-bold text-blue-900">₹ {totalOutstanding.toLocaleString('en-IN')}</div>
                    <div className="text-xs uppercase text-gray-500 font-semibold tracking-tighter">Total Outstanding</div>
                </div>
            </div>

            <div className="flex justify-between items-center py-2">
                <h3 className="text-lg font-bold text-gray-700 uppercase">
                    {filter === 'ALL' ? 'Total Accounts' : `${filter} Accounts`}
                </h3>
                {filter !== 'ALL' && <button onClick={() => setFilter('ALL')} className="text-xs font-bold text-blue-600 hover:underline">Show All</button>}
            </div>

            <PaymentHistory accounts={filteredAccounts} />
        </div>
    );
};

const Profile = ({ userDetails }: { userDetails: any }) => (
    <div className="my-4 shadow-lg bg-white rounded-lg min-h-[500px]">
        <div className="flex items-center gap-4 p-6 text-lg tracking-widest font-semibold text-blue-900 border-b">
            <FaUser /> PERSONAL DETAILS
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 p-6 gap-6">
            {Object.entries(userDetails).map(([key, value]) => {
                if (!value) return null;
                return (
                    <div key={key} className="flex flex-col">
                        <label className="uppercase tracking-widest text-xs font-semibold text-gray-500 mb-2">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="w-full p-3 bg-gray-100 rounded text-gray-700 font-medium text-sm">
                            {Array.isArray(value) ? (
                                <ul className="list-disc pl-4 space-y-1">
                                    {value.map((v: any, i) => <li key={i}>{v}</li>)}
                                </ul>
                            ) : value as string}
                        </div>
                    </div>
                )
            })}
        </div>
        <p className="italic p-6 text-xs text-gray-500">
            For any change or updation, please contact customer support.
        </p>
    </div>
);

const Offers = () => {
    const [activeOffer, setActiveOffer] = useState('loans');
    return (
        <div className="my-4">
            <div className="flex justify-center gap-8 mb-8">
                <div onClick={() => setActiveOffer('loans')} className={`cursor-pointer p-4 rounded-xl border-2 hover:shadow-lg transition ${activeOffer === 'loans' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <div className="text-center">
                        <h3 className="text-blue-900 font-bold uppercase text-lg">Loan <span className="text-red-600">Offers*</span></h3>
                        <p className="text-xs text-red-500 animate-pulse mt-2">Check Now</p>
                    </div>
                </div>
                <div onClick={() => setActiveOffer('cards')} className={`cursor-pointer p-4 rounded-xl border-2 hover:shadow-lg transition ${activeOffer === 'cards' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                    <div className="text-center">
                        <h3 className="text-blue-900 font-bold uppercase text-lg">Card <span className="text-red-600">Offers*</span></h3>
                        <p className="text-xs text-red-500 animate-pulse mt-2">Check Now</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow min-h-[300px] flex items-center justify-center text-gray-500">
                {activeOffer === 'loans' ? "No Exclusive Loan Offers at the moment." : "No Exclusive Card Offers at the moment."}
            </div>
        </div>
    )
};

const CreditEnquiries = ({ enquiries, summary }: { enquiries: any[], summary: any }) => (
    <div className="space-y-6">
        {summary && (
            <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <div className="text-xl font-bold text-blue-900">{summary.last7Days || 0}</div>
                    <div className="text-[10px] uppercase text-gray-500">7 Days</div>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <div className="text-xl font-bold text-blue-900">{summary.last30Days || 0}</div>
                    <div className="text-[10px] uppercase text-gray-500">30 Days</div>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <div className="text-xl font-bold text-blue-900">{summary.last90Days || 0}</div>
                    <div className="text-[10px] uppercase text-gray-500">90 Days</div>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <div className="text-xl font-bold text-blue-900">{summary.last180Days || 0}</div>
                    <div className="text-[10px] uppercase text-gray-500">180 Days</div>
                </div>
            </div>
        )}
        <div className="bg-white p-4 rounded shadow-lg min-h-[300px]">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Recent Enquiries</h3>
            {enquiries.length === 0 ? <p className="text-gray-500">No recent enquiries found.</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-4 py-2">Institution</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Reason</th>
                                <th className="px-4 py-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.map((enq, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium">{enq.Subscriber_Name}</td>
                                    <td className="px-4 py-2">{dateformat(enq.Date_of_Enquiry)}</td>
                                    <td className="px-4 py-2">{enq.Enquiry_Reason}</td>
                                    <td className="px-4 py-2 text-right">₹ {parseInt(enq.Amount_Financed || 0).toLocaleString('en-IN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
);

const CreditUtilization = ({ accounts }: { accounts: any[] }) => {
    const cards = accounts.filter(a => ACCOUNT_TYPES.CREDIT_CARD.includes(a.Account_Type));

    return (
        <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Credit Card Utilization</h3>
            {cards.length === 0 ? <p className="text-gray-500">No credit cards found.</p> : (
                <div className="space-y-6">
                    {cards.map((acc, i) => {
                        const limit = parseInt(acc.Total_Loan_Amount || 0);
                        const bal = parseInt(acc.outstanding || 0);
                        const util = limit > 0 ? Math.round((bal / limit) * 100) : 0;
                        const isHigh = util > 30;

                        return (
                            <div key={i}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-sm text-blue-900">{acc.title}</span>
                                    <span className={`text-xs font-bold ${isHigh ? 'text-red-500' : 'text-green-600'}`}>{util}% Utilized</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className={`h-2.5 rounded-full ${isHigh ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(util, 100)}%` }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                    <span>Current: ₹ {bal.toLocaleString('en-IN')}</span>
                                    <span>Limit: ₹ {limit.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default function ReportAnalysisClient() {
    const [activeComponent, setActiveComponent] = useState('Credit Report');
    const [activeTab, setActiveTab] = useState('Total Accounts');
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadReport = async () => {
            try {
                const cachedCibil = Cookies.get('cibil')
                const user = JSON.parse(Cookies.get('user') || '{ }')
                let rawData = null;

                if (cachedCibil) {
                    const parsedCache = JSON.parse(cachedCibil);
                    rawData = parsedCache.data || parsedCache;
                }

                if (rawData) {
                    const parsed = parseExperianReport(rawData);
                    if (user) {
                        if (!parsed.personalInfo.email && user.e) parsed.personalInfo.email = user.e;
                        if (!parsed.personalInfo.mobile && user.ph) parsed.personalInfo.mobile = user.ph;
                        if (!parsed.name && user.n) parsed.name = user.n;
                    }

                    if (parsed && parsed.score) {
                        setUserData(parsed);
                        setLoading(false);
                        return;
                    }
                }

                if (user.phone) {
                    const response = await creditReportAPI.getByPhone(user.phone)
                    if (response.data.success && response.data.report) {
                        const parsed = parseExperianReport(response.data.report.data);
                        setUserData(parsed);
                        setLoading(false);
                        return;
                    }
                }

                setError("No Report Data Available. Please Login to refresh.");
                setLoading(false);

            } catch (err: any) {
                if (err?.response?.status !== 404) {
                    console.error(err);
                }
                setError("Failed to load report data.");
                setLoading(false);
            }
        }
        loadReport();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>

    if (error || !userData) return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/30 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        <AlertCircle className="w-4 h-4" />
                        Status: Report Unavailable
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                        No Credit Report <span className="text-blue-600">Found</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        We are sorry, as it seems we don&apos;t have any Credit Report generated with the data you provided. This can happen for several technical or financial reasons.
                    </p>

                    <div className="flex items-center justify-center gap-6 mt-8">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group cursor-pointer hover:text-blue-600 transition-colors">
                            <HelpCircle className="w-5 h-5" />
                            <span>Need help?</span>
                        </div>
                        <div className="w-px h-4 bg-slate-200" />
                        <Link href="/contact" className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 w-full max-w-6xl">
                    {/* Left Column included... */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                    <Info className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Why You Might Not Have a Credit Report</h3>
                            </div>
                            <p className="text-slate-500">If you haven&apos;t opened any credit accounts, or lenders don&apos;t report, etc.</p>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4 space-y-8 flex flex-col h-full">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white h-full rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-8 md:p-10 flex flex-col"
                        >
                            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-8">What It Means</h3>
                            <div className="pt-8 mt-auto">
                                <Link href="/credit-score" className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95 group">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back to Check Score</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );

    const { score, name, reportDate, accounts, enquiries, enquirySummary, summary, personalInfo } = userData;
    const profileDetails = {
        Name: name,
        Score: score,
        ReportDate: reportDate,
        Mobile: personalInfo.mobile,
        Email: personalInfo.email,
        PAN: personalInfo.pan,
        DOB: dateformat(personalInfo.dob),
        Passport: personalInfo.passport,
        VoterID: personalInfo.voterId,
        DriverLicense: personalInfo.driverLicense,
        Income: personalInfo.income,
        Employment: personalInfo.employmentStatus,
        Addresses: personalInfo.addresses
    };
    const bandColor = score >= 750 ? 'text-green-600' : score >= 650 ? 'text-yellow-600' : 'text-red-500';
    const bandLabel = score >= 750 ? 'Excellent' : score >= 650 ? 'Good' : score >= 550 ? 'Fair' : 'Poor';

    return (
        <div className="min-h-screen bg-gray-100 py-8 font-sans">
            <div className="container mx-auto px-4 lg:flex justify-evenly">

                {/* Left Sidebar */}
                <div className="lg:w-64 w-full mb-8 lg:mb-0 lg:mr-4 shrink-0">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex lg:flex-col justify-around lg:justify-start lg:py-6 sticky top-24">
                        {['Credit Report', 'My Profile', 'Your Offers'].map(item => (
                            <button
                                key={item}
                                onClick={() => setActiveComponent(item)}
                                className={`flex flex-col lg:flex-row items-center p-4 hover:bg-gray-50 w-full transition border-l-4 ${activeComponent === item ? 'border-blue-900 bg-blue-50' : 'border-transparent'}`}
                            >
                                {item === 'Credit Report' && <BiSolidTachometer className="text-2xl lg:text-3xl text-green-700 mb-2 lg:mb-0 lg:mr-3" />}
                                {item === 'My Profile' && <FaUserLarge className="text-xl lg:text-2xl text-blue-500 mb-2 lg:mb-0 lg:mr-3" />}
                                {item === 'Your Offers' && <FaTags className="text-2xl lg:text-3xl text-red-700 animate-bounce mb-2 lg:mb-0 lg:mr-3" />}
                                <span className="uppercase text-[10px] lg:text-sm font-semibold text-gray-700">{item}</span>
                            </button>
                        ))}
                        <Link href="/refine" className="flex flex-col lg:flex-row items-center p-4 hover:bg-gray-50 w-full no-underline border-l-4 border-transparent">
                            <MdNewReleases className="text-2xl lg:text-3xl text-blue-800 mb-2 lg:mb-0 lg:mr-3" />
                            <span className="uppercase text-[10px] lg:text-sm font-semibold text-gray-700">Refine</span>
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:w-4/5 w-full">
                    {activeComponent === 'Credit Report' && (
                        <div className="space-y-6">
                            {/* Score Card */}
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                                <div className="flex justify-between p-4 border-b items-center">
                                    <Image src={experianImg} alt="experian" className="h-8 md:h-10 object-contain w-auto" />
                                    <div className="flex items-center gap-4">
                                        <PDFDownloadButton
                                            cibilName={name}
                                            cibilScore={score}
                                            reportDate={reportDate}
                                            cibil={accounts}
                                            enq={enquiries}
                                        />
                                        <span className="text-xs text-gray-500 hidden md:block"><b>Report Date:</b>&nbsp;{reportDate}</span>
                                    </div>
                                </div>
                                <div className="p-6 text-center bg-blue-50">
                                    <div className="text-xl md:text-2xl text-blue-900 font-semibold mb-2">
                                        {name}, Your Experian Credit Score is <span className={bandColor}>{score}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
                                        <Speedometer score={score} />
                                        <div className="text-center md:text-left max-w-sm">
                                            <p className="text-gray-600 font-medium mb-2">Your profile is <span className={`font-bold ${bandColor}`}>{bandLabel}</span></p>
                                            <p className="text-sm text-gray-500">
                                                {score >= 750 ? "Great job! Keep maintaining your good habits." : "Some improvements are needed. Check your history below."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Tabs */}
                                <div className="grid grid-cols-2 md:grid-cols-5 border-t">
                                    {['Total Accounts', 'Payment History', 'Credit Utilisation', 'Credit Age', 'Credit Enquiries'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`p-3 text-[10px] md:text-xs font-bold uppercase transition ${activeTab === tab ? 'bg-blue-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content Areas */}
                            <div className="bg-transparent">
                                {activeTab === 'Total Accounts' && <TotalAccounts accounts={accounts} summary={summary} />}
                                {activeTab === 'Payment History' && (
                                    <div className="bg-white p-4 rounded shadow">
                                        <h3 className="mb-4 font-bold text-gray-700">Detailed Payment History</h3>
                                        <PaymentHistory accounts={accounts} />
                                    </div>
                                )}
                                {activeTab === 'Credit Utilisation' && <CreditUtilization accounts={accounts} />}
                                {activeTab === 'Credit Enquiries' && <CreditEnquiries enquiries={enquiries} summary={enquirySummary} />}
                                {activeTab === 'Credit Age' && (
                                    <div className="bg-white p-8 rounded shadow text-center text-gray-500">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">Credit Age Analysis</h3>
                                        <p>Oldest account opened on: <b>{accounts.length ? dateformat(accounts[0].accountOpenDate) : 'N/A'}</b></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeComponent === 'My Profile' && <Profile userDetails={profileDetails} />}
                    {activeComponent === 'Your Offers' && <Offers />}
                </div>

            </div>
        </div>
    );
}
