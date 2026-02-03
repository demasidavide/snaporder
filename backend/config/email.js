// config/email.js
const nodemailer = require('nodemailer');

// Crea il transporter per l'invio email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true per 465, false per altri
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Funzione per inviare email di notifica nuova registrazione (all'admin)
const sendNewUserNotification = async (user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"SnapOrder System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Email dell'admin
      subject: '🔔 Nuovo utente registrato - Approvazione richiesta',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuova Registrazione SnapOrder</h2>
          
          <p>Un nuovo utente si è registrato e richiede l'approvazione:</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Data registrazione:</strong> ${new Date().toLocaleString('it-IT')}</p>
            <p><strong>Stato:</strong> <span style="color: orange;">In attesa di approvazione</span></p>
          </div>
          
          <p>Accedi al pannello admin per approvare l'utente e assegnare un ruolo.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="color: #666; font-size: 12px;">
            Questa è una email automatica del sistema SnapOrder.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email notifica inviata:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Errore invio email notifica:', error);
    return { success: false, error: error.message };
  }
};

// Funzione per inviare email di conferma approvazione (all'utente)
const sendApprovalEmail = async (user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"SnapOrder System" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: '✅ Account approvato - SnapOrder',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Account Approvato!</h2>
          
          <p>Ciao <strong>${user.username}</strong>,</p>
          
          <p>Il tuo account SnapOrder è stato approvato con successo.</p>
          
          <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Ruolo assegnato:</strong> <span style="text-transform: uppercase;">${user.ruolo}</span></p>
          </div>
          
          <p>Ora puoi effettuare il login e accedere al sistema.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
               style="background: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Vai al Login
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          
          <p style="color: #666; font-size: 12px;">
            Questa è una email automatica del sistema SnapOrder.<br>
            Se non hai richiesto la registrazione, ignora questa email.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email approvazione inviata:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Errore invio email approvazione:', error);
    return { success: false, error: error.message };
  }
};

// Funzione di test email
const sendTestEmail = async (toEmail) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"SnapOrder System" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: '✉️ Test Email - SnapOrder',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email di Test</h2>
          <p>Se ricevi questa email, la configurazione di nodemailer funziona correttamente!</p>
          <p><strong>Data/Ora:</strong> ${new Date().toLocaleString('it-IT')}</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email test inviata:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Errore invio email test:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendNewUserNotification,
  sendApprovalEmail,
  sendTestEmail
};