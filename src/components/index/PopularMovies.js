import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {createMoviesList} from '../../helpers/movies';
import {getMovieDetails} from '../../helpers/movies';
import classes from './index.module.css';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;


const PopularMovies = (props) => {

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => {
        setPopularMovies(createMoviesList(data["results"]));
      })
      .catch(error => {
        // TODO
        console.log(error);
      });
  }, []);

  // doing this method because this gets rendered BEFORE we ahve baseURL and postersize info
  // ADD SPINNER
  let popularDisplay = null;
  if (props.posterSizes) {
    popularDisplay = popularMovies.map(movie => {
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
      <h3>Popular Movies</h3>
      <div className={classes.MoviesContainer}>
        {popularDisplay}
      </div>
    </div>
  )
};

export default PopularMovies
