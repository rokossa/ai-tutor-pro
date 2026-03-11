// Database Mock for Profiles (Will be moved to MongoDB later)
const profilesDB = {
  student: {
    role: 'student',
    name: 'Alexandre',
    grade: 'Grade 8',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    stats: { learningTime: '12h 45m', completedExercises: 142, streak: 8 },
    badges: ['Algebra Whiz', '7-Day Streak', 'Fast Learner']
  },
  parent: {
    role: 'parent',
    name: 'Elena',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    linkedStudents: [
      { name: 'Alexandre', grade: 'Grade 8', mastery: '68%', recentActivity: 'Product Rule (Calculus)' }
    ],
    subscription: 'Pro Plan (Active)',
    billingDate: 'April 15, 2026'
  },
  teacher: {
    role: 'teacher',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    credentials: ['Math Specialization', 'Grade 8 Facilitator'],
    subjects: ['Mathematics', 'Sciences', 'English', 'French'],
    analytics: { groupMastery: '51.5%', classProgress: '12.3%', assignmentsActive: 6 },
    students: [{ name: 'Alexandre', grade: 'Grade 8' }]
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { role } = req.query;
    const profileData = profilesDB[role || 'student'];
    res.json({ success: true, data: profileData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
