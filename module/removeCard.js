// 기존의 카드를 지워주는 모듈
const movieList = document.querySelector('#movie-card-list');
const removeCards = () => {
  while(movieList.firstChild) {
    movieList.removeChild(movieList.firstChild);
  }
  
}

export {
  removeCards
}