import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, skills } = await req.json();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Volunteer Application - Flourish Foundation',
            text: `You have a new volunteer application:\n\nName: ${name}\nEmail: ${email}\nSkills: ${skills}`
        });
        
        return Response.json({ success: true });
    } catch (error: unknown) {
        return Response.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }
}