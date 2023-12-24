import './App.css';
import { useState } from 'react';

//  컴포넌트 생성
function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(e) =>{
        e.preventDefault();
        props.onChangeMode()
      }} >{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  let lis = [];
  let topics = props.topics;

  topics.map((element)=>{
    lis.push(
    <li key={element.id}>
      <a id={element.id} href={"/read/" +element.id} onClick={(e) => {
        e.preventDefault();
        //  해당 테그 내 id값 가져온다.
        props.onChangeMode(Number(e.target.id))
      }} >
        {element.title}
      </a>
    </li>)
  })

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Acticel(props) {
  return(
    <acticle>
      <h2>{props.title}</h2>
      {props.body}
    </acticle>
  )
}

function App() {
  //  스테이터스 생성 mode :스테이서트 값, setMode : mode 값 세팅
  let [mode, setMode] = useState("WELCOME");
  let [id, setId] = useState(null);

  let topics = [
    {id : 1, title : "html", body : "html is ..."},
    {id : 2, title : "css", body : "css is ..."},
    {id : 3, title : "js", body : "js is ..."}
  ]

  let content;
  if(mode === "WELCOME") {
    content = <Acticel title="Welcome" body="Hellow, Web" ></Acticel>
  } else if(mode === "READ") {
    let title, body = null;

    topics.map(element => {
      if(element.id === id) {
        title = element.title;
        body = element.body
      }
    })
    content = <Acticel title={title} body={body} ></Acticel>
  }

  return (
    <div>
      <Header title="React" onChangeMode={() => {
        setMode("WELCOME")
      }} ></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode("READ")
        setId(_id)
      }} ></Nav>
      {content}
    </div>
  );
}

export default App;
