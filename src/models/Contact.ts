import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IContact extends Document {
    name: string
    phone: string
    email?: string
    message: string
    subject?: string
    status: string
    source: string
    sourcePage?: string
    createdAt: Date
    updatedAt: Date
}

const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            index: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
        },
        subject: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            default: 'new',
            index: true,
        },
        source: {
            type: String,
            default: 'website',
        },
        sourcePage: String,
    },
    {
        timestamps: true,
        strict: false,
    }
)

export const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema)

export default Contact
