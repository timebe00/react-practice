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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let body = e.target.body.value;
        props.onUpdate(title, body);
      }} >
        <p><input type='text' name="title" placeholder='title' /></p>
        <p><textarea name="body" placeholder='body' ></textarea></p>
        <p><input type='submit' value="create" /></p>
      </form>
    </article>
  )
}

//  props = "외부자가 내부자에게 주는 값"
//  state = "내부자가 사용하는 값"
function Update(props) {
  let [title, setTitle] = useState(props.title);
  let [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let body = e.target.body.value;
        props.onUpdate(title, body);
      }} >
        <p><input type='text' name="title" placeholder='title' value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} /></p>
        <p><textarea name="body" placeholder='body' value={body} onChange={(e) => {
          setBody(e.target.value)
        }} ></textarea></p>
        <p><input type='submit' value="updtae" /></p>
      </form>
    </article>
  )
}

function App() {
  //  스테이터스 생성 mode :스테이서트 값, setMode : mode 값 세팅
  let [mode, setMode] = useState("WELCOME");
  let [id, setId] = useState(null);
  let [nextId, setNextId] = useState(4)

  let contextControl;
  let content;
  let [topics, setTopics] = useState([
    {id : 1, title : "html", body : "html is ..."},
    {id : 2, title : "css", body : "css is ..."},
    {id : 3, title : "js", body : "js is ..."}
  ])

  if(mode === "WELCOME") {
    content = <Acticel title="Welcome" body="Hellow, Web" ></Acticel>
  } else if(mode === "READ") {
    let title, body = null;

    topics.map(element => {
      if(element.id === id) {
        title = element.title;
        body = element.body;
      }
    })

    content = <Acticel title={title} body={body} ></Acticel>
    contextControl = <li><a href={"/update/" + id} onClick={(e) =>{
      e.preventDefault();
      setMode('UPDATE')
    }} >Update</a></li>
  } else if(mode === "CREATE") {
      content = <Create onCreate={(_title, _body) => {
      // 객체 변경
      let newTopic = {id: nextId , title:_title, body : _body};
      let newTopics = [...topics];
      newTopics.push(newTopic);

      // 페이지 변경
      setTopics(newTopics);
      setMode("READ");
      setId(nextId++);
      setNextId(nextId);
    }} ></Create>
  } else if(mode === "UPDATE") {
    let title, body = null;

    topics.map(element => {
      if(element.id === id) {
        title = element.title;
        body = element.body;
      }
    })

    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      let updateTopic = {id : id, title : _title, body : _body};
      let newTopics = [...topics];
      
      for(let topicIdx in newTopics) {
        let topic = newTopics[topicIdx];
        if(topic.id == id) {
          newTopics[topicIdx] = updateTopic;
          break;
        }
      }

      setTopics(newTopics);
      setMode("READ");
    }}></Update>
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

      <ul>
        <li>
          <a href='/create' onClick={(e) =>{
            e.preventDefault();
            setMode("CREATE");
          }} >Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
