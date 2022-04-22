import Header from "./layout/Header";
import {useEffect, useState} from "react";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import { v4 } from 'uuid';
import axios from "axios";

function TodoApp(){
    const [todos,setTodos] = useState([]);
    console.log("Hello");
    const handleCheckboxChange = (id) => {
        let todosAPInew = todos.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed;
            }
            return todo;
        })
       setTodos(todosAPInew);
    }
    const deleteTodo = (id) => {
        console.log(id);
        let todosAPInew = todos.filter(todo => {
            return todo.id !== id;
        })
        axios.delete("https://jsonplaceholder.typicode.com/todos/${id}")
            .then(response => {
                console.log(response.data);
                setTodos(todosAPInew);
            });
       ;
    }
    const addTodo = (title) => {
        const newTodo = {
            id: v4(),
            title: title,
            completed: false
        }
        axios.post("https://jsonplaceholder.typicode.com/todos",newTodo)
            .then(response => {
            console.log(response.data);
            setTodos([...todos, newTodo])
            });
    };
    useEffect(()=>{
       const config ={
           params: {
               _limit: 5
           }
       }
       axios.get("https://jsonplaceholder.typicode.com/todos",config).then(response => setTodos(response.data));
    },[])
    return (
        <div className="container">
            <Header />
            <AddTodo addTodo={addTodo}/>
            <Todos todos={todos} handleChange={handleCheckboxChange} deleteTodo={deleteTodo}/>
        </div>

    )
}
export default TodoApp;