import { mkMovieCard } from "./showMovie.js"
import { removeCards } from "./removeCard.js"

const searchMovies = async (movieList, title) => {
  let payLoad = []
  // 넘겨받은 영화리스트안에 input창에 입력한 타이틀이 있는지 확인한다.
  movieList.forEach((x) => {
    if(x.title.toUpperCase().includes(title.toUpperCase())) {
      console.log('가지고있는 영화중 입력한 타이틀의 영화가 있다.')
      payLoad.push(x)
      check = true;
    } else {
      console.log('없다,..')
      // 없으면 searchAPI를 이용한다.
      check = false;
    }
  })

  removeCards();
  if(check) {
    mkMovieCard(payLoad)
  } else {
    console.log('없다,..')
  }

} 

export {
  searchMovies
}