import { useState } from "react"
import { Api, Response } from "@nx-playground/axios-react-api";

export interface Game {
  id?: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}

type ReducerAction<T, U = { method: T }> = { method: T } & U;

type Action = ReducerAction<'GET'>|ReducerAction<'POST', { data: Game[], refresh?: boolean }>

export const useGames = () => {
  const [games, setGames] = useState<Response<Game[]>>({ data: [] } as Response<[]>);

  const reducer = (state, action: Action) => {
    switch(action.method) {
      case 'GET': {
        const apiCall = Api.get<Game[]>('/api/games', undefined, [])
        setGames(apiCall.initialState)
        apiCall.promise.then(data => setGames(state => ({ ...state, ...data })));
        break;
      }
      case 'POST': {
        Api
          .post<Game>('/api/games', action.data[0])
          .promise
          .then(() => action.refresh && reducer(null, { method: 'GET' }))
        break;
      }
    }
  }

  const dispatch = (action: Action) => {
    reducer(games, action);
  }

  return [ games, dispatch ] as [ typeof games, typeof dispatch ];
}