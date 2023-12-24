import './App.css';

//  컴포넌트 생성
function Header(props) {
  return (
    <header>
      <h1><a href="/">{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  let lis = [];
  let topics = props.topics;

  topics.map((element)=> {
    lis.push(<li key={element.id}> <a href={"/read/" +element.id}>{element.title}</a> </li>)
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
  let topics = [
    {id : 1, title : "html", body : "html is ..."},
    {id : 2, title : "css", body : "css is ..."},
    {id : 3, title : "js", body : "js is ..."}
  ]
  return (
    <div>
      <Header title="React" ></Header>
      <Nav topics={topics} ></Nav>
      <Acticel title="Welcome" body="Hellow, Web" ></Acticel>
    </div>
  );
}

export default App;
