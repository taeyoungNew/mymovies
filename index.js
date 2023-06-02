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





