const express = require('express');

const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/', gamesControllers.getAllGames);
router.get('/:gid', gamesControllers.getGameById);
router.get('/creator/:cid', gamesControllers.getGameByCreator);

router.post('/', gamesControllers.saveGame);

router.patch('/:gid', gamesControllers.updateGame);

router.delete('/:gid', gamesControllers.deleteGame);

module.exports = router;