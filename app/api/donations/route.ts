import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({ 
    ref: String, 
    name: String, 
    amount: String, 
    status: { type: String, default: 'Pending Verification' },
    date: { type: Date, default: Date.now }
});
const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);

export async function GET() {
    await dbConnect();
    try {
        const donations = await Donation.find().sort({ date: -1 });
        return Response.json(donations);
    } catch (err) {
        return Response.json({ error: 'Failed to fetch donations' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { ref, name, amount, status } = await req.json();
        const newDonation = new Donation({ 
            ref, 
            name, 
            amount, 
            status: status || 'Pending Verification' 
        });
        await newDonation.save();
        return Response.json({ success: true, message: 'Donation saved successfully' });
    } catch (err: unknown) {
        return Response.json({ success: false, message: 'Failed to save donation' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const { id, status } = await req.json();
        const updatedDonation = await Donation.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        if (!updatedDonation) {
            return Response.json({ success: false, message: 'Donation not found' }, { status: 404 });
        }
        return Response.json({ success: true, message: 'Donation updated successfully' });
    } catch (err: unknown) {
        return Response.json({ success: false, message: 'Failed to update donation' }, { status: 500 });
    }
}