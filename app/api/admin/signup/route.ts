import dbConnect from '../../../../lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({ username: { type: String, unique: true }, passwordHash: String });
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, password } = await req.json();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({ username, passwordHash });
    await newAdmin.save();
    return Response.json({ success: true, message: 'Admin account created successfully' });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error occurred';
    return Response.json({ success: false, message: errorMessage }, { status: 400 });
  }
}