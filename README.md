# Cheppy

## 1. server 실행
    cd server  
    npm start

## 2. front 실행

    cd cheppy  
    npm run dev
    
## 3. 동시 실행

    npm start
    
## api 정리 (추가 필요)

### 1. 코드 실행: 
  - POST 
  - body : {code: string} // 학생이 작성한 code 
  - {baseurl}/runcode/run
  

### 2. 코드 채점: 
  - PUT 
  - parameter: num // 해당 문제 번호
  - body : {code: string} // 학생이 작성한 code
  - {baseurl}/runcode/grade/:num
