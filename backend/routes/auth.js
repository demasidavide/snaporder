const express = require("express");
const pool = require("../connDb");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const { sendNewUserNotification } = require('../config/email');

// Funzione helper per generare JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email,
      ruolo: user.ruolo 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || '24h' }
  );
};

// POST /api/auth/register
router.post('/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username deve essere almeno 3 caratteri'),
  body('email').isEmail().withMessage('Email non valida'),
  body('password_hash').isLength({ min: 6 }).withMessage('Password deve essere almeno 6 caratteri'),
  body('nome').trim().isLength({ min: 1 }).withMessage('Nome deve contenere almeno un carattere'),
  body('cognome').trim().isLength({ min: 1 }).withMessage('Cognomeome deve contenere almeno un carattere')
], async (req, res) => {
  try {
    // Valida input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Dati inseriti non validi', 
        errors: errors.array() 
      });
    }

    const { username, email, password_hash, nome, cognome} = req.body;
    const user = {
      nome : nome,
      cognome : cognome,
      username : username,
      email : email
    }
console.log("Valori inviati:", { username, email });
    // Controlla se username o email esistono già
    const [existingUsers] = await pool.query(
      'SELECT id_utente FROM utenti WHERE username = ? OR email = ?',
      [username, email]
    );
    console.log("Risultato query:", existingUsers);

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username o email già esistenti' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    // Inserisci nuovo utente con ruolo 'pending'
    const [result] = await pool.query(
      'INSERT INTO utenti (username, email, password_hash, nome, cognome, ruolo) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, nome, cognome, 'pending']
    );

    // TODO: Invia email di notifica all'admin
    const send = await sendNewUserNotification(user);
    if (!send.success) {
      return res.status(500).json({ success: false, message: 'Errore durante l\'invio dell\'email', error: send.error });
    }

    res.status(201).json({
      success: true,
      message: 'Registrazione completata. Il tuo account è in attesa di approvazione.',
      user: {
        id: result.insertId,
        username,
        email,
        ruolo: 'pending'
      }
    });

  } catch (error) {
    console.error('Errore registrazione:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server durante la registrazione' 
    });
  }
});

// POST /api/auth/login
router.post('/login', [
  body('username').notEmpty().withMessage('Username richiesto'),
  body('password_hash').notEmpty().withMessage('Password richiesta')
], async (req, res) => {
  try {
    // Valida input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { username, password_hash } = req.body;

    // Cerca utente nel database
    const [users] = await pool.query(
      'SELECT * FROM utenti WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenziali non valide' 
      });
    }

    const user = users[0];

    // Verifica password
    const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenziali non valide' 
      });
    }

    // Controlla se l'utente è stato approvato
    if (user.ruolo === 'pending') {
      return res.status(403).json({ 
        success: false, 
        message: 'Account in attesa di approvazione' 
      });
    }

    // Genera token JWT
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login effettuato con successo',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        ruolo: user.ruolo
      }
    });

  } catch (error) {
    console.error('Errore login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server durante il login' 
    });
  }
});

// GET /api/auth/me - Ottieni info utente corrente (richiede autenticazione)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id_utente, username, email, ruolo, data_registrazione FROM utenti WHERE id_utente = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utente non trovato' 
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    console.error('Errore get user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
});

module.exports = router;