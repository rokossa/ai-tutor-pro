const Student = require('../models/Student');
const { sendStudentWelcomeEmail } = require('../services/emailService');

exports.addStudent = async (req, res) => {
  try {
    const { name, grade, email, region } = req.body;
    const parentId = req.user.id; // David's ID from the auth middleware

    const newStudent = await Student.create({
      name,
      grade,
      email,
      region,
      parent: parentId,
      curriculumStatus: 'initialized'
    });

    // Send the personalized Socratic onboarding email
    await sendStudentWelcomeEmail(newStudent);

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("🔥 Error adding student:", error);
    res.status(500).json({ error: "Could not add student profile." });
  }
};
