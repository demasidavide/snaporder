// routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require("../connDb");
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Tutte le route admin richiedono autenticazione e ruolo admin
router.use(authMiddleware, roleMiddleware('admin'));

// GET /api/admin/pending-users - Lista utenti in attesa di approvazione
router.get('/pending-users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id_utente, username, email, ruolo, data_registrazione FROM utenti WHERE ruolo = ? ORDER BY data_registrazione DESC',
      ['pending']
    );

    res.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Errore get pending users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
});

// GET /api/admin/users - Lista tutti gli utenti
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, ruolo, created_at FROM utenti ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Errore get users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
});

// PUT /api/admin/approve-user/:id - Approva un utente e assegna ruolo
router.put('/approve-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ruolo } = req.body; // 'bar', 'kitchen', 'admin'

    // Valida ruolo
    const validRoles = ['bar', 'kitchen', 'admin'];
    if (!validRoles.includes(ruolo)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ruolo non valido. Usa: bar, kitchen, admin' 
      });
    }

    // Aggiorna ruolo utente
    const [result] = await pool.query(
      'UPDATE utenti SET ruolo = ? WHERE id = ? AND ruolo = ?',
      [ruolo, id, 'pending']
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utente non trovato o già approvato' 
      });
    }

    // TODO: Invia email di conferma all'utente

    res.json({
      success: true,
      message: `Utente approvato con ruolo: ${ruolo}`
    });

  } catch (error) {
    console.error('Errore approve user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
});

// PUT /api/admin/change-role/:id - Cambia ruolo di un utente
router.put('/change-role/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ruolo } = req.body;

    // Valida ruolo
    const validRoles = ['pending', 'bar', 'kitchen', 'admin'];
    if (!validRoles.includes(ruolo)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ruolo non valido' 
      });
    }

    // Non permettere di cambiare il proprio ruolo
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Non puoi cambiare il tuo stesso ruolo' 
      });
    }

    const [result] = await pool.query(
      'UPDATE utenti SET ruolo = ? WHERE id = ?',
      [ruolo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utente non trovato' 
      });
    }

    res.json({
      success: true,
      message: 'Ruolo aggiornato con successo'
    });

  } catch (error) {
    console.error('Errore change role:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
});

// DELETE /api/admin/user/:id - Elimina un utente
router.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Non permettere di eliminare se stesso
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Non puoi eliminare il tuo stesso account' 
      });
    }

    const [result] = await pool.query(
      'DELETE FROM utenti WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utente non trovato' 
      });
    }

    res.json({
      success: true,
      message: 'Utente eliminato con successo'
    });

  } catch (error) {
    console.error('Errore delete user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
});

module.exports = router;