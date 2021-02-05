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
```

# > Javascript Library
```
tagsinput.js      # https://github.com/xoxco/jQuery-Tags-Input
jquery
fontawesome
bootstrap
ekko-lightbox
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

2021.02.05
- `Feature`
  - write 기능 구현
  - 글 보기 기능 구현

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