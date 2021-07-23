import React, { useState, useEffect } from 'react';

import './app.scss';

import { Header } from '@nx-playground/react-pg/ui-shared';
import { formatRating } from '@nx-playground/react-pg/util-formatters';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Route, NavLink, useHistory } from 'react-router-dom';

import { ReactPgFeatureGameDetail } from '@nx-playground/react-pg/feature-game-detail';

import { ReactPgFeatureGameAdd } from '@nx-playground/react-pg/feature-game-add';
import { useGames, Game } from '@nx-playground/react-pg/api';

import { useColor } from './context';
import { Compose } from './compose';
import { Test1 } from './test1';
import { Test2 } from './test2';

export const App = () => {
  const history = useHistory();

  const [ state, dispatchGames ] = useGames();

  const { color, toggleColor } = useColor();

  useEffect(() => {
    dispatchGames({ method: 'GET' });
  }, []);

  const onSubmit = data => console.log(data);

  const addGame = (x: Game) => dispatchGames({ method: 'POST', data: [x], refresh: true })

  return (
    <>
      <Header title="Board Game Hoard">
        <nav className="main-nav">
          <NavLink to="/" exact={true}>Home</NavLink>
          <NavLink to="/game-add">Add Game</NavLink>
        </nav>
      </Header>
      <Compose items={[ Test1, Test2, Test1, Test2 ]}><h2>Ololoooo</h2></Compose>
      <div className="container" data-testid="app-container">
        <div className="games-layout">
          {state.loading
            ? 'Loading...'
            : state.error
            ? <div>Error retrieving data</div>
            : !state.data.length
            ? JSON.stringify(state)
            : state.data.map((x) => (
                <Card
                  key={x.id}
                  className="game-card"
                  onClick={() => history.push(`/game/${x.id}`)}
                >
                  <CardActionArea>
                    <CardMedia
                      className="game-card-media"
                      image={x.image}
                      title={x.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {x.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={color}
                        component="p"
                      >
                        {x.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color={color}
                        component="p"
                        className="game-rating"
                      >
                        <strong>Rating:</strong> {formatRating(x.rating)}
                      </Typography>
                      <button onClick={toggleColor}>Change color</button>
                      <button onClick={() => addGame(x)}>Add game</button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
        </div>
        {/* START: routes */}
        <Route path="/game/:id" component={ReactPgFeatureGameDetail} />
        <Route path="/game-add" render={() => <ReactPgFeatureGameAdd onSubmit={onSubmit} />} />
        {/* END: routes */}
      </div>
    </>
  );
};

export default App;
