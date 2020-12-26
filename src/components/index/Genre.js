import React, {useState, useEffect, useContext} from 'react';
// import {createMoviesList} from '../../helpers/movies';
import {Link} from 'react-router-dom';
import classes from './index.module.css';
import {ImageConfigContext} from '../../context/ImageConfig';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

const Genre = (props) => {
  // Retrieve and set movie genre
  const {match} = props;
  const [genreName, setGenreName] = useState(match.params.genre)
  const [genreId, setGenreId] = useState(null);
  const {imageConfig, setImageConfig} = useContext(ImageConfigContext);

  const [genrePopular, setGenrePopular] = useState([]);

  useEffect(() => {
    setGenreName(match.params.genre);
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        // Get the genre ID to compare to our api fetches for movies (do this somewhere else!!!!);
        for (var g of data["genres"]) {
          if (g.name === "Science Fiction" && match.params.genre === "scifi") {
            setGenreId(g.id);
          };
          if (g.name === match.params.genre.charAt(0).toUpperCase() + match.params.genre.slice(1)) {
            setGenreId(g.id);
          };
        };
      })
      .catch(err => {
        // TODO
        console.log(err);
      })
  }, [match.params.genre])

  // SOMETHING IS UP WITH THIS USEEFFECT?? -- how do i get the do while loop to work with api call inside this useeffect???
  // keeps crashing but idk why.. it won't even log anything!!
  useEffect(() => {
    let pageNum = 1;
    const movieList = [];
     // do {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`)
      .then(response => response.json())
      .then(data => {
        for (var movie of data["results"]) {
          for (var gId of movie.genre_ids) {
            if (gId === genreId) {
              console.log(movie);
              movieList.push({
                id: movie.id,
                posterPath: movie.poster_path,
                title: movie.title,
              });
            }
          }
        }
      })
      .then(() => {
        setGenrePopular(movieList);
      })
      .catch(error => {
        // TODO
        console.log(error);
      });
    pageNum++;
    // } while ( movieList.length < 20 );
  }, [genreId])

  // CHANGE TO SPINNER
  let popularDisplay = null;
  if (genrePopular.length > 0) {
    popularDisplay = genrePopular.map(movie => {
      return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className={classes.MovieSingle} title={movie.title}>
            <img src={`${imageConfig.baseURL}${imageConfig.posterSizes[2]}${movie.posterPath}`} alt={movie.title}></img>
          </div>
        </Link>
      );
    })
  };

  return (
    <div>
      {genreName}
      <div className={classes.MoviesContainer}>
      {popularDisplay}
      </div>
    </div>
  )
};

export default Genre;
