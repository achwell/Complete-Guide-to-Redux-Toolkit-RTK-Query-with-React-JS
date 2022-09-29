import React from "react";
import { Card, CardMedia, Grid, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useAppSelector} from "../redux/hooks"

const MoviesList = () => {
  const { moviesList } = useAppSelector((state) => ({ ...state.movie }));

  return (
    <div>
      <Grid sx={{ flexGrow: 1 }} container>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {Object.values(moviesList).map((item, index) => (
              <Grid key={index} item>
                <Card sx={{ maxWidth: "350" }}>
                  <Link to={`/movie/${item.imdbID}`}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={item.Poster}
                      alt={item.Title}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.primary">
                        {item.Title}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        ({item.Year})
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MoviesList;
