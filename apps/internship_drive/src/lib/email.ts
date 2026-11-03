import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender email (needs to be verified in Resend dashboard)
const FROM_EMAIL = 'Internship Drive <noreply@ecellbphc.in>'; // Fallback or configured domain

export async function sendCompanyStatusEmail(
  to: string,
  companyName: string,
  status: 'approved' | 'rejected',
  reason?: string
) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_placeholder')) {
    console.log(`[Email Mock] Company ${status}: ${to}`);
    return { success: true, mocked: true };
  }

  const subject = status === 'approved' 
    ? 'Your company registration is approved! 🎉' 
    : 'Update regarding your company registration';

  const html = `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
      <h2>Hello ${companyName},</h2>
      ${status === 'approved' 
        ? `<p>Great news! Your registration for the Internship Drive has been approved by our team.</p>
           <p>You can now log in to your dashboard and start posting internship listings.</p>`
        : `<p>Thank you for your interest in the Internship Drive. Unfortunately, we are unable to approve your registration at this time.</p>
           ${reason ? `<p><strong>Reason provided:</strong> ${reason}</p>` : ''}`
      }
      <br/>
      <p>Best regards,<br/>The E-Cell Team</p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendListingStatusEmail(
  to: string,
  listingTitle: string,
  status: 'approved' | 'rejected',
  reason?: string
) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_placeholder')) {
    console.log(`[Email Mock] Listing ${status}: ${to}`);
    return { success: true, mocked: true };
  }

  const subject = status === 'approved' 
    ? `Your listing "${listingTitle}" is live!` 
    : `Update regarding your listing "${listingTitle}"`;

  const html = `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
      <h2>Hello,</h2>
      ${status === 'approved' 
        ? `<p>Your internship listing <strong>${listingTitle}</strong> has been approved and is now visible to all students.</p>
           <p>You will start receiving applications in your company dashboard.</p>`
        : `<p>Your internship listing <strong>${listingTitle}</strong> was not approved.</p>
           ${reason ? `<p><strong>Reason provided:</strong> ${reason}</p>` : ''}`
      }
      <br/>
      <p>Best regards,<br/>The E-Cell Team</p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendApplicationStatusEmail(
  to: string,
  studentName: string,
  companyName: string,
  listingTitle: string,
  status: string,
  interviewDetails?: { date: string, mode: string, link?: string, notes?: string }
) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_placeholder')) {
    console.log(`[Email Mock] Application ${status}: ${to}`);
    return { success: true, mocked: true };
  }

  let subject = `Update on your application for ${companyName}`;
  let content = '';

  if (status === 'shortlisted') {
    subject = `You've been shortlisted by ${companyName}!`;
    content = `<p>Congratulations! <strong>${companyName}</strong> has shortlisted your application for the <strong>${listingTitle}</strong> role.</p>
               <p>They will contact you soon regarding the next steps.</p>`;
  } else if (status === 'interview_scheduled') {
    subject = `Interview Scheduled: ${companyName}`;
    content = `<p><strong>${companyName}</strong> has scheduled an interview with you for the <strong>${listingTitle}</strong> role.</p>
               <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                 <p><strong>Date & Time:</strong> ${new Date(interviewDetails?.date || '').toLocaleString()}</p>
                 <p><strong>Mode:</strong> ${interviewDetails?.mode}</p>
                 ${interviewDetails?.link ? `<p><strong>Meeting Link:</strong> <a href="${interviewDetails.link}">${interviewDetails.link}</a></p>` : ''}
                 ${interviewDetails?.notes ? `<p><strong>Notes:</strong> ${interviewDetails.notes}</p>` : ''}
               </div>`;
  } else if (status === 'selected') {
    subject = `Congratulations! You've been selected by ${companyName} 🎉`;
    content = `<p>Fantastic news! <strong>${companyName}</strong> has officially selected you for the <strong>${listingTitle}</strong> role.</p>
               <p>Please check your dashboard and watch out for direct communication from the company.</p>`;
  } else if (status === 'rejected') {
    subject = `Update regarding ${companyName}`;
    content = `<p>Thank you for applying to <strong>${companyName}</strong> for the <strong>${listingTitle}</strong> role.</p>
               <p>Unfortunately, the company has decided to move forward with other candidates at this time. Don't be discouraged, there are many other opportunities available!</p>`;
  }

  const html = `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
      <h2>Hello ${studentName},</h2>
      ${content}
      <br/>
      <p>Best regards,<br/>The E-Cell Team</p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
