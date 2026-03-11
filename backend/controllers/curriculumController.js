exports.getCurriculum = async (req, res) => {
  try {
    const { grade } = req.query;
    
    // In the future, this will be: await Curriculum.findOne({ grade: grade }) from MongoDB.
    // For now, this backend engine dynamically serves the correct curriculum based on the request.
    const databaseMock = {
      'Grade 8': {
        subjects: [
          { id: 'math', name: 'Mathematics', iconName: 'Calculator', color: 'bg-indigo-600', progress: 68 },
          { id: 'science', name: 'Sciences', iconName: 'FlaskConical', color: 'bg-teal-500', progress: 45 },
          { id: 'geo', name: 'Geography', iconName: 'Globe', color: 'bg-blue-500', progress: 31 }
        ],
        curriculum: {
          'Mathematics': {
            domains: [
              { id: 'algebra', name: 'Algebra & Equations', progress: 78, recommended: true },
              { id: 'geometry', name: 'Geometry', progress: 45 }
            ],
            skills: {
              'algebra': [
                { id: 'linear', name: 'Linear Equations', mastery: 100 },
                { id: 'deriv', name: 'Product Rule (Calculus)', mastery: 40 }
              ],
              'geometry': [
                { id: 'pythagoras', name: 'Pythagorean Theorem', mastery: 50 }
              ]
            }
          },
          'Sciences': {
            domains: [{ id: 'chem', name: 'Chemistry', progress: 60, recommended: true }],
            skills: { 'chem': [{ id: 'gas_laws', name: "Boyle's Law", mastery: 30 }] }
          },
          'Geography': {
            domains: [{ id: 'physical', name: 'Physical Geography', progress: 50, recommended: true }],
            skills: { 'physical': [{ id: 'tectonics', name: 'Plate Tectonics', mastery: 40 }] }
          }
        }
      },
      'Grade 9': {
        subjects: [
          { id: 'math', name: 'Mathematics', iconName: 'Calculator', color: 'bg-indigo-600', progress: 12 },
          { id: 'physics', name: 'Physics', iconName: 'FlaskConical', color: 'bg-amber-500', progress: 5 }
        ],
        curriculum: {
          'Mathematics': {
            domains: [
              { id: 'adv_algebra', name: 'Advanced Algebra', progress: 15, recommended: true },
              { id: 'trig', name: 'Trigonometry', progress: 5 }
            ],
            skills: {
              'adv_algebra': [{ id: 'quadratics', name: 'Quadratic Formula', mastery: 20 }],
              'trig': [{ id: 'sine_cosine', name: 'Sine and Cosine Rules', mastery: 0 }]
            }
          },
          'Physics': {
            domains: [{ id: 'kinematics', name: 'Kinematics', progress: 10, recommended: true }],
            skills: { 'kinematics': [{ id: 'velocity', name: 'Velocity and Acceleration', mastery: 10 }] }
          }
        }
      }
    };

    // Default to Grade 8 if not specified or not found
    const result = databaseMock[grade] || databaseMock['Grade 8'];

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
