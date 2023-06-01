let contentType = "";

// 더보기버튼을 눌렀을때 카테고리영화를 더 불러와야할지 검색api에서 더 불러와야할지 구분하는 함수를 정의
const changeType = (typeParam) => {
  // 카테고리를 눌렀을때 category가 검색버튼을 눌렀을때 search가 매개변수로 온다.
  contentType = typeParam;
}

export {
  contentType, 
  changeType
}