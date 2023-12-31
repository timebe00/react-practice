export function Create(props) {
    return (
        <article>
        <h2>Create</h2>
        <form onSubmit={(e) => {
            e.preventDefault();
            let title = e.target.title.value;
            let body = e.target.body.value;
            props.onCreate(title, body);
        }} >
            <p><input type='text' name="title" placeholder='title' /></p>
            <p><textarea name="body" placeholder='body' ></textarea></p>
            <p><input type='submit' value="create" /></p>
        </form>
        </article>
    )
}