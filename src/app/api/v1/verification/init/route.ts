import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/models/User'
import { Lead } from '@/models/Lead'

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()

        const body = await request.json()
        const { mobile, fName, lName, email, pCode, Pan, dob, profession, gender, isLogin } = body

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

        // 1. Save or Update User in MongoDB
        const userUpdate: Record<string, unknown> = {}
        if (email) userUpdate.email = email.toLowerCase().trim()
        if (firstName || lastName) {
            userUpdate.name = { first: firstName, last: lastName }
        }
        if (dob) {
            const parsedDob = new Date(dob)
            if (!isNaN(parsedDob.getTime())) userUpdate.dob = parsedDob
        }
        if (Pan) userUpdate.pan = Pan.toUpperCase().trim()
        if (gender) {
            const normGender = gender.toLowerCase()
            userUpdate.gender = ['male', 'female'].includes(normGender) ? normGender : 'other'
        }
        if (pCode) {
            userUpdate.address = { pincode: pCode }
        }
        if (profession) userUpdate.profession = profession

        const user = await User.findOneAndUpdate(
            { phone: mobile },
            {
                $set: userUpdate,
                $setOnInsert: { phone: mobile, isActive: true, role: 'user' },
            },
            { upsert: true, new: true }
        )

        // 2. Save or Update Lead in MongoDB for CRM
        if (!isLogin) {
            await Lead.findOneAndUpdate(
                { phone: mobile, interest: 'cibil' },
                {
                    $set: {
                        name: fullName,
                        phone: mobile,
                        email: email || user.email,
                        source: 'website',
                        sourcePage: '/credit-score',
                        interest: 'cibil',
                        additionalInfo: {
                            dob,
                            pan: Pan,
                            pincode: pCode,
                            gender,
                            profession,
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
                userId: user._id,
                phone: user.phone,
                name: fullName,
                isNewUser: !user.createdAt || (new Date().getTime() - new Date(user.createdAt).getTime() < 5000),
            },
        })
    } catch (error) {
        console.error('Error in /api/v1/verification/init:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to process verification request', details: String(error) },
            { status: 500 }
        )
    }
}
