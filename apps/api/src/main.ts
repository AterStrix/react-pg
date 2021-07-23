import * as express from 'express';
import { json } from 'body-parser';
import { addGame, getAllGames, getGame } from './app/games.repository';

const app = express();

const bodyParser = json();

app.get('/api/games', (req, res) => {
  res.send(getAllGames());
});

app.post('/api/games', bodyParser, ({ body }, res) => {
  res.send(addGame(body));
});

app.get('/api/games/:id', (req, res) => {
  res.send(getGame(req.params.id));
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
