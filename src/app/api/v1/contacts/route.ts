import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Contact } from '@/models/Contact'

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()
        const body = await request.json()
        const { name, phone, email, message, subject, sourcePage } = body

        if (!name || !phone || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, phone, and message are required' },
                { status: 400 }
            )
        }

        const contact = await Contact.create({
            name: name.trim(),
            phone: phone.trim(),
            email: email ? email.toLowerCase().trim() : undefined,
            message: message.trim(),
            subject: subject ? subject.trim() : undefined,
            sourcePage: sourcePage || '/contact',
            source: 'website',
            status: 'new',
        })

        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully',
            data: { id: contact._id },
        })
    } catch (error) {
        console.error('Error in /api/v1/contacts:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to submit contact form', details: String(error) },
            { status: 500 }
        )
    }
}
