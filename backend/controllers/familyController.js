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

// Fetch all students for the logged-in parent
exports.getStudents = async (req, res) => {
  try {
    // In production, this ID comes from the JWT token: req.user.id
    // For now, we fetch all or use a fallback mechanism
    const parentId = req.user?.id || '65c1234567890abcdef12345'; 
    const students = await Student.find({ parentId });
    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Fetch Students Error:", error);
    res.status(500).json({ error: "Failed to fetch students." });
  }
};

// Fetch a specific student's detailed profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    
    // Here we would also fetch their recent exercise history from an Exercises table.
    // We will attach some mock analytics to the real DB profile for the UI layout.
    const profileData = {
      ...student.toObject(),
      averageScore: 82, // Dynamic calculation goes here later
      totalExercises: 145,
      chartData: [65, 72, 78, 85, 82]
    };

    res.status(200).json({ success: true, student: profileData });
  } catch (error) {
    console.error("Fetch Student Profile Error:", error);
    res.status(500).json({ error: "Failed to fetch student profile." });
  }
};

// Update a student's progress after an exercise
exports.updateProgress = async (req, res) => {
  try {
    const { isCorrect } = req.body;
    const student = await Student.findById(req.params.id);
    
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Always increment total exercises attempted
    student.totalExercises += 1;

    // Only boost stats if they got it right (keeps it encouraging!)
    if (isCorrect) {
      student.correctAnswers += 1;
      student.streak += 1; 
    }

    await student.save();
    
    // Calculate the new rolling average to send back to the frontend
    const averageScore = Math.round((student.correctAnswers / student.totalExercises) * 100);

    res.status(200).json({ success: true, student, averageScore });
  } catch (error) {
    console.error("Update Progress Error:", error);
    res.status(500).json({ error: "Failed to update progress." });
  }
};
