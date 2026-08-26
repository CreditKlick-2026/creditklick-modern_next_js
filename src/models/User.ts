import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
    phone: string
    email?: string
    name?: {
        first?: string
        last?: string
    }
    dob?: Date
    pan?: string
    gender?: 'male' | 'female' | 'other'
    profession?: string
    address?: {
        line1?: string
        line2?: string
        city?: string
        state?: string
        pincode?: string
    }
    role: 'user' | 'editor' | 'admin' | 'super_admin'
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<IUser>(
    {
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
            index: true,
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            sparse: true,
            index: true,
        },
        name: {
            first: { type: String, trim: true },
            last: { type: String, trim: true },
        },
        dob: Date,
        pan: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        profession: String,
        address: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            pincode: String,
        },
        role: {
            type: String,
            enum: ['user', 'editor', 'admin', 'super_admin'],
            default: 'user',
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        strict: false,
    }
)

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
