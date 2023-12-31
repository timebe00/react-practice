import './App.css';
import { useState } from 'react';

import { Header, Nav, Acticel } from './component/layout/layout.js';
import { Create } from './component/create/create.js';
import { Update } from './component/update/update.js';

function App() {
  //  스테이터스 생성 mode :스테이서트 값, setMode : mode 값 세팅
  let [mode, setMode] = useState("WELCOME");
  let [id, setId] = useState(null);
  let [nextId, setNextId] = useState(4)
  let [topics, setTopics] = useState([
    {id : 1, title : "html", body : "html is ..."},
    {id : 2, title : "css", body : "css is ..."},
    {id : 3, title : "js", body : "js is ..."}
  ]);

  let contextControl;
  let content;

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
    contextControl = <>
      <li><a href={"/update/" + id} onClick={(e) =>{
        e.preventDefault();
        setMode('UPDATE')
      }} >Update</a></li>
      <li><input type='button' value="Delete" onClick={async () => {
        let newTopics = [];

        for(let topicIdx in topics) {
          let topic = topics[topicIdx];
          if(topics[topicIdx].id !== id) {
            newTopics.push(topic);
          }
        }
        
        setTopics(newTopics);
        setMode("WELCOME");
      }} /></li>
    </>
  } else if(mode === "CREATE") {
      content = <Create onCreate={async (_title, _body) => {
      // 객체 변경
      let newTopic = {id: nextId , title:_title, body : _body};
      let newTopics = [...topics];
      newTopics.push(newTopic);

      // 페이지 변경
      await setTopics(newTopics);
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

    content = <Update title={title} body={body} onUpdate={async (_title, _body) => {
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
