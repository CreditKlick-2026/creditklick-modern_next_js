import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Lead } from '@/models/Lead'

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()
        const body = await request.json()
        const { name, phone, email, interest, subInterest, sourcePage, additionalInfo } = body

        if (!name || !phone) {
            return NextResponse.json(
                { success: false, error: 'Name and phone are required' },
                { status: 400 }
            )
        }

        const lead = await Lead.create({
            name: name.trim(),
            phone: phone.trim(),
            email: email ? email.toLowerCase().trim() : undefined,
            interest: interest || 'other',
            subInterest: subInterest ? subInterest.trim() : undefined,
            source: 'website',
            sourcePage: sourcePage || '/',
            status: 'new',
            priority: 'medium',
            additionalInfo: additionalInfo || {},
        })

        return NextResponse.json({
            success: true,
            message: 'Lead created successfully',
            data: { id: lead._id },
        })
    } catch (error) {
        console.error('Error in /api/v1/leads:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create lead', details: String(error) },
            { status: 500 }
        )
    }
}
