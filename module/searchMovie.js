import { mkMovieCard } from "./showMovie.js"
import { removeCards } from "./removeCard.js"
import { searchMovieApi, getMovies, removeMovies } from "./movieApi.js"
import { changeType,  contentType } from "./checkContentType.js"


const searchMovies = async (movieList, title) => {
  
  let payLoad = []
  
  // 검색이었는지 카테고리였는지 확인하는 절차를 밟고 
  if(contentType === 'category') {
    // 카테고리였으면 기존에 영화리스트에서 찾고
    await movieList.forEach((x) => {
      console.log(x.title.toUpperCase().split(' ').join(''));
      console.log(title.toUpperCase().split(' ').join(''));
      if(x.title.toUpperCase().trim().includes(title.toUpperCase().split(' ').join(''))) {
        // 입력한 타이틀과 같거나 문자열이 포함된 타이틀의 영화를 payload에 담는다.
        payLoad.push(x) 
        removeMovies();
      }
    })
    
    
    if(payLoad.length !== 0) {
      // 그리고 기존의 카드를 삭제한다.
      removeCards();
      // paylaod에 값이 담겨져있으면 그대로 mkMovieCard함수의 매개변수로 보내어 카드를 생성한다.
      mkMovieCard(payLoad)  
    } else {
      // payload에 값이 담겨져있지 않으면 타이틀을  searchAPI함수의 매개변수로 보낸다.
      await searchMovieApi(title, 1)
      // 검색하여 받아져온 영화리스트를 mkMovieCard함수의 매개변수로 넘겨서 카드를 만든다.
      mkMovieCard(getMovies)
      changeType('search');
    } 

  } else {
    removeCards();
    
    // payload에 값이 담겨져있지 않으면 타이틀을  searchAPI함수의 매개변수로 보낸다.
    await searchMovieApi(title, 1)

    // 검색하여 받아져온 영화리스트를 mkMovieCard함수의 매개변수로 넘겨서 카드를 만든다.
    mkMovieCard(getMovies)
    changeType('search');
  }
  
  // 넘겨받은 영화리스트안에 input창에 입력한 타이틀이 있는지 확인한다.
  
  // 더보기버튼이 클라이언트가 검색을 했다고 분별을 할 수있게 매개변수로 search를 보내준다.
  
} 

export {
  searchMovies
}