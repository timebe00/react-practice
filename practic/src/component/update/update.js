import { useState } from 'react';

//  props = "외부자가 내부자에게 주는 값"
//  state = "내부자가 사용하는 값"
export function Update(props) {
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