const {v4: uuid} = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_GAMES = [
    {
        id: 'rvg1',
        name: 'The_Legend_of_Zelda_Majoras_Mask',
        creator: 'gm1'
    },
    {
        id: 'rvg2',
        name: 'Metroid_Fusion',
        creator: 'gm2'
    },
    {
        id: 'rvg3',
        name: 'Star_Wars_Episode_1_Racer',
        creator: 'gm3'
    }
];

const getAllGames = (req, res, next)=>{
    res.json({games: DUMMY_GAMES});
};

const getGameById = (req, res, next)=>{
    const game = DUMMY_GAMES.find(g=>{
        return g.id === req.params.gid;
    });
    if(!game){
        const error =new Error('Videojuego no existente para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({game});
    }
};

const getGameByCreator = (req, res, next)=>{
    const game = DUMMY_GAMES.find(g=>{
        return g.creator === req.params.cid
    });
    if(!game){
        const error = new HttpError('Videojuego no existente para el id de creador especificado');
        throw error;
    }
    res.json({game});
};

const saveGame = (req, res, next)=>{
    const {name, creator} = req.body;
    const id = uuid();
    const createdGame = {
        id,
        name,
        creator
    };
    DUMMY_GAMES.push(createdGame);
    res.status(201).json({game: createdGame});

    res.json({game});
};

const updateGame = (req, res, next)=>{
    const {name} = req.body;
    const gameId = req.params.gid;

    const updatedGame = {... DUMMY_GAMES.find(g=> g.id === gameId)};
    const gamesIndex = DUMMY_GAMES.findIndex(g=> g.id === gameId);

    updatedGame.name = name;

    DUMMY_GAMES[gamesIndex] = updatedGame;
};

const deleteGame = (req, res, next)=>{
    const gameId = req.params.gid;
    DUMMY_GAMES = DUMMY_GAMES.filter(g=> g.id !== gameId)
    res.status(200).json({message: 'Videojuego eliminado exitosamente'});
};

exports.getAllGames = getAllGames;
exports.getGameById = getGameById;
exports.getGameByCreator = getGameByCreator;
exports.saveGame = saveGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;