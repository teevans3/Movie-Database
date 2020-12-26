import React, {useState, useEffect, useContext} from 'react';
import HighestRatedMovies from './HighestRatedMovies';
import PopularMovies from './PopularMovies';
import UpcomingMovies from './UpcomingMovies';
import {ImageConfigContext} from '../../context/ImageConfig';
import {SearchResultsContext} from '../../context/SearchResults';
import {SearchContext} from '../../context/Search';


// FOR THE INDEX/HOME PAGE: save the popularmovies, highestratedmovies, and upcoming movies in
// a state (list of objects) and update it every so often, that way we won't be constantly
// making API calls every time the user goes to the home page (do this at end)

// WHEN USER GOES TO HOMEPAGE AFTER SEARCHING SOMETHING: make sure to clear searchResults
// and change searching back to false; may need to use redux?

const Index = (props) => {

  const {imageConfig, setImageConfig} = useContext(ImageConfigContext);
  const {searchResults, setSearchResults} = useContext(SearchResultsContext);
  const {search, setSearch} = useContext(SearchContext);

  useEffect(() => {
    setSearchResults([]);
    setSearch('');
  }, [])

  let moviesDisplay = (
    <div>
      <PopularMovies baseURL={imageConfig.baseURL} posterSizes={imageConfig.posterSizes} backdropSizes={imageConfig.backdropSizes}/>
      <UpcomingMovies baseURL={imageConfig.baseURL} posterSizes={imageConfig.posterSizes} backdropSizes={imageConfig.backdropSizes}/>
      <HighestRatedMovies baseURL={imageConfig.baseURL} posterSizes={imageConfig.posterSizes} backdropSizes={imageConfig.backdropSizes}/>
    </div>
  )
  if (search !== '') {
    moviesDisplay = null;
  }

  return moviesDisplay
}

export default Index;
