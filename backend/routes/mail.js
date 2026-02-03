// routes/test.js
const express = require('express');
const router = express.Router();
const { sendTestEmail } = require('../config/email');

// GET /api/test/email - Test invio email
router.get('/test', async (req, res) => {
  try {
    const testEmail = req.query.to || process.env.ADMIN_EMAIL;
    
    if (!testEmail) {
      return res.status(400).json({
        success: false,
        message: 'Specifica una email: ?to=tuaemail@example.com'
      });
    }

    const result = await sendTestEmail(testEmail);

    if (result.success) {
      res.json({
        success: true,
        message: `Email di test inviata a ${testEmail}`,
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Errore invio email',
        error: result.error
      });
    }

  } catch (error) {
    console.error('Errore test email:', error);
    res.status(500).json({
      success: false,
      message: 'Errore del server',
      error: error.message
    });
  }
});

module.exports = router;