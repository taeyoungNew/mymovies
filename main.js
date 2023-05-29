const API_URL = 'https://api.themoviedb.org/3/'
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/'

function getMovies() {
  console.log('getMovies')
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmZiMDg0ZGVhNjllMDM2ZGVlNjcxMGJhOGY0NTYyOCIsInN1YiI6IjY0NzA4YmUzNzI2ZmIxMDEwMmVkZTlhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xwtj8JfRFvuIOiUXOjVN9WdxnK_HAmTx5J61rJEGITc'
    }
  };
  
  fetch(`${API_URL}movie/top_rated?language=en-US&page=1 `, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
}

