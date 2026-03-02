const weeklyTemplate = require('../templates/weeklyReport');

exports.sendWeeklyReport = async (req, res) => {
  try {
    // In production, we'd pull these from MongoDB
    const reportData = {
      childName: "Alexandre",
      avgScore: 92,
      streak: 7,
      topics: [
        { name: "Linear Equations", status: "Mastered" },
        { name: "Optics (Grade 8 Science)", status: "Improving" }
      ],
      dashboardUrl: "https://ai-tutor-pro-k88k.onrender.com/parent/dashboard"
    };

    const htmlContent = weeklyTemplate(reportData);
    
    // Logic to send via SendGrid or AWS SES would go here
    console.log("📨 HTML Report Generated for David King");
    res.json({ success: true, message: "Weekly HTML report sent to David's email." });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate HTML report." });
  }
};
