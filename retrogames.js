express = require('express');
const bodyParser = require('body-parser');

const gamesRoutes = require('./routes/games-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/games', gamesRoutes);

app.use((req, res, next)=>{
    const error = new HttpError('Ruta no existente', 404);
    throw error;
});

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'Error desconocido'});
});

app.listen(3000);