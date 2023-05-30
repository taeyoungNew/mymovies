// import { getMovieDatas } from './getMovieDatas'

const API_URL = 'https://api.themoviedb.org/3/'
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p'

const top_rated ='top_rated'
const popular ='popular'
const now_playing ='now_playing'
const upcoming ='upcoming'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmZiMDg0ZGVhNjllMDM2ZGVlNjcxMGJhOGY0NTYyOCIsInN1YiI6IjY0NzA4YmUzNzI2ZmIxMDEwMmVkZTlhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xwtj8JfRFvuIOiUXOjVN9WdxnK_HAmTx5J61rJEGITc'
  }
};

const imgErr = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

let movieTitle = '';

let search = false;

let searchCnt = 1;

// 페이지수
let pageCnt = 1;
// 영화카테고리
let movie_category = '';
// 글로벌 변수에 영화리스트 저장
let movieSave = [];

// 객체를 깊이 복사하는 재귀함수활용
// let copyMovie = function (target) {
//   let result = {};
//   // typeof로 target이 object면 
//   if(typeof target === 'object' && target !== null) {
//       for (let pop in target) {
//           result[pop] = copyMovie(target[pop]);
//       }    
//   // target이 기본형이면
//   } else {
//       result = target;
//   }
//   return result;
// };

window.onload=function(){
  movie_category = top_rated;
  //실행할 내용
  showMovies(movie_category, search);
}

function searchBtn(param) {
  if(param.replace(/\s| /gi, "").length == 0 && param.replace(/\s| /gi, "").length == 0) {
    alert('타이틀 또는 내용이 빠졌어요')
    window.location.reload();
    // return
  } 
  // 검색버튼을 다시 누를경우 기존데이터를 지우고 리셋
  // const movieList = document.querySelector('#movie-card-list');
  // while(movieList.firstChild) {
  //   movieList.removeChild(movieList.firstChild);
  // }
  searchMovie(param)
  document.getElementById('search_movie_title').value = null;
}


// 영화 검색 함수
const searchMovie = (param) => {
  console.log('searchMovie', param);
  pageCnt = 1;
  const movieList = document.querySelector('#movie-card-list');
  if(movieTitle === param) {
    console.log('같은거 검색');
    // 처음 검색을 했을 때 더보기 버튼을 눌렀을 때
    movieTitle = param;
    searchTitle(movieTitle);
  } else if(movieTitle !== param) {
    // 다른 영화를 검색했을때
    console.log('다른거 검색');
    searchCnt = 1;
    movieTitle = param;
    // 기존의 데이터를 지운다.
    while(movieList.firstChild) {
      movieList.removeChild(movieList.firstChild);
    }
    movieTitle = param;
    searchTitle(movieTitle);
  }
  
}


const searchTitle = async (param) => {
  const movieList = document.querySelector('#movie-card-list');
    fetch(`${API_URL}search/movie?query=${param}&include_adult=false&language=en-US&page=${searchCnt}`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response.length)
      if(response.length === undefined) {
        alert('영화를 찾지 못했습니다.')
        window.location.reload();
      }
      const movieDatas = response.results;
      // // 기존의 카드를 지우기
      // while(movieList.firstChild) {
      //   movieList.removeChild(movieList.firstChild);
      // }
      movieDatas.map((val) => {
        const temp = document.createElement("div");
        // HTML요소 추가하기
        temp.innerHTML = `<div class="item" onclick="showMovieId(${val.id})">
                            <div class="back" style=" background-size: cover; background-position: center;  background-image: URL('${IMAGE_BASE_URL}/original${val.poster_path}')">
                              <div class="movie-info">
                                <h3>${val.title}</h3>
                                <h5>release_date : ${val.release_date}</h5>
                                <h5>grade: ${val.vote_average}</h5>
                                <p>${val.overview}</p>
                              </div>
                            </div>
                            <div class="front">
                              <img src="${IMAGE_BASE_URL}/original${val.poster_path}" alt="" onerror="this.src='${imgErr}'">
                            </div>
                          </div>`
        movieList.append(temp)
      })
      searchCnt++;
      // movie_category = '';
      // 지금 있는 리스트를 다 지우고
      // 다시 movie-card-list > div에 붙이기`
    })
    .catch(err => console.error(err));
}

// 영화 아이디 찍기
function showMovieId(param) {
  alert(`영화 id: ${param}`)
} 


// fetch가 있는 함수를 따로 정의
const getMovieDatas = (movie_category) => {
  // movie-card-list에 접근
  const movieList = document.querySelector('#movie-card-list');
  fetch(`${API_URL}movie/${movie_category}?language=en-US&page=${pageCnt} `, options)
      .then(response => response.json())
      .then(response => {
        // 불러온 데이터를 movieDatas 상수로 참조
        const movieDatas = response.results;
        movieDatas.map((val) => {
          const temp = document.createElement("div");
          // HTML요소 추가하기
          temp.innerHTML = `<div class="item" onclick="showMovieId(${val.id})">
                              <div class="back" style=" background-size: cover; background-position: center;  background-image: URL('${IMAGE_BASE_URL}/original${val.poster_path}')">
                                <div class="movie-info">
                                  <h3>${val.title}</h3>
                                  <h5>release_date : ${val.release_date}</h5>
                                  <h5>grade: ${val.vote_average}</h5>
                                  <p>${val.overview}</p>
                                </div>
                              </div>
                              <div class="front">
                                <img src="${IMAGE_BASE_URL}/original${val.poster_path}" alt="" onerror="this.src='${imgErr}'">
                              </div>
                            </div>`
          movieList.append(temp)
        })
        pageCnt++;
      })
      .catch(err => console.error(err));
}

// 영화리스트 보이기
function showMovies(param) {
  // search = booleanVal;
  const movieList = document.querySelector('#movie-card-list');
  if(movie_category === '' || movie_category === param) {
    console.log('처음 or 반복 pageCnt = ', pageCnt)
    movie_category = param;
    getMovieDatas(movie_category);
  // 다른 영화를 불러올때
  } else if(movie_category !== param) {
    pageCnt = 1;
    console.log('다른 카테고리 누름 pageCnt = ', pageCnt)
    // 기존의 데이터를 지운다.
    while(movieList.firstChild) {
      movieList.removeChild(movieList.firstChild);
    }
    movie_category = param;
    getMovieDatas(movie_category);
    
  }
  
}

// 검색을 했는지 카테고리를 눌렀는지 확인하는 함수
const checkFunc = (param, searchValue) => {
  console.log('movie_category = ', movie_category)
  const movieList = document.querySelector('#movie-card-list');
  if(param === "letSearch") {
    movie_category = "letSearch";
    // 카테고리를 누른 흔적이 있따?
    if(search === false) {
      // 검색해서 나왔던 데이터를 모두 지운다.
      while(movieList.firstChild) {
        movieList.removeChild(movieList.firstChild);
      }
    }
    console.log('searchValue = ', searchValue)
    pageCnt = 1;
    search = true;
    movie_category = "letSearch";
    // 매개변수인 searchValu가 undefined인지 구분
    if(!searchValue) {
      searchBtn(movieTitle);
    } else {
      searchBtn(searchValue);
    }
    // 검색기능 실행
  } else {
    // 검색기능을 한 흔적이 있다?  
    if(search === true) {
      // 검색해서 나왔던 데이터를 모두 지운다.
      while(movieList.firstChild) {
        movieList.removeChild(movieList.firstChild);
      }
    }

    searchCnt = 1;
    search = false;
    // 카테고리 실행
    showMovies(param);

  }
}


// searchMovie();


