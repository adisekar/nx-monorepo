import React, { useState, useEffect } from 'react';
import './app.scss';
// import { getAllGames } from '../fake-api';
import { Game } from '@test/api/util-interfaces';

import { Header } from '@test/store/ui-shared';
import { formatRating } from '@test/store/util-formatters';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Route, Link, useHistory } from 'react-router-dom';

import { StoreFeatureGameDetail } from '@test/store/feature-game-detail';

export const App = () => {
  const history = useHistory();

  const [state, setState] = useState<{
    data: Game[];
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: [],
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    fetch('/api/games')
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="games-layout">
          {/* {getAllGames().map((x) => ( */}
          {state.loadingState === 'loading'
            ? 'Loading...'
            : state.loadingState === 'error'
              ? '<div>Error retrieving data</div>'
              : state.data.map((x: any) => (
                <Card key={x.id} className="game-card" onClick={() => history.push(`/game/${x.id}`)}>
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
                        color="textSecondary"
                        component="p"
                      >
                        {x.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="game-rating"
                      >
                        <strong>Rating:</strong> {formatRating(x.rating)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
        </div>
      </div>

      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  );
};

export default App;
