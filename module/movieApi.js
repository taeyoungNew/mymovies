const API_URL = 'https://api.themoviedb.org/3/'


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmZiMDg0ZGVhNjllMDM2ZGVlNjcxMGJhOGY0NTYyOCIsInN1YiI6IjY0NzA4YmUzNzI2ZmIxMDEwMmVkZTlhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xwtj8JfRFvuIOiUXOjVN9WdxnK_HAmTx5J61rJEGITc'
  }
};


let getMovies = []
// 카테고리별 영화데이터를 가져오는 함수
const getMovieApi = async (category, pageCnt) => {
  await fetch(`${API_URL}movie/${category}?language=en-US&page=${pageCnt}`, options)
    .then(response => response.json())
    .then(response => { 
      if(response.results.length !== 0) {
        getMovies = response.results;
      }
    })
    .catch(err => console.error(err));
    
}

// 클라이언트가 검색기능을 실행했을 경우 사용되는 함수
const searchMovieApi = async (title, pageCnt) => {
  console.log('검색했니?')
  await fetch(`${API_URL}search/movie?query=${title}&include_adult=false&language=en-US&page=${pageCnt}`, options)
  .then(response => response.json())
  .then(response => { 
    if(response.results.length !== 0) {
      getMovies = response.results;
    }
  })
  .catch(err => console.error(err));
}



export {
  getMovieApi,
  searchMovieApi,
  getMovies
} 