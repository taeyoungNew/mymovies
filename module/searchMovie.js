import { mkMovieCard } from "./showMovie.js"
import { removeCards } from "./removeCard.js"
import { searchMovieApi, getMovies } from "./movieApi.js"


const searchMovies = async (movieList, title) => {
  let payLoad = []
  // 넘겨받은 영화리스트안에 input창에 입력한 타이틀이 있는지 확인한다.
  await movieList.forEach((x) => {
    if(x.title.toUpperCase().includes(title.toUpperCase())) {
      // 입력한 타이틀과 같거나 문자열이 포함된 타이틀의 영화를 payload에 담는다.
      payLoad.push(x) 
    }
  })
  // 그리고 기존의 카드를 삭제한다.
  removeCards();
  
  if(payLoad.length !== 0) {
    // paylaod에 값이 담겨져있으면 그대로 mkMovieCard함수의 매개변수로 보내어 카드를 생성한다.
    mkMovieCard(payLoad)
  } else {
    // payload에 값이 담겨져있지 않으면 타이틀을  searchAPI함수의 매개변수로 보낸다.
    await searchMovieApi(title, 1)
    // 검색하여 받아져온 영화리스트를 mkMovieCard함수의 매개변수로 넘겨서 카드를 만든다.
    mkMovieCard(getMovies)
  }

} 

export {
  searchMovies
}