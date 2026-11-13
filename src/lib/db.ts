import mongoose from 'mongoose'
import dns from 'dns'

try {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
} catch {
    // Ignore in environments where setServers is restricted
}

// Never hardcode credentials: MONGODB_URL must come from the environment
const MONGODB_URL = process.env.MONGODB_URL as string


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
    // Checked at call time (not import time) so `next build` works without DB credentials
    if (!MONGODB_URL) {
        throw new Error('MONGODB_URL environment variable is not set')
    }
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
