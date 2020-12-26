import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {createMoviesList} from '../../helpers/movies';
import classes from './index.module.css';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

const HighestRatedMovies = (props) => {

  const [highestRated, setHighestRated] = useState([]);

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => {
        setHighestRated(createMoviesList(data["results"]));
      })
      .catch(error => {
        // TODO
        console.log(error);
      });
  }, []);

  // doing this method because this gets rendered BEFORE we ahve baseURL and postersize info
  // ADD SPINNER

  let highestDisplay = null;
  if (props.posterSizes) {
    highestDisplay = highestRated.map(movie => {
      return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className={classes.MovieSingle} title={movie.title}>
            <img src={`${props.baseURL}${props.posterSizes[2]}${movie.posterPath}`} alt={movie.title}></img>
          </div>
        </Link>
      );
    });
  }

  return (
    <div>
      <h3>Highest Rated Movies</h3>
      <div className={classes.MoviesContainer}>
        {highestDisplay}
      </div>
    </div>
  )
};

export default HighestRatedMovies
