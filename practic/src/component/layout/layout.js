//  컴포넌트 생성
export function Header(props) {
    return (
        <header>
            <h1>
                <a href="/" onClick={(e) =>{
                    e.preventDefault();
                    props.onChangeMode()
                }} >{props.title}</a>
            </h1>
        </header>
    )
}

export function Nav(props) {
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

export function Acticel(props) {
    return(
        <>
            <h2>{props.title}</h2>
            {props.body}
        </>
    )
}