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
    .then(response => {
      const movieDatas = response.results;
      console.log('movieList = ', movieDatas);
      // const movieList = document.querySelector('#movie-card-list');
      // let newCard = `<div class="item-box">
      //                 <div class="item">
      //                   <div class="front">
      //                     <img src="https://yt3.googleusercontent.com/LGPDh1G3fhM4yf6gLyigaMyeaVbzmRLL-iUGXYvDWWYudTauEjAJUKkGB064H-pVi2uHqbM_qsw=s900-c-k-c0x00ffffff-no-rj" alt="">
      //                   </div>
      //                   <div class="back">
      //                   </div>
      //                 </div>
      //               </div>`
    })
    .catch(err => console.error(err));
  
}

