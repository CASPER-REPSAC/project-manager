# Project Manager

![images](https://img.shields.io/badge/npm-v6.14-brightgreen)
![images](https://img.shields.io/badge/node-v14.15-brightgreen)
![images](https://raw.githubusercontent.com/CASPER-REPSAC/project-manager/main/cover.png)

# > Summary

Casper에서 활동 했던 `프로젝트` 혹은 `개인 프로젝트`를 관리 하는 웹 서비스.

- `학기 프로젝트` 혹은 `개인 프로젝트` 등등 ppt 자료 저장 및 관리
- `프로젝트`에 대한 피드백 혹은 Q&A 가능
- Casper 대 선배님들도 염탐(?) 가능

# > How to use

v1.0이 완성이 되면 올리겠음.

# > Module list

```
express
express-session
nodemon
passport
passport-google-oauth20
mysql2
multer
uuid
```

# > Javascript Library
```
tagsinput.js      # https://github.com/xoxco/jQuery-Tags-Input
jquery
fontawesome
bootstrap
ekko-lightbox
pdf.js            # https://usefulangle.com/post/20/pdfjs-tutorial-1-preview-pdf-during-upload-wih-next-prev-buttons
```

# > Project structure
```
│  .gitattributes
│  .gitignore
│  app.js                   # 메인 파일
│  cover.png
│  db.sql                   # DB 설계 파일
│  package-lock.json
│  README.md
│  
├─config
│      secret.json          # 중요 값들이 들어있는 파일 (api, db)
│      
├─feature
│      checkOauth.js        # [Backend] 권한 확인. (로그인 확인, 권한 확인)
│      checkTheme.js        # [Backend] 사용자 지정 테마 (다크 / 화이트)
│      db.js                # [Backend] mysql db 연결 설정 파일
│      requirement.js       # [Backend] 사용자에게 보내야 하는 필수적인 값들
│      
├─node_modules              # nodejs modules
├─router                    
│      index.js             # [Backend] main page
│      login.js             # [Backend] login page
│      post.js              # [Backend] post page
│      theme.js             # [Backend] Set theme
│      write.js             # [Backend] write page
│      
├─static
│  ├─css
│  │      bootstrap-custom.css  # [Frontend] bootstrap 커스텀 디자인 파일
│  │      bootstrap.css
│  │      bootstrap.min.css
│  │      darkwhite.css         # [Frontend] 다크 / 화이트 모드 디자인 파일
│  │      main.css              # [Frontend] main page 디자인 파일
│  │      post.css              # [Frontend] post page 디자인 파일
│  │      style.css             # [Frontend] 모든 페이지에 적용되는 디자인 파일
│  │      write.css             # [Frontend] write page 디자인 파일
│  │      
│  ├─image
│  │      header1.png
│  │      header2.jpg
│  │      sample.jpg
│  │      
│  └─js
│      │  darkmode.js           # [Frontend] 다크 / 화이트 모드 설정시 서버로 요청을 보냄
│      │  HTML.js               # [Frontend] 동적 element 추가 할 때 필요한 HTML 코드들
│      │  modal.js              # [Frontend] 이미지를 클릭할 때, 모달 창 출력
│      │  write.js              # [Frontend] write page에서 이벤트 리스링
│      │  
│      └─feature
│              writeForm.js     # [Frontend] write page에서 필요한 기능들
│              writesubmit.js   # [Frontend] 글 작성 완료시, 서버로 전송
│              
└─views
        index.ejs
        post.ejs
        write.ejs
```


# > Update

2021.02.18
- `bug`
  - 섹션 추가시, 섹션 범위 max 값 적용 안되는 문제
  - 섹션 범위 min 값 적용
  - page 파라미터 미검증으로 인한 문제
- `feature`
  - 게시글 삭제 시 확인 메시지
  - 게시글 삭제 시 업로드 파일 삭제
  - 404 page
  - 발표 파일 다운로드

2021.02.17
- `bug`
  - [#18](https://github.com/CASPER-REPSAC/project-manager/issues/18) 특정 브라우저에서 동작하지 않는 함수 문제
  - [#20](https://github.com/CASPER-REPSAC/project-manager/issues/20) 답글 달기 버튼 계속 클릭시, 입력 폼이 추가로 나타나는 문제 

2021.02.14
- `Feature`
  - 페이징 기능 구현 (자잘한 버그 존재..)

2021.02.12
- `Feature`
  - 인증을 통한 권한 상승 구현
  - 이슈 버튼 추가

2021.02.11
- `Feature`
  - 게시글 삭제 구현
  - 좋아요 구현
  - 인기 글 구현

2021.02.10
- `Refactoring`
  - 코드 정리

2021.02.09
- `Feature`
  - 파일 업로드 시, 업로드 한 페이지의 총 페이지 표시
  - 파일 업로드 시, 글 작성 범위 란에 최대 페이지 검증
  - 파일 업로드 여부 확인
  - 파일 확장자 및 용량 확인
- `Bug`
  - post 페이지에 개행 안되는 문제 해결

2021.02.07
- `Design`
  - 댓글 디자인
  - 답글 디자인
- `Feature`
  - 댓글 기능 구현
  - 답글 기능 구현
  - main page에 최근 댓글 출력
- `Bug`
  - nodejs로 mysql 시간 값 가져올때, 타입 변경되는 버그 수정

2021.02.06
- `Feature`
  - 파일 업로드 구현
  - pdf to image 구현

2021.02.05
- `Feature`
  - write 기능 구현
  - 글 보기 기능 구현
  - 태그 입력 기능 구현

2021.02.04
- `Design`
  - write page 디자인
- `Feature`
  - google Oauth으로 로그인 구현
  - DB 설계 및 연결


2021.02.03
- `Design`
  - dark mode 디자인
  - main page 디자인 수정
  - post page 추가 및 디자인
- `Feature`
  - 세션을 통해 dark mode 기능 지원
  - image modal 기능 추가

2021.02.02

- 초기 버전
- main page 디자인 

# > Reference
- 좋아요 구현 (https://www.9lessons.info/2013/05/facebook-like-system-with-jquery-mysql.html)