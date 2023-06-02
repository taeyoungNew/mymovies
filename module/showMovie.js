import { removeCards } from "./removeCard.js";
import { removeMovies } from "./movieApi.js";

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p'
const imgErr = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
const movieList = document.querySelector('#movie-card-list');

// 기존과 같은 카테고리인지 확인을 위한 변수생성
let categorySave = '';

// 영화리스트 보이기
// 영화 카드를 만드는 함수에 영화데이터를 매개변수로 넘겨주기
function categoryCheck(paramMovies, category) {
  // 처음 카테고리영화를 클릭 or 같은 카테고리영화를 더보기하면 삭제를 안하고
  if(categorySave === '' || categorySave === category) {
    // 기존의 카드를 지워주는 모듈
    removeCards();

    categorySave = category;
    mkMovieCard(paramMovies);
  } else {
    removeMovies();
    categorySave = category;
    
    // 기존의 카드를 지워주는 모듈
    removeCards();
    // 다른 카테고리영화면 기존 카드를 삭제하고 getMovies도 비워준다. 다시 영화카드를 만들어서 뿌린다.
    mkMovieCard(paramMovies);

  }
}

// 영화카드를 만드는 함수
const mkMovieCard = (param) => {
  const movieDatas = param;
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
}


export {
  categorySave,
  categoryCheck,
  mkMovieCard
}