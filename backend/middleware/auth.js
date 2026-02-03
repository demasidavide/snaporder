// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware per verificare il JWT
const authMiddleware = (req, res, next) => {
  try {
    // Prendi il token dall'header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Accesso negato. Token non fornito.' 
      });
    }

    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Aggiungi i dati utente alla request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token non valido o scaduto.' 
    });
  }
};

// Middleware per verificare il ruolo
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Autenticazione richiesta.' 
      });
    }

    if (!allowedRoles.includes(req.user.ruolo)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Non hai i permessi per accedere a questa risorsa.' 
      });
    }

    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };