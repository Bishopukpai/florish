import dbConnect from '../../../../lib/mongodb';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({ username: { type: String, unique: true }, passwordHash: String });
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, password } = await req.json();
    const admin = await Admin.findOne({ username });
    if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Server error';
    return Response.json({ success: false, message: errorMessage }, { status: 500 });
  }
}