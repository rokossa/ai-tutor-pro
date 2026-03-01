const Student = require('../models/Student');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

exports.addStudent = async (req, res) => {
  try {
    const { name, email, grade, province } = req.body;
    
    // In a real authenticated request, req.user._id comes from the JWT middleware
    // For now, we'll assume the parent ID is passed or mock it if missing
    const parentId = req.user?.id || req.body.parentId || '65c1234567890abcdef12345';

    // 1. Save the student permanently to MongoDB
    const newStudent = await Student.create({
      parentId,
      name,
      email,
      grade,
      province
    });

    // 2. Fire off the real invitation email if an email was provided
    if (email) {
      await resend.emails.send({
        from: 'AI Tutor Pro <onboarding@yourdomain.com>', // You will verify this domain in Resend
        to: email,
        subject: `You've been invited to AI Tutor Pro by your parent!`,
        html: `
          <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h2>Hi ${name}! 🚀</h2>
            <p>Your parent has set up an AI Tutor Pro account for you to crush your ${grade} classes.</p>
            <a href="${process.env.FRONTEND_URL}/student/login" style="display: inline-block; padding: 12px 24px; background-color: #4338CA; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
              Access Your Dashboard
            </a>
          </div>
        `
      });
      console.log(`✅ Invite email physically sent to ${email}`);
    }

    res.status(201).json({ success: true, student: newStudent });
  } catch (error) {
    console.error("Family Setup Error:", error);
    res.status(500).json({ error: "Failed to add student and send email." });
  }
};
