import {useState} from "react";

function AddTodo(props){
    const [title, setTitle] = useState('');
    const onInputChange = (e) => {
        setTitle(e.target.value);
    }
    const addTodo = (e) => {
        e.preventDefault();
        props.addTodo(title);
        setTitle('');
    }
    return (
        <form className="form-container" onSubmit={addTodo}>
            <input type="type" placeholder="Add Todo..." className="input-text" value={title} onChange={onInputChange}/>
            <input type="submit" value="Submit" className="input-submit"/>
        </form>
    )
}
export default AddTodo;