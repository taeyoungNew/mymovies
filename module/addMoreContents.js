// 먼저 카테고리영화찾기인지 검색영화찾기인지확인하자
// 어떻게????
import { contentType } from "./checkContentType.js"
import { searchMovieApi, getMovieApi, getMovies } from "./movieApi.js";
import { mkMovieCard} from "./showMovie.js";

// 더보기는 pageCnt를 하나씩 늘려줘야한다.
let pageCnt = 2;

// 카테고리를 눌렀을 때 저장할 카테고리 타이틀
let nowCategory = '';

// 클라이언트가 검색하였을 떄 저장할 입력 타이틀
let title = ''

// 더보기가 api로 보낼 타이틀을 저장하는 함수
const saveTitle = (inputValue) => {
  title = inputValue;
  pageCnt = 2;
}

const addMoreContents = async (param) => {
  if(contentType ===  'category') {
    // nowCategory가 값이 없으면 param을 저장한다.
    if(nowCategory === '') {
      nowCategory = param
    }
    // 다른카테고리를 눌렀을 경우 저장한 nowCategory와 param을 비교하여 틀리면 페이지의 수를 리셋한다.
    if(nowCategory !== param) {
      nowCategory = param
      pageCnt = 2;
    }
    // 현재카테고리와 페이지수를 api로 보내어 데이터를 가져온다.
    await getMovieApi(nowCategory, pageCnt)
    mkMovieCard(getMovies)

  } else if(contentType === 'search') {
    // await를 안하면 api를 채 불러오기존에 card가 생성되버린다.
    await searchMovieApi(title, pageCnt)
    mkMovieCard(getMovies)
  }
  pageCnt++;
}


export {
  saveTitle,
  addMoreContents,
  pageCnt,
}