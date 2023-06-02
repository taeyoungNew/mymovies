import { getMovieApi, getMovies } from './module/movieApi.js'
import  { categoryCheck } from './module/showMovie.js'
import { searchMovies } from './module/searchMovie.js'
import { changeType, contentType } from './module/checkContentType.js';
import { addMoreContents, saveTitle } from './module/addMoreContents.js';


const searchBtnClick = document.getElementById('search_movie');
const topRatedClick = document.getElementById('top_rated')
const nowPlayingClick = document.getElementById('now_playing')
const popularClick = document.getElementById('popular')
const upcomingClick = document.getElementById('upcoming')
const moreContents = document.getElementById('more-contents')

// 사이트가 실행되었을때 topreated카테고리의 영화를 보여준다.
window.onload=function(){
  // 첫 실행시 더보기를 눌렀을 때 top_rated카테고리의 영화를 더 불러올수 있게 한다.
  contentsType = topRatedClick.id; 
  categoryMovie(topRatedClick.id)
}


// s
let contentsType = '';

const categoryMovie = async (param) => {
  // api의 타입을 저장하는 함수
  changeType('category');
  const movieCategory = param;
  let pageCnt = 1;

  // 카테고리와 페이지수를 넘김
  await getMovieApi(movieCategory, pageCnt);
  // console.log(getMovies)

  // 카드를 만들기전에 카테고리를 먼저 확인한다.
  categoryCheck(getMovies, movieCategory)
}



// 검색버튼을 눌렀을 때 실행되는 함수
searchBtnClick.addEventListener('click', async () => {
  // input의 value값을 searchMovies함수의 매개변수로 넘겨준다.
  const inputValue = document.getElementById('search_movie_title').value
  
  // 입력창이 비워있으면
  if(inputValue.replace(/\s| /gi, "").length == 0 && inputValue.replace(/\s| /gi, "").length == 0) {
    alert('타이틀 또는 내용이 빠졌어요');
    window.location.reload();
  } 
  // 더보기버튼을 위해 타이틀을 addMoreContents함수에도 타이틀을 매개변수로 넘겨준다.
  await saveTitle(inputValue)

  // 현재 가지고있는 영화리스트와 input창에 입력한 영화타이틀을 매개변수로 넘겨준다.
  await searchMovies(getMovies, inputValue)

  //  입력창을 리셋해준다.
  document.getElementById('search_movie_title').value = null;
})


// 각 카테고리면 id값을 콜백함수에 넘긴다.
topRatedClick.addEventListener('click', () => {
  contentsType = topRatedClick.id; 
  categoryMovie(topRatedClick.id)
})
nowPlayingClick.addEventListener('click', () => {
  contentsType = nowPlayingClick.id;
  categoryMovie(nowPlayingClick.id)
})
popularClick.addEventListener('click', () => {
  contentsType = popularClick.id;
  categoryMovie(popularClick.id)
})
upcomingClick.addEventListener('click', () => {
  contentsType = upcomingClick.id;
  categoryMovie(upcomingClick.id)
})


// 더보기버튼은 클라이언트가 카테고리를 눌렀는지 검색을 눌렀는지 체크해야한다.
moreContents.addEventListener('click', () => {
  addMoreContents(contentsType)
})


// 버튼을 눌렀을 때 categoryMovie함수가 실행



// const imgErr = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

// let movieTitle = '';

// let search = false;

// let searchCnt = 1;

// // 페이지수
// let pageCnt = 1;
// // 영화카테고리
// let movie_category = '';
// // 글로벌 변수에 영화리스트 저장
// let movieSave = [];

// // 객체를 깊이 복사하는 재귀함수활용
// // let copyMovie = function (target) {
// //   let result = {};
// //   // typeof로 target이 object면 
// //   if(typeof target === 'object' && target !== null) {
// //       for (let pop in target) {
// //           result[pop] = copyMovie(target[pop]);
// //       }    
// //   // target이 기본형이면
// //   } else {
// //       result = target;
// //   }
// //   return result;
// // };

// window.onload=function(){
//   movie_category = top_rated;
//   //실행할 내용
//   showMovies(movie_category, search);
// }

// // 영화 아이디 찍기
// function showMovieId(param) {
//   alert(`영화 id: ${param}`)
// }

// function searchBtn(param) {
//   if(param.replace(/\s| /gi, "").length == 0 && param.replace(/\s| /gi, "").length == 0) {
//     alert('타이틀 또는 내용이 빠졌어요');
//     window.location.reload();
//     // return
//   } 
//   // 검색버튼을 다시 누를경우 기존데이터를 지우고 리셋
//   searchMovie(param)
//   document.getElementById('search_movie_title').value = null;
// }


// // 영화 검색 함수
// const searchMovie = (param) => {
//   let find = true;
//   const movieList = document.querySelector('#movie-card-list');
//   pageCnt = 1;  
//   // const movieList = document.querySelector('#movie-card-list');
//   if(find) {
//     movieSave.forEach((x) => {
//       if(x.title.toUpperCase().includes(param.toUpperCase())) {

//         console.log('찾음');
//         const temp = document.createElement("div");
//           // HTML요소 추가하기
//           temp.innerHTML = `<div class="item" onclick="showMovieId(${x.id})">
//                               <div class="back" style=" background-size: cover; background-position: center;  background-image: URL('${IMAGE_BASE_URL}/original${x.poster_path}')">
//                                 <div class="movie-info">
//                                   <h3>${x.title}</h3>
//                                   <h5>release_date : ${x.release_date}</h5>
//                                   <h5>grade: ${x.vote_average}</h5>
//                                   <p>${x.overview}</p>
//                                 </div>
//                               </div>
//                               <div class="front">
//                                 <img src="${IMAGE_BASE_URL}/original${x.poster_path}" alt="" onerror="this.src='${imgErr}'">
//                               </div>
//                             </div>`
//           movieList.append(temp)
//       } else {
//         find = false
//       }
//     })
//   } else {
//     if(movieTitle === param) {
//       // 처음 검색을 했을 때 더보기 버튼을 눌렀을 때
//       movieTitle = param;
//       searchTitle(movieTitle);
//     } else if(movieTitle !== param) {
//       // 다른 영화를 검색했을때
//       searchCnt = 1;
//       movieTitle = param;
//       // 기존의 데이터를 지운다.
//       while(movieList.firstChild) {
//         movieList.removeChild(movieList.firstChild);
//       }
//       movieTitle = param;
//       searchTitle(movieTitle);
//     }
//   }

  

  
// }


// const searchTitle = async (param) => {
//   const movieList = document.querySelector('#movie-card-list');
//     fetch(`${API_URL}search/movie?query=${param}&include_adult=false&language=en-US&page=${searchCnt}`, options)
//     .then(response => response.json())
//     .then(response => {
//       if(response.results.length === 0) {
//         alert('영화를 찾지 못했습니다.')
//       }
//       const movieDatas = response.results;
//       // // 기존의 카드를 지우기
//       movieDatas.reduce((acc, curr) => {
//         console.log('movieDatas = ', curr)
//         const temp = document.createElement("div");
//         // HTML요소 추가하기
//         temp.innerHTML = `<div class="item" onclick="showMovieId(${curr.id})">
//                             <div class="back" style=" background-size: cover; background-position: center;  background-image: URL('${IMAGE_BASE_URL}/original${curr.poster_path}')">
//                               <div class="movie-info">
//                                 <h3>${curr.title}</h3>
//                                 <h5>release_date : ${curr.release_date}</h5>
//                                 <h5>grade: ${curr.vote_average}</h5>
//                                 <p>${curr.overview}</p>
//                               </div>
//                             </div>
//                             <div class="front">
//                               <img src="${IMAGE_BASE_URL}/original${curr.poster_path}" alt="" onerror="this.src='${imgErr}'">
//                             </div>
//                           </div>`
//         movieList.append(temp)
//       })

