import './App.css';
import { useEffect, useMemo, useState } from 'react';

//  0. React엔진 - 데이텨 변경 감지 UI 그려주는
//  1. 실행 과정(index.html) - SPA
//  2. JSX 문법 사용
/*
      1. retrun시에 하나의 Domaks 리턴 할 수 있다.
      2. 변수 선언은 let, const로만 해야 됨
      3. if 사용 불가능 단 3항 연산자는 됨
      4. 조건부 렌더링
      5. css 디자인
        - 내부에 적는 방법
        - 외부 파일에 적는 방법
        - 라이브러리 사용
*/

function App() {
  /*
  const [data, setData] = useState(1);

  //  실행 시점
  //
  // 1. App()함수가 최초 실행될 때 (마운트 떄)
  // 2. 지정 변수 상태 변수가 변경될 때 (그게 dependency 리스트에 등록되어야 함다.)
  // 3. 의존 리스트를 관리 할 수 있다.
  // 
  useEffect(() => {
    console.log("useEffect 실행");
  }, [data])
  return (
    <div>
      <h1>데이터 : {data}</h1>
      <button onClick={() => { setData(data + 1) }} >더하기</button>
    </div>
  );
  */

  // useMemo
  const [list, setList] = useState([1, 2, 3, 4]);
  const [str, setStr] = useState('합계');

  const getAddResult = () => {
    let sum = 0;
    list.forEach(i => sum += i);
    console.log("sum : ", sum)
    return sum
  }

  //  특정 Object가 변경되었을 때만 실행
  const addResult = useMemo(() => getAddResult(), [list]);

  return (
    <div>
      <div>
        <button onClick={() => {
          setStr("안녕");
        }}>문자 변경</button>
      </div>
      <div>
        <button onClick={() => {
          setList([...list, 10])
        }}>리스트값 추가 </button>
      </div>
      <div>

        {list.map((i) => (
          <h1>{i}</h1>
        ))}
        <div>{str} : {getAddResult()}</div>
      </div>
    </div >
  )
}

export default App;
