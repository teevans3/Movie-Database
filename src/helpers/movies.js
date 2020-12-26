
export const createMoviesList = (movieData) => {
  const movieList = [];
  for (var movie of movieData) {
    movieList.push({
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title,
    });
  }
  return movieList;
}


// SHOULD WE JUST PASS ALL THESE HELPER FUNCTIONS AS PROPS???
// ????? maybe...
export const getMovieDetails = (key, movieId) => {
  let movieDetails = {};
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      movieDetails = {
        backdropPath: data.backdrop_path,
        genres: data.genres,
        id: data.id,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime,
        title: data.title,
      };
      return movieDetails;
    })
    .catch(err => {
      // TODO
      console.log(err);
    })
}

// Function to get Base URL and list of size types (depending on type of image)
export const getBaseAndSize = (key) => {
  fetch(`https://api.themoviedb.org/3/configuration?api_key=${key}`)
    .then(response => response.json())
    .then(data => {
      const configURL = {
        baseURL: data.images.base_url,
        backdropSizes: data.images.backdrop_sizes,
        posterSizes: data.images.poster_sizes,
      };
      return configURL;
    })
    .catch(err => {
      // TODO
      console.log(err);
    })

}
