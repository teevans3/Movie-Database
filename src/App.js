import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useMemo} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Index from './components/index/Index';
import Movie from './components/movie/Movie';
import Navigation from './components/navigation/Navigation';
import Genre from './components/index/Genre';
import { SearchResultsContext } from './context/SearchResults';
import { ImageConfigContext } from './context/ImageConfig';
import { SearchContext } from './context/Search';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [imageConfig, setImageConfig] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');

  const imageConfigProviderValue = useMemo(() => ({
    imageConfig, setImageConfig
  }), [imageConfig, setImageConfig]);
  const searchResultsProviderValue = useMemo(() => ({
    searchResults, setSearchResults
  }), [searchResults, setSearchResults])
  const searchProviderValue = useMemo(() => ({
    search, setSearch
  }), [search, setSearch]);

  // Fetch imageConfiguration at start (re-fetch every few days... TODO);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const fetchedImageConfig = {
          baseURL: data.images.base_url,
          backdropSizes: data.images.backdrop_sizes,
          posterSizes: data.images.poster_sizes,
        };
        setImageConfig(fetchedImageConfig);
      })
      .catch(err => {
        // TODO
        console.log(err);
      })
  }, []);

// Add navigation bar... (or just a home button?)

  return (
    <BrowserRouter>
      <div className="App">
        <SearchContext.Provider value={searchProviderValue}>
          <SearchResultsContext.Provider value={searchResultsProviderValue}>
            <ImageConfigContext.Provider value={imageConfigProviderValue}>
              <div>
                <Navigation/>
              </div>
              <Switch>
                <Route path="/movie/:id" render={(props) => <Movie {...props}/>} />
                <Route path="/:genre" render={(props) => <Genre {...props}/>} />
                <Route path="/" component={Index} />
              </Switch>
            </ImageConfigContext.Provider>
          </SearchResultsContext.Provider>
        </SearchContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
