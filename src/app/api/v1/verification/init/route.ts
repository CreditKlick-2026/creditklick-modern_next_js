import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Lead } from '@/models/Lead'

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()

        const body = await request.json()
        const { mobile, fName, lName, email, pCode, Pan, dob, profession, gender, isLogin, consent } = body

        if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
            return NextResponse.json(
                { success: false, error: 'Invalid 10-digit mobile number' },
                { status: 400 }
            )
        }

        // Parse name
        const nameParts = (fName || '').trim().split(' ')
        const firstName = nameParts[0] || fName || ''
        const lastName = lName || nameParts.slice(1).join(' ') || ''
        const fullName = `${firstName} ${lastName}`.trim() || 'User'

        // NOTE: this unauthenticated route must never create or modify User
        // documents — the phone number is not verified here, so writing to User
        // would let anyone overwrite another customer's name / PAN / email.
        // Accounts are created only by the backend after OTP verification.

        // 2. Save or Update Lead in MongoDB for CRM
        if (!isLogin && consent !== true) {
            return NextResponse.json(
                { success: false, error: 'Please accept the CRIF credit report consent to continue' },
                { status: 400 }
            )
        }

        if (!isLogin) {
            await Lead.findOneAndUpdate(
                { phone: mobile, interest: 'cibil' },
                {
                    $set: {
                        name: fullName,
                        phone: mobile,
                        email: email || undefined,
                        source: 'website',
                        sourcePage: '/credit-score',
                        interest: 'cibil',
                        additionalInfo: {
                            dob,
                            pan: Pan,
                            pincode: pCode,
                            gender,
                            profession,
                            consentAccepted: true,
                            consentVersion: 'v1.0_2026',
                            submittedAt: new Date().toISOString(),
                        },
                    },
                    $setOnInsert: {
                        status: 'new',
                        priority: 'high',
                    },
                },
                { upsert: true, new: true }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'User and Lead details saved successfully',
            data: {
                phone: mobile,
                name: fullName,
            },
        })
    } catch (error) {
        console.error('Error in /api/v1/verification/init:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to process verification request' },
            { status: 500 }
        )
    }
}
