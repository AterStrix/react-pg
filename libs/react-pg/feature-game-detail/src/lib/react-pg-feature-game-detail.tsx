import { RouteComponentProps } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import './react-pg-feature-game-detail.module.scss';
import { useEffect, useState } from 'react';
import { formatRating } from '@nx-playground/react-pg/util-formatters';
import { Api, Response } from '@nx-playground/axios-react-api';

interface TParams {
  id: string;
}

/* eslint-disable-next-line */
export interface ReactPgFeatureGameDetailProps extends RouteComponentProps<TParams> {}

export function ReactPgFeatureGameDetail(props: ReactPgFeatureGameDetailProps) {
  const [ state, setState ] = useState<Response<any>>({} as Response<any>);

  useEffect(() => {
    const gameId = props.match.params.id;
    const apiCall = Api.get<any>(`/api/games/${gameId}`, undefined, {});
    setState(apiCall.initialState);
    apiCall.promise.then(setState);
    return () => apiCall.cancel.cancel();
  }, [props.match.params.id]);

  return (
    <div className="container">
      {state.loading ? 'Loading...' : state.error ? '<div>Error retrieving data</div>' : !state.data ? '<div>No Data</div>' : (
        <Card
          key={state.data.id}
        >
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              component="img"
              image={state.data.image}
              title={state.data.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {state.data.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {state.data.description}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="game-rating"
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default ReactPgFeatureGameDetail;
