import React, {useState, useEffect, useContext} from 'react';
import {ImageConfigContext} from '../../context/ImageConfig';
import {SearchContext} from '../../context/Search';
import {SearchResultsContext} from '../../context/SearchResults';
import classes from './Movie.module.css';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

// DEFAULTAVATAR IMAGE ISN'T WORKING???

// Make this page/component as a LINK (react-router I think?)
const MovieDetail = (props) => {

  const [movieData, setMovieData] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  // Retrieve and set movie id
  const {match} = props;
  const [movieId, setMovieId] = useState(match.params.id)

  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);

  const {imageConfig, setImageConfig} = useContext(ImageConfigContext);
  const {search, setSearch} = useContext(SearchContext);
  const {searchResults, setSearchResults} = useContext(SearchResultsContext);


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        const fetchedMovieData = {
          genres: data.genres,
          id: data.id,
          overview: data.overview,
          popularity: data.popularity,
          posterPath: data.poster_path,
          releaseDate: data.release_date,
          runtime: data.runtime,
          title: data.title,
        };
        setMovieData(fetchedMovieData);
      })
      .catch(err => {
        // TODO
        console.log(err);
      });
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        const fetchedMovieCredits = {
          cast: data.cast,
          crew: data.crew
        };
        setMovieCredits(fetchedMovieCredits);
      })
      .catch(err => {
        // TODO
        console.log(err);
      });
  }, [movieId]);

  useEffect(() => {
    setSearchResults([]);
    setSearch('');
  }, [])


  // CHANGE THIS TO A SPINNER
  let movieDisplay = null;
  let movieCast = null;
  let movieCrew = null;


  if (movieData && movieCredits && imageConfig) {
    // Limit the number of credits shown, unless btn is clicked to show all
    const movieCreditsDisp = showAllCast ? movieCredits.cast : movieCredits.cast.slice(0, 12);
    movieCast = movieCreditsDisp.map(actor => {
      return (
        <div className={classes.CreditSingle}>
          <div title={actor.name}>
            <img
              className={actor.profile_path === null ? classes.DefaultAvatar : ''}
              src={
                actor.profile_path === null ? '../../public/images/DefaultAvatar.png' :
                `${imageConfig.baseURL}${imageConfig.posterSizes[0]}${actor.profile_path}`
              }>
            </img>
          </div>
          <div><b>{actor.name}</b></div>
          <div>{actor.character}</div>
        </div>
      );
    });
    // Limit the number of credits shown, unless btn is clicked to show all
    const movieCrewDisp = showAllCrew ? movieCredits.crew : movieCredits.crew.slice(0, 6);
    movieCrew = movieCrewDisp.map(member => {
      return (
        <div className={classes.CreditSingle}>
          <div title={member.name}>
            <img
              className={member.profile_path === null ? classes.DefaultAvatar : ''}
              src={
                member.profile_path === null ? '../../public/images/DefaultAvatar.png' :
                `${imageConfig.baseURL}${imageConfig.posterSizes[0]}${member.profile_path}`
              }>
            </img>
          </div>
          <div><b>{member.name}</b></div>
          <div>{member.job}</div>
        </div>
      )
    })
    const movieGenres = movieData.genres.map(genre => {
      return (
        <span>{genre.name}</span>
      )
    })
    movieDisplay = (
      <div className={classes.MovieContainer}>
        <div className={classes.MovieInfoMain}>
          <div className={classes.MovieImg}>
            <img src={`${imageConfig.baseURL}${imageConfig.posterSizes[3]}${movieData.posterPath}`} alt={movieData.title}></img>
          </div>
          <div className={classes.MovieInfo}>
            <div className={classes.MovieTitle}>{movieData.title}</div>
            <div className={classes.Divider}></div>
            <div className={classes.MovieOverview}>{movieData.overview}</div>
            <div className={classes.MovieGenres}>
              {movieGenres}
            </div>
            <div className={classes.MovieInfoBtm}>
              <div className={classes.MovieInfoPop}><span>Popularity:</span> {movieData.popularity}</div>
              <div><span>Runtime:</span> {movieData.runtime} minutes</div>
              <div><span>Release Date:</span> {movieData.releaseDate}</div>
            </div>
          </div>
        </div>
        <div className={classes.MovieInfoPeople}>
          <div className={classes.PeopleTitle}>Cast</div>
          <div className={classes.Divider}></div>
          <div className={classes.CreditsContainer}>
            {movieCast}
            <button onClick={() => setShowAllCast(!showAllCast)}>{showAllCast ? 'Less' : 'Show All'}</button>
          </div>
        </div>
        <div className={classes.MovieInfoPeople}>
          <div className={classes.PeopleTitle}>Crew</div>
          <div className={classes.Divider}></div>
          <div className={classes.CreditsContainer}>
            {movieCrew}
            <button onClick={() => setShowAllCrew(!showAllCrew)}>{showAllCrew ? 'Less' : 'Show All'}</button>
          </div>
        </div>
      </div>
    )
  }
  if (search !== '') {
    movieDisplay = null;
  }

  return movieDisplay;
}

export default MovieDetail;
