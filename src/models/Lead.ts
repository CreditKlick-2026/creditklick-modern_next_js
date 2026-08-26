import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILead extends Document {
    name: string
    phone: string
    email?: string
    source: string
    sourcePage?: string
    interest: string
    subInterest?: string
    status: string
    priority: string
    additionalInfo?: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
}

const leadSchema = new Schema<ILead>(
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
        source: {
            type: String,
            default: 'website',
            index: true,
        },
        sourcePage: String,
        interest: {
            type: String,
            default: 'cibil',
            index: true,
        },
        subInterest: String,
        status: {
            type: String,
            default: 'new',
            index: true,
        },
        priority: {
            type: String,
            default: 'medium',
        },
        additionalInfo: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
        strict: false,
    }
)

export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', leadSchema)

export default Lead
