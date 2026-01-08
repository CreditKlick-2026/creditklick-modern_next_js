"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image as PDFImage } from '@react-pdf/renderer';
import productType from "./productType";
import experian from "@/assets/Images/experian.png";
import { Loader2 } from 'lucide-react';

const dateformat = (dateStr: any) => {
    if (!dateStr) return "N/A";
    const str = String(dateStr).trim();
    if (!str) return "N/A";
    // YYYYMMDD
    if (/^\d{8}$/.test(str)) {
        return `${str.substring(6, 8)}-${str.substring(4, 6)}-${str.substring(0, 4)}`;
    }
    return str;
};

// ... Helper functions and Styles ...

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

const getAccountStatus = (statusCode: string) => {
    if (["11", "71", "78", "80", "82", "83", "84", "DEFAULTVALUE", "21", "22", "23", "24", "25"].includes(statusCode)) {
        return "ACTIVE";
    } else if (["13", "14", "15", "16", "17", "12"].includes(statusCode)) {
        return "CLOSED";
    } else if (["0", "89", "93", "97", "32", "33", "36", "37", "38", "43", "45", "47", "48", "49", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "66", "67", "68", "69", "70", "72", "73", "74", "75", "77", "79", "81", "85", "86", "87", "88", "94", "90", "91"].includes(statusCode)) {
        return "NEGATIVE";
    } else {
        return "UNKNOWN";
    }
};

const formatDate = (dateString: any) => {
    if (!dateString) return 'N/A';
    return dateformat(dateString);
};

