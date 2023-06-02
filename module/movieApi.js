const API_URL = 'https://api.themoviedb.org/3/'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmZiMDg0ZGVhNjllMDM2ZGVlNjcxMGJhOGY0NTYyOCIsInN1YiI6IjY0NzA4YmUzNzI2ZmIxMDEwMmVkZTlhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xwtj8JfRFvuIOiUXOjVN9WdxnK_HAmTx5J61rJEGITc'
  }
};
let getMovies = []
let datas = []

const removeMovies = () => {
  getMovies = []
  console.log('removeMovies = ', getMovies);
}

// 데이터의 중복을 없애는 함수
let dupMovies = (datas) => {
  datas.reduce((acc, curr) => {
    if(acc.findIndex(({ id }) => id === curr.id) === -1) {
      acc.push(curr)
    }
    return acc
  }, [])

}

// 카테고리별 영화데이터를 가져오는 함수
const getMovieApi = async (category, pageCnt) => {
  console.log("페이지가 첫 로드했을 때 콘텐츠 가져오기 = ", category, pageCnt)
  await fetch(`${API_URL}movie/${category}?language=en-US&page=${pageCnt}`, options)
    .then(response => response.json())
    .then(response => { 
      const { results } = response
      console.log(results);
      // 토탈페이지보다 더 많은 페이지를 요구 할 경우 스톱해주기
      if(response.total_pages < pageCnt) {
        alert('더이상 영화가 없어요.')
      } else {
        if(response.results.length !== 0) {
          getMovies = response.results
        }
      }
    })
    .catch(err => console.error(err));
    
}

// 클라이언트가 검색기능을 실행했을 경우 사용되는 함수
const searchMovieApi = async (title, pageCnt) => {
  // console.log(title, pageCnt)
  await fetch(`${API_URL}search/movie?query=${title}&include_adult=false&language=en-US&page=${pageCnt}`, options)
  .then(response => response.json())
  .then(response => { 
     // 토탈페이지보다 더 많은 페이지를 요구 할 경우 스톱해주기
     if(response.total_pages < pageCnt) {
      alert('더이상 영화가 없어요.')
      noMore = true
      getMovies = [];
    } else {
      if(response.results.length !== 0) {
        getMovies = response.results;
      } else {
        alert('찾으시는 영화가 없어요.')
      }
    }
  })
  .catch(err => console.error(err));
}

export {
  removeMovies,
  getMovieApi,
  searchMovieApi,
  getMovies
} 