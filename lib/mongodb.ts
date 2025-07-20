import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("🚨 MONGODB_URI is not defined in the environment variables.");
}
    
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

// Ensure global singleton pattern (prevents re-connection on hot reload)
const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export default async function dbConnect(): Promise<Connection> {
  const cached = globalWithMongoose.mongooseCache!;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => mongoose);
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}
