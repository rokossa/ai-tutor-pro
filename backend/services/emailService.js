const nodemailer = require('nodemailer');

// In production, configure this with SendGrid, AWS SES, or a real SMTP provider
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'mock_user',
    pass: process.env.SMTP_PASS || 'mock_pass'
  }
});

const generateHeader = () => `
  <div style="text-align: center; margin-bottom: 20px;">
    <div style="background-color: #4F46E5; color: white; padding: 16px; border-radius: 12px; font-weight: bold; font-size: 20px; display: inline-block; width: 100%; max-width: 400px;">
      <span style="font-size: 24px; vertical-align: middle; margin-right: 8px;">A</span> AI Tutor Pro
    </div>
  </div>
`;

exports.sendStudentInvite = async (childEmail, childName, parentName, grade, region, magicLink) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; color: #1e293b;">
      ${generateHeader()}
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="font-size: 60px;">🤖🙌👦</span>
      </div>
      <p style="font-size: 18px; line-height: 1.5;">Hi <strong>${childName}</strong> 😂 Your parent <strong>${parentName}</strong> just signed you up for your own personal AI Tutor that actually cares about you! ✨</p>
      <p style="font-size: 16px; line-height: 1.5; color: #475569;">You'll get instant practice questions from your exact <strong>${grade} ${region}</strong> curriculum, super encouraging step-by-step feedback, daily streaks & badges.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${magicLink}" style="background-color: #4F46E5; color: white; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);">
          Start My First Practice Session &rarr;
        </a>
      </div>
      
      <div style="text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <p>Magic link directly to your practice session.</p>
        <p><a href="#" style="color: #4F46E5;">Unsubscribe</a> | <a href="#" style="color: #4F46E5;">Clique ici</a> pour commencer (FR)</p>
      </div>
    </div>
  `;

  console.log(`[EMAIL MOCK] Sending Invite to ${childEmail}`);
  // return transporter.sendMail({ from: '"AI Tutor Pro" <no-reply@aitutorpro.com>', to: childEmail, subject: `Hey ${childName}! ✨ Let's start practicing today!`, html });
};

exports.sendParentConfirmation = async (parentEmail, childName) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 30px; background-color: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
      <h2 style="margin-top: 0; color: #0f172a; font-size: 24px;">Invitation sent to ${childName}! ✨</h2>
      <p style="color: #475569; font-size: 16px; margin-bottom: 30px;">They can start practicing now.</p>
      
      <div style="background-color: white; border-radius: 16px; padding: 24px; text-align: center; border: 1px solid #e2e8f0; position: relative;">
        <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background-color: #22c55e; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; border: 4px solid #f8fafc;">✓</div>
        <h3 style="margin-top: 10px; color: #0f172a;">${childName} received an invitation to join AI Tutor Pro! 👨‍🎓</h3>
        <div style="background-color: #f1f5f9; padding: 12px; border-radius: 8px; color: #475569; font-weight: bold; font-size: 14px; margin-top: 16px;">
          📋 Magic link copied to clipboard
        </div>
      </div>
      
      <p style="text-align: center; color: #64748b; font-size: 14px; margin-top: 24px;">You'll get weekly progress reports every Friday at 4 PM.</p>
    </div>
  `;

  console.log(`[EMAIL MOCK] Sending Confirmation to ${parentEmail}`);
  // return transporter.sendMail({ from: '"AI Tutor Pro" <no-reply@aitutorpro.com>', to: parentEmail, subject: `Invitation sent to ${childName}! ✨`, html });
};

exports.sendStudentNudge = async (childEmail, childName, parentName, magicLink) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 30px; background-color: white; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
      <h2 style="margin-top: 0; color: #0f172a; font-size: 24px;">${childName}, your AI Tutor is still waiting for you! ✨</h2>
      <p style="color: #475569; font-size: 16px; margin-bottom: 30px;">One click to start 🔮</p>
      
      <div style="background-color: #f8fafc; border-radius: 16px; padding: 24px; text-align: center; border: 1px solid #e2e8f0;">
        <p style="color: #0f172a; font-size: 16px; margin-bottom: 20px;">You haven't started yet – your first question is ready and it's going to be fun!</p>
        <a href="${magicLink}" style="background-color: #6d28d9; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
          GET STARTED
        </a>
      </div>
      
      <p style="text-align: center; color: #64748b; font-size: 14px; margin-top: 24px;">Your parent ${parentName} can see your progress.</p>
    </div>
  `;

  console.log(`[EMAIL MOCK] Sending Nudge to ${childEmail}`);
  // return transporter.sendMail({ from: '"AI Tutor Pro" <no-reply@aitutorpro.com>', to: childEmail, subject: `${childName}, your AI Tutor is waiting! ✨`, html });
};
