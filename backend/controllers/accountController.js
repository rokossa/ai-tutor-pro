const User = require('../models/User');
const Family = require('../models/Family');
const bcrypt = require('bcryptjs');

exports.exportUserData = async (req, res) => {
  try {
    // In production, req.user.id would come from your JWT auth middleware
    const userId = "mock_user_id"; 
    
    // Aggregate user profile, family structure, and child progress data
    const exportData = {
      profile: { firstName: "Sarah", lastName: "T.", email: "sarah@example.com" },
      family: {
        children: [{ name: "Alexandre", grade: "Grade 8", practiceMinutes: 340, averageScore: 88 }]
      },
      exportDate: new Date().toISOString()
    };

    res.setHeader('Content-disposition', 'attachment; filename=aitutorpro_data_export.json');
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error("Data Export Error:", error);
    res.status(500).json({ error: "Failed to generate data export." });
  }
};

exports.scheduleAccountDeletion = async (req, res) => {
  try {
    const { password, childDataPreference, coParentId } = req.body;
    // const userId = req.user.id; 
    
    // 1. Verify Password (Mocked for now)
    if (password !== "confirm123") { // Replace with bcrypt.compare in prod
      return res.status(401).json({ error: "Invalid password." });
    }

    // 2. Handle Child Data Preference
    if (childDataPreference === 'transfer' && coParentId) {
      console.log(`Transferring family ownership to co-parent: ${coParentId}`);
      // Logic to update Family.primaryParent
    } else if (childDataPreference === 'delete') {
      console.log("Scheduling deletion for all associated child accounts.");
      // Logic to cascade deletion schedule to children
    }

    // 3. Set 14-Day Cooling-Off Period
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 14);
    
    // await User.findByIdAndUpdate(userId, { deletionScheduledAt: deletionDate });

    res.status(200).json({ 
      success: true, 
      message: "Account scheduled for deletion.",
      deletionDate: deletionDate.toISOString()
    });
  } catch (error) {
    console.error("Deletion Error:", error);
    res.status(500).json({ error: "Failed to schedule account deletion." });
  }
};
