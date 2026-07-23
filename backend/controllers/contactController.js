import nodemailer from 'nodemailer';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const cleanText = (value) => String(value).trim().replaceAll('\0', '');

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body ?? {};

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Name, email, and message are required.'
      });
    }

    const safeName = cleanText(name);
    const safeEmail = cleanText(email);
    const safeMessage = cleanText(message);

    if (!safeName || !safeEmail || !safeMessage) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (safeName.length > 100 || safeEmail.length > 254 || safeMessage.length > 5000) {
      return res.status(400).json({ error: 'One or more fields exceed the allowed length.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(503).json({
        error: 'Email delivery is not configured. Please use the direct email link.'
      });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      disableFileAccess: true,
      disableUrlAccess: true
    });

    const mailOptions = {
      from: {
        name: 'Muhammad Sayyedain portfolio',
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `Portfolio contact from ${safeName.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #171A1D;">
          <h2 style="border-bottom: 1px solid #CDD3D6; padding-bottom: 10px;">
            New portfolio message
          </h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <div style="background: #F7F5EF; padding: 16px; margin-top: 20px;">
            <strong>Message:</strong>
            <p style="color: #4B5158; line-height: 1.6;">
              ${escapeHtml(safeMessage).replaceAll('\n', '<br />')}
            </p>
          </div>
          <p style="margin-top: 24px; color: #4B5158; font-size: 12px;">
            Received ${new Date().toISOString()}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Contact form message sent - ${new Date().toISOString()}`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.'
    });
  } catch (error) {
    console.error('Error sending email:', error);

    return res.status(500).json({
      error: 'Failed to send message. Please use the direct email link.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
