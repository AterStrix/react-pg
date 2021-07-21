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
import { Api, Response } from '@nx-playground/axios-react-api';

import { ReactPgFeatureGameAdd } from '@nx-playground/react-pg/feature-game-add';

import { useColor } from './context';
import { Compose } from './compose';
import { Test1 } from './test1';
import { Test2 } from './test2';
interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}

export const App = () => {
  const history = useHistory();

  const [state, setState] = useState<Response<Game[]>>({
    data: [] as Game[],
  } as Response<Game[]>);

  const [to, setTo] = useState<string>('/game-add');

  const { color, toggleColor } = useColor();

  useEffect(() => {
    const apiCall = Api.get<Game[]>('/api/games', null, []);
    setState(apiCall.initialState);
    apiCall.promise.then(setState);
    Api.loading$.subscribe((x) => console.log(x));
    return () => apiCall.cancel.cancel();
  }, []);

  const onSubmit = data => console.log(data);

  return (
    <>
      <Header title="Board Game Hoard">
        <nav className="main-nav">
          <NavLink to="/" exact={true}>Home</NavLink>
          <NavLink to={to}>Add Game</NavLink>
        </nav>
      </Header>
      <Compose items={[ Test1, Test2, Test1 ]} />
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
