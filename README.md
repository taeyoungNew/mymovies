## my movies

### 1. 프로젝트 설명

#### 1-1. 개발환경
- node v 20.1.0
- html
- javascript
- css
#### 1-2. 폴더구조
- module
  -  addMoreContents.js // 더보기기능의 모듈
  - checkContentType.js // 현재 컨텐츠의 타입을 저장하는 모듈
  - movieApi.js  // TMBD API에 res rqs를 하는 모듈
  - removeCard.js  // 영화 카드를 지워주는 모듈
  - searchMovie.js  // 영화를 검색하는 모듈
  - showMovie.js  // 받아온 영화데이터를 카드로하여 출력하는 모듈
- index.html
- index.js
- css

### 2.  코드의 기본흐름
#### 1) 카테고리 영화보기
(1) 네비게이션바의 카테고리를 눌러 카테고리id를  categoryMovie함수로 보낸다.
```
// index.js
categoryMovie(topRatedClick.id)
```
(2) categoryMovie함수에서 받아온 카테고리id를 getMovieApi함수에 페이지수와 함께 넘긴다.
```
// index.js
  // 카테고리와 페이지수를 넘김
  await getMovieApi(movieCategory, pageCnt);

```

(3)  getMovieApi함수에서 매개변수로 받은 카테고리id와 페이지수를 TMDB의 api로 담아서 넘긴다.
```
// movieApi.js
await fetch(`${API_URL}movie/${category}?language=en-US&page=${pageCnt}`, options)
    .then(response => response.json())
    .then(response => { 
      console.log(response.results);
      // 토탈페이지보다 더 많은 페이지를 요구 할 경우 스톱해주기
      if(response.total_pages < pageCnt) {
        alert('더이상 영화가 없어요.')
      } else {
        if(response.results.length !== 0) {
          getMovies = response.results

        }
      }
    })
```
(4)  받아온 영화 데이터를 mkMovieCard함수로 영화 카드를 만들어 사이트에 출력한다. 
```
// showMovie.js
mkMovieCard(paramMovies);        
```


#### 2) 검색한 영화보기
(1) 검색버튼을 눌러 입력값과 현제 가지고 있는 영화 리스트를 searchMovies함수로 보낸다.
```
// index.js
// 현재 가지고있는 영화리스트와 input창에 입력한 영화타이틀을 매개변수로 넘겨준다.
 await searchMovies(getMovies, inputValue)
```

(2) 현재 영화리스트안에 클라이언트가 검색한 영화제목에 해당하는 영화 정보가 있는지 없는지 확인하고 있으면 기존의 영화데이터안에서 찾아 카드를 출력하고 없으면 TMDB의 searchAPI로 rqs를 보낸다. 
```
// 검색이었는지 카테고리였는지 확인하는 절차를 밟고 
  if(contentType === 'category') {
    // 카테고리였으면 기존에 영화리스트에서 찾고
    await movieList.forEach((x) => {
      if(x.title.toUpperCase().includes(title.toUpperCase())) {
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

```



#### 3) 더보기 버튼
