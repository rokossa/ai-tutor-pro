const User = require('../models/User');
const Family = require('../models/Family');

exports.exportUserData = async (req, res) => {
  try {
    const exportData = {
      profile: { firstName: "Sarah", lastName: "T.", email: "sarah@example.com" },
      family: { children: [{ name: "Alexandre", grade: "Grade 8", practiceMinutes: 340, averageScore: 88 }] },
      exportDate: new Date().toISOString()
    };
    res.setHeader('Content-disposition', 'attachment; filename=aitutorpro_data_export.json');
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    res.status(500).json({ error: "Failed to generate data export." });
  }
};

exports.scheduleAccountDeletion = async (req, res) => {
  try {
    const { password, childDataPreference, coParentId } = req.body;
    if (password !== "confirm123") return res.status(401).json({ error: "Invalid password." });
    
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 14);
    res.status(200).json({ success: true, message: "Account scheduled for deletion.", deletionDate: deletionDate.toISOString() });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule account deletion." });
  }
};
