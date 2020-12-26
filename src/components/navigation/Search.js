import React, {useState, useEffect, useRef, useContext} from 'react';
import {createMoviesList} from '../../helpers/movies';
import {Link} from 'react-router-dom';
import classes from './Search.module.css';
import {SearchResultsContext} from '../../context/SearchResults';
import {SearchContext} from '../../context/Search';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;


const Search = (props) => {
  const {search, setSearch} = useContext(SearchContext);
  const searchRef = useRef();
  const {searchResults, setSearchResults} = useContext(SearchResultsContext);


  useEffect(() => {
    setTimeout(() => {
      if (search === searchRef.current.value) {
        if (search !== '') {
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
              const movieResults = createMoviesList(data.results);
              setSearchResults(movieResults);
            })
            .catch(err => {
              // TODO
              console.log(err);
            });
        }
      }
    }, 1000);
    if (search === '') {
      setSearchResults([]);
    }
  }, [search, searchRef]);

  let displayResults = null;
  let displayDiv = null;
  if (searchResults.length > 0 && props.posterSizes) {
    displayResults = searchResults.map(movie => {
      return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className={classes.MovieSingle} title={movie.title}>
            <img src={`${props.baseURL}${props.posterSizes[2]}${movie.posterPath}`} alt={movie.title}></img>
          </div>
        </Link>
      );
    })
    displayDiv = (
      <div className={classes.MoviesContainer}>
        {displayResults}
      </div>
    );
  }

  return (
    <div className={classes.SearchContainer}>
      <input type="text" value={search} ref={searchRef} name="searchInput" id="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="Search"/>
      {displayDiv}
    </div>
  )
}

export default Search;
