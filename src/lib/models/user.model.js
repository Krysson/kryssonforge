import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },
    email: { type: String },
    username: { type: String, unique: true }
    // Add other fields here as per your Prisma schema
  },
  {
    collection: 'User' // Ensures this schema uses the "User" collection
  }
)

const User = mongoose.model('User', userSchema)
export default User
