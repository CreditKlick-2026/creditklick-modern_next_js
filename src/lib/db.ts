import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://creditklick_app:6WypM1v30l7ITfo0@cluster0.lyksmnj.mongodb.net/creditklick?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env')
}

interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase(): Promise<typeof mongoose> {
    if (cached!.conn) {
        return cached!.conn
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }

        cached!.promise = mongoose.connect(MONGODB_URL, opts).then((mongooseInstance) => {
            console.log('✅ Connected to MongoDB Atlas from Next.js')
            return mongooseInstance
        })
    }

    try {
        cached!.conn = await cached!.promise
    } catch (e) {
        cached!.promise = null
        console.error('❌ MongoDB connection error in Next.js:', e)
        throw e
    }

    return cached!.conn
}

export default connectToDatabase