//       searchCnt++;
//       // movie_category = '';
//       // 지금 있는 리스트를 다 지우고
//     })
//     .catch(err => console.error(err));
// }
 


// // fetch가 있는 함수를 따로 정의
// const getMovieDatas = (movie_category) => {
//   // movie-card-list에 접근
//   const movieList = document.querySelector('#movie-card-list');
//   fetch(`${API_URL}movie/${movie_category}?language=en-US&page=${pageCnt} `, options)
//       .then(response => response.json())
//       .then(response => {
//         // 불러온 데이터를 movieDatas 상수로 참조
        
//         const movieDatas = response.results;
//         movieSave = movieDatas;
//         movieDatas.map((val) => {
//           const temp = document.createElement("div");
//           // HTML요소 추가하기
//           temp.innerHTML = `<div class="item" onclick="showMovieId(${val.id})">
//                               <div class="back" style=" background-size: cover; background-position: center;  background-image: URL('${IMAGE_BASE_URL}/original${val.poster_path}')">
//                                 <div class="movie-info">
//                                   <h3>${val.title}</h3>
//                                   <h5>release_date : ${val.release_date}</h5>
//                                   <h5>grade: ${val.vote_average}</h5>
//                                   <p>${val.overview}</p>
//                                 </div>
//                               </div>
//                               <div class="front">
//                                 <img src="${IMAGE_BASE_URL}/original${val.poster_path}" alt="" onerror="this.src='${imgErr}'">
//                               </div>
//                             </div>`
//           movieList.append(temp)
//         })
//         pageCnt++;
//       })
//       .catch(err => console.error(err));
// }

// // 영화리스트 보이기
// function showMovies(param) {
//   // search = booleanVal;
//   const movieList = document.querySelector('#movie-card-list');
//   if(movie_category === '' || movie_category === param) {
//     console.log('처음 or 반복 pageCnt = ', pageCnt)
//     movie_category = param;
//     getMovieDatas(movie_category);
//   // 다른 영화를 불러올때
//   } else if(movie_category !== param) {
//     pageCnt = 1;
//     console.log('다른 카테고리 누름 pageCnt = ', pageCnt)
//     // 기존의 데이터를 지운다.
//     while(movieList.firstChild) {
//       movieList.removeChild(movieList.firstChild);
//     }
//     movie_category = param;
//     getMovieDatas(movie_category);
    
//   }
  
// }

// // 검색을 했는지 카테고리를 눌렀는지 확인하는 함수
// const checkFunc = (param, searchValue) => {
//   console.log('movie_category = ', movie_category)
//   const movieList = document.querySelector('#movie-card-list');
//   if(param === "letSearch") {
//     movie_category = "letSearch";
//     // 카테고리를 누른 흔적이 있따?
//     if(search === false) {
//       // 검색해서 나왔던 데이터를 모두 지운다.
//       while(movieList.firstChild) {
//         movieList.removeChild(movieList.firstChild);
//       }
//     }
//     console.log('searchValue = ', searchValue)
//     pageCnt = 1;
//     search = true;
//     movie_category = "letSearch";
//     // 매개변수인 searchValu가 undefined인지 구분
//     if(!searchValue) {
//       searchBtn(movieTitle);
//     } else {
//       searchBtn(searchValue);
//     }랴ㅜㅜ
//     // 검색기능 실행
//   } else {
//     // 검색기능을 한 흔적이 있다?  
//     if(search === true) {
//       // 검색해서 나왔던 데이터를 모두 지운다.
//       while(movieList.firstChild) {
//         movieList.removeChild(movieList.firstChild);
//       }
//     }

//     searchCnt = 1;
//     search = false;
//     // 카테고리 실행
//     showMovies(param);

//   }
// }


// searchMovie();


