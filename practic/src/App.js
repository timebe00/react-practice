import './App.css';

//  컴포넌트 생성
function Header() {
  return (
    <header>
      <h1><a href="/">Web</a></h1>
    </header>
  )
}

function MenuList() {
  return (
    <nav>
      <ol>
        <li> <a href="/read/1">html</a> </li>
        <li> <a href="/read/2">html</a> </li>
        <li> <a href="/read/3">html</a> </li>
      </ol>
    </nav>
  )
}

function Acticel() {
  return(
    <acticle>
      <h2>Welcom</h2>
      Hello, Web
    </acticle>
  )
}

function App() {
  return (
    <div>
      <Header ></Header>
      <MenuList></MenuList>
      <Acticel></Acticel>
    </div>
  );
}

export default App;
