  // Import useState from react
  import { useState } from "react";
  import TodoTable from "./TodoTable";


    function TodoList() {

    // Declare states
    const [desc, setDesc] = useState("");
    const [todos, setTodos] = useState([]);
    const [toDoList, setToDoList] = useState({
      description: "",
      date: ""
    });
  
    const handleDescChange = (event) => {
    setToDoList({
    ...toDoList, description: event.target.value});
  };

  const handleDateChange = (event) => {
    setToDoList({
      ...toDoList,
      date: event.target.value});
  };
  
  // Remember to call preventDefault() if using form
  const addTodo = () => {
    setTodos([...todos, toDoList]);
    setToDoList({ description:"", date: ""});
  };
  
  return (
    <div>
      Description:<input type="text" onChange={handleDescChange} value={toDoList.description} />
      Date: <input type="text" onChange={handleDateChange} value={toDoList.date} />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} />
    </div>
  );
  }
  
  export default TodoList;