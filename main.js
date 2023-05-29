const API_URL = 'https://api.themoviedb.org/3/'
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p'

const top_rated ='top_rated'
const popular ='popular'
const now_playing ='now_playing'
const upcoming ='upcoming'

let pageCnt = 1;
let movie_type = '';
function getRatedMovies(param) {
  movie_type = param
  if(movie_type != param) {
    console.log('다른 영화 검색')
  }
  
  let totalPage = 1;
  // console.log('getMovies')
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmZiMDg0ZGVhNjllMDM2ZGVlNjcxMGJhOGY0NTYyOCIsInN1YiI6IjY0NzA4YmUzNzI2ZmIxMDEwMmVkZTlhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xwtj8JfRFvuIOiUXOjVN9WdxnK_HAmTx5J61rJEGITc'
    }
  };
  
  fetch(`${API_URL}movie/${movie_type}?language=en-US&page=${pageCnt} `, options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      totalPage = 556;
      // 받아온 api를 변수에 담기
      const movieDatas = response.results;
      
      // movieList 접근    
      const movieList = document.querySelector('#movie-card-list');
      // console.log('movieList = ', movieDatas);
      movieDatas.map((val) => {
        console.log(val)
        const temp = document.createElement("div");
        // HTML요소 추가하기
        temp.innerHTML = `<div class="item">
                            <div class="back" style=" background-size: cover; background-position: center;  background-image: URL('${IMAGE_BASE_URL}/original${val.poster_path}')">
                              <div class="movie-info">
                                <h3>${val.title}</h3>
                                <h5>release_date : ${val.release_date}</h5>
                                <h5>grade: ${val.vote_average}</h5>
                                <p>${val.overview}</p>
                              </div>
                            </div>
                            <div class="front">
                              <img src="${IMAGE_BASE_URL}/original${val.poster_path}" alt="">
                            </div>
                          </div>`
        movieList.append(temp)
        pageCnt++;
      })
      
      
      
    })
    .catch(err => console.error(err));
  
}