const styles = StyleSheet.create({
    page: { paddingTop: 1, fontFamily: 'Helvetica' },
    background: { backgroundColor: '#f0f0f0' },
    section: { margin: 10, padding: 10 },
    imageContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    flexation: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    tableContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, overflow: 'hidden', marginTop: 20 },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderColor: '#01082D' },
    tableHeader: { fontWeight: 'bold', fontSize: 12, color: '#01082D', flex: 1 },
    tableData: { fontSize: 12, flex: 1, color: 'blue' },
    tableContainer2: { borderWidth: 1, borderColor: '#343434', borderRadius: 8, overflow: 'hidden', marginTop: 5, marginBottom: 5, backgroundColor: '#ADD8E6' },
    tableRowFirst: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
    highScore: { fontSize: 10, color: 'green' },
    lowScore: { fontSize: 10, color: 'orange' },
    horizontalLine: { width: '100%', height: 1, backgroundColor: '#ddd', marginVertical: 15 },
    tableContainer1: { borderWidth: 1, borderColor: '#343434', borderRadius: 8, overflow: 'hidden' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333', textAlign: 'center' },
    container: { borderRadius: 10, padding: 20, margin: 5, backgroundColor: '#ADE1FB' },
    titleContainer: { marginBottom: 15, alignItems: 'center' },
    matrixContainer: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, backgroundColor: '#f9f9f9', marginTop: 10 },
    headerRow: { flexDirection: 'row', backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
    headerCell: { flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#fff', fontSize: 14 },
    dataRow: { flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    yearCell: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 14, color: '#333' },
    dataCell: { flex: 1, textAlign: 'center', fontSize: 14, color: '#333' },
    dataCellnewest: { width: 20, height: 20 },
    text: { fontSize: 16, color: '#555', marginBottom: 5 },
    text2: { fontSize: 10, color: '#555', marginBottom: 5, flexWrap: 'wrap' },
    subtitlelast: { fontSize: 18, fontWeight: 'bold', color: '#333', textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center', paddingBottom: 10, borderBottomWidth: 3, borderBottomColor: '#007BFF' },
    tableRowlast: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
    tableHeaderlast: { fontSize: 14, fontWeight: 'medium', color: '#555' },
    tableDatalast: { fontSize: 14, color: '#333', textAlign: 'right' },
    tableRow_enquiry: { flexDirection: 'row', justifyContent: 'space-between', padding: 5 },
    underlinetext: { borderColor: '#343434', borderTopWidth: 1, borderBottomWidth: 1 },
    tableHeader_enquiry: { fontWeight: 'bold', fontSize: 10, color: 'blue' },
    tableData_enquiry: { fontSize: 10 },
    titleheading: { fontSize: 25, fontWeight: 'bold', color: '#01082D', textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center', paddingBottom: 10, borderBottomWidth: 3, borderBottomColor: '#007BFF' },
    updatefront: { fontSize: 8 },
    pointContainersreport: { borderBottomWidth: 1, borderBottomColor: '#CCC', paddingBottom: 2, marginTop: 4 },
    horizontalLine2: { width: '100%', height: 1, backgroundColor: '#FF0000', marginTop: 5 },
    keyPointsreport: { fontSize: 12, fontWeight: 'bold', color: 'blue', marginBottom: 3 },
    containers: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
    legendTitles: { fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
    pointContainers: { flexDirection: 'row', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#CCC', paddingBottom: 5, alignItems: 'center', flexWrap: 'wrap' },
    keyPoints: { fontSize: 12, fontWeight: 'bold', color: 'blue' },
    footers: { marginTop: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 2, borderBottomColor: 'gray', width: '100%' },
    outerContainerlast: { padding: 15, marginBottom: 5 },
    boxlast: { backgroundColor: '#ADD8E6', padding: 15, borderRadius: 10 },
    horizontalLine1: { width: '100%', height: 1, backgroundColor: '#FF0000', marginBottom: 2 }
});

const AccountHistoryPDF = ({ item }: { item: any }) => {
    const history = HistoryToDates(item?.history);
    const YearArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const ReturnIsPayed = (Year: any, myMonth: any) => {
        try {
            if (!history || !history[Year]) return null;
            const response = history[Year].find(({ month }: any) => month === myMonth);
            if (response) return response.value === "0" ? 1 : 0;
            return null;
        } catch (error) {
            return null;
        }
    };

    return (
        <View style={styles.matrixContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Year</Text>
                {YearArray.map((month) => (
                    <Text key={month} style={styles.headerCell}>{month}</Text>
                ))}
            </View>
            {Object.keys(history).map((year) => (
                <View key={year} style={styles.dataRow}>
                    <Text style={styles.yearCell}>{year}</Text>
                    {YearArray.map((month) => (
                        <View key={month} style={styles.dataCell}>
                            <PDFImage
                                style={styles.dataCellnewest}
                                src={ReturnIsPayed(year, month) === 1
                                    ? 'https://res.cloudinary.com/dpqkkdcmh/image/upload/v1736764739/floehbgwepmspa9kegdf.png'
                                    : 'https://res.cloudinary.com/dpqkkdcmh/image/upload/v1736764806/rdyw2x6zyv4hukee5hbx.png'}
                            />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

function calculateCreditStatistics(cibil: any) {
    let sum = 0;
    let outstandingSum = 0;

    if (!Array.isArray(cibil)) return { totalCreditLimit: 0, totalOutstanding: 0, creditUtilizationPercentage: 0 };

    const activeCreditAccount = cibil.filter((items) => "10".includes(items.Account_Type) || ["10", "31", "35", "36"].includes(items.Account_Type));

    activeCreditAccount.forEach((items) => {
        const creditLimit = parseFloat(items.Total_Loan_Amount) || 0;
        sum += creditLimit;
        const outstanding = parseFloat(items.outstanding) || 0;
        outstandingSum += outstanding;
    });

    const creditPercentage = sum === 0 ? 0 : (outstandingSum / sum) * 100;

    return {
        totalCreditLimit: sum,
        totalOutstanding: outstandingSum,
        creditUtilizationPercentage: creditPercentage.toFixed(2),
    };
}

const calculateCreditAge = (cibil: any) => {
    if (!Array.isArray(cibil)) return [];

    const activeAccounts = cibil.filter((item) =>
        ["11", "71", "78", "80", "82", "83", "84", "DEFAULTVALUE", "21", "22", "23", "24", "25"].includes(item.Account_Status)
    );

    const creditAge = (openDate: any) => {
        if (!openDate) return { years: 0, months: 0 };
        let dateStr = String(openDate);
        if (/^\d{8}$/.test(dateStr)) {
            dateStr = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
        }

        const currentDate = new Date();
        const accountOpenDate = new Date(dateStr);
        if (isNaN(accountOpenDate.getTime())) return { years: 0, months: 0 };

        const diffInMonths = (currentDate.getFullYear() - accountOpenDate.getFullYear()) * 12 + currentDate.getMonth() - accountOpenDate.getMonth();
        const years = Math.floor(diffInMonths / 12);
        const months = diffInMonths % 12;
        return { years, months };
    };

    return activeAccounts.map((item) => {
        const age = creditAge(item.accountOpenDate || item.Account_Open_Date);
        return {
            bankName: item.title,
            creditAge: `${age.years} ${age.years === 1 ? "year" : "years"} ${age.months} ${age.months === 1 ? "month" : "months"}`,
            accountOpenedOn: formatDate(item.accountOpenDate || item.Account_Open_Date),
            status: "ACTIVE",
        };
    });
};

const mapEnquiryReason = (enquiryReasonId: any) => {
    const matchedProduct = productType.find((product) => product.id === String(enquiryReasonId));
    return matchedProduct ? matchedProduct.name : "Unknown";
};

const calculateCreditEnquiries = (enq: any) => {
    if (!Array.isArray(enq)) return [];
    return enq.map((enquiry) => ({
        subscriberName: enquiry.Subscriber_Name,
        enquiryReason: mapEnquiryReason(enquiry.Enquiry_Reason),
        amountFinanced: `₹ ${Number(enquiry.Amount_Financed).toLocaleString("en-IN")}`,
    }));
};

const getFormattedAccountNumber = (accountNumber: string) => {
    if (accountNumber && accountNumber.length > 4) {
        return "X".repeat(accountNumber.length - 4) + accountNumber.slice(-4);
    }
    return accountNumber;
};

const CreditReportPDF = ({ cibilName, cibilScore, reportDate, cibil, creditStats, creditAgeData, creditEnquiryData }: any) => (
    <Document>
        <Page size="A4" style={styles.background}>
            <View style={styles.section}>
                <View style={styles.flexation}>
                    <View>
                        <PDFImage src='https://res.cloudinary.com/dpqkkdcmh/image/upload/v1736764861/ok2bjlovj6jqsjza1u1f.png' style={{ width: 90, height: 40 }} />
                    </View>
                    <View style={styles.flexation}>
                        <View style={styles.updatefront}>
                            <Text>Created by : </Text>
                        </View>
                        <PDFImage src={experian.src} style={{ width: 50, height: 20 }} />
                    </View>
                </View>
                <View>
                    <Text style={styles.titleheading}>Credit Report</Text>
                </View>
                <View style={styles.tableContainer}>
                    <View style={styles.tableRowFirst}>
                        <Text style={styles.tableHeader}>Name :</Text>
                        <Text style={styles.tableData}>{cibilName}</Text>
                        <Text style={styles.tableHeader}>Report Date :</Text>
                        <Text style={styles.tableData}>{formatDate(reportDate)}</Text>
                    </View>
                    <View style={styles.tableRowFirst}>
                        <Text style={styles.tableHeader}>Credit Score :</Text>
                        <Text style={styles.tableData}>{cibilScore}</Text>
                        <Text style={styles.tableHeader}>Status :</Text>
                        <Text style={styles.tableData}>
                            {cibilScore >= 300 && cibilScore <= 579 ? "Poor" :
                                cibilScore > 579 && cibilScore <= 669 ? "Fair" :
                                    cibilScore > 669 && cibilScore <= 739 ? "Good" :
                                        cibilScore > 739 && cibilScore <= 799 ? "Very Good" : "Exceptional"}
                        </Text>
                    </View>
                </View>
                {/* ... (truncated visual logic, but copying structure) ... */}
                {/* To save tokens, I copy pasted the logic already. Resume copy. */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={[styles.text, cibilScore >= 750 ? styles.highScore : styles.lowScore]}>
                        {cibilScore >= 750
                            ? "Nice, You are financially strong. Ensure all payments are made on time!"
                            : "You need to improve your credit history. Ensure all payments are made on time."}
                    </Text>
                </View>

                {Array.isArray(cibil) ? (
                    cibil.map((item, index) => (
                        <View key={index} break={index > 0 && index % 2 === 0}>
                            <View style={styles.container} wrap={false}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>PAYMENT HISTORY {`${index + 1}`}</Text>
                                </View>
                                <View style={[styles.tableContainer1, styles.underlinetext]}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Account :</Text>
                                        <Text style={styles.tableData}>{item.title}</Text>
                                        <Text style={styles.tableHeader}>Status :</Text>
                                        <Text style={styles.tableData}>{getAccountStatus(item.Account_Status)}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Outstanding:</Text>
                                        <Text style={styles.tableData}> {item.outstanding ? Number(item.outstanding).toLocaleString("en-IN") : "0"}</Text>
                                        <Text style={styles.tableHeader}>Opened :</Text>
                                        <Text style={styles.tableData}> {formatDate(item.accountOpenDate || item.Account_Open_Date)}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Total Loan/Limit:</Text>
                                        <Text style={styles.tableData}> {Number(item.Total_Loan_Amount || 0).toLocaleString("en-IN")}</Text>
                                        <Text style={styles.tableHeader}>Last Payment :</Text>
                                        <Text style={styles.tableData}>    {formatDate(item.Last_Pay_date)}  </Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Account Number:</Text>
                                        <Text style={styles.tableData}>{getFormattedAccountNumber(item.accNumber)}</Text>
                                    </View>
                                </View>
                                <View>
                                    <AccountHistoryPDF item={item} />
                                </View>
                            </View>
                        </View>
                    ))
                ) : <Text>No history</Text>}

                <View break>
                    <Text style={styles.subtitlelast}>Credit Age</Text>
                    {creditAgeData.map((data: any, index: number) => (
                        <View key={index} style={styles.tableContainer2} wrap={false}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeader}>Bank Name :</Text>
                                <Text style={styles.tableData}>{data.bankName}</Text>
                                <Text style={styles.tableHeader}>Credit Age :</Text>
                                <Text style={styles.tableData}>{data.creditAge}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.subtitlelast}>Credit Enquiries</Text>
                    {creditEnquiryData.map((data: any, index: number) => (
                        <View key={index} style={styles.tableContainer2} wrap={false}>
                            <View style={styles.tableRow_enquiry}>
                                <Text style={styles.tableHeader_enquiry}>Subscriber :</Text>
                                <Text style={styles.tableData_enquiry}>{data.subscriberName}</Text>
                            </View>
                            <View style={styles.tableRow_enquiry}>
                                <Text style={styles.tableHeader_enquiry}>Reason :</Text>
                                <Text style={styles.tableData_enquiry}>{data.enquiryReason}</Text>
                            </View>
                            <View style={styles.tableRow_enquiry}>
                                <Text style={styles.tableHeader_enquiry}>Amount :</Text>
                                <Text style={styles.tableData_enquiry}>{data.amountFinanced}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.outerContainerlast} wrap={false}>
                    <View style={styles.boxlast}>
                        <Text style={styles.subtitlelast}>Credit Card Utilization</Text>
                        <View style={styles.tableRowlast}>
                            <Text style={styles.tableHeaderlast}>Total Credit Limit :</Text>
                            <Text style={styles.tableDatalast}> {creditStats.totalCreditLimit.toLocaleString('en-IN')}</Text>
                        </View>
                        <View style={styles.tableRowlast}>
                            <Text style={styles.tableHeaderlast}>Total Outstanding :</Text>
                            <Text style={styles.tableDatalast}> {creditStats.totalOutstanding.toLocaleString('en-IN')}</Text>
                        </View>
                        <View style={styles.tableRowlast}>
                            <Text style={styles.tableHeaderlast}>Credit Utilization :</Text>
                            <Text style={styles.tableDatalast}>{creditStats.creditUtilizationPercentage}%</Text>
                        </View>
                    </View>
                </View>

            </View>
            <Text style={styles.footers}>END OF REPORT</Text>
        </Page>
    </Document>
);

const PDFDownloadButton = ({ cibilName, cibilScore, reportDate, cibil, enq }: any) => {
    if (!cibilName || !cibilScore || !cibil) return null;

    try {
        const creditStats = calculateCreditStatistics(cibil);
        const creditAgeData = calculateCreditAge(cibil);
        const creditEnquiryData = calculateCreditEnquiries(enq);

        return (
            <PDFDownloadLink
                document={<CreditReportPDF creditEnquiryData={creditEnquiryData} creditAgeData={creditAgeData} creditStats={creditStats} cibilName={cibilName} cibilScore={cibilScore} reportDate={reportDate} cibil={cibil} />}
                fileName={`Credit_Report_${cibilName}.pdf`}
                style={{ textDecoration: 'none' }}
            >
                {({ loading }) => (
                    <button
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 shadow transition-all duration-200 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                <span>Generating Report...</span>
                            </>
                        ) : (
                            'Download Report'
                        )}
                    </button>
                )}
            </PDFDownloadLink>
        );
    } catch (e) {
        console.error("PDF Gen Error", e);
        return <button className="text-red-500 font-bold px-4 py-2">PDF Error</button>;
    }
};

export default PDFDownloadButton;
