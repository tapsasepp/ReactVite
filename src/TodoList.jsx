  // Imports from React
  import { useState } from "react";
  import { useRef } from "react";
  import TodoTable from "./TodoTable";
  import { AgGridReact } from "ag-grid-react";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-material.css";
 

    function TodoList() {

    // States
    const [desc, setDesc] = useState("");
    const [todos, setTodos] = useState([]);
    const [toDoList, setToDoList] = useState({
      description: "",
      date: "",
      priority: "",
    });
    const gridRef = useRef();
    
    // AG-grid Columns
    const [columnDefs] = useState([
      {field: 'description', sortable: false, filter: true, floatingFilter: true} ,
      {field: 'priority', filter: true, floatingFilter: true,
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
      {field: 'date', filter: true, floatingFilter: true}
    ]);

    
    // Handle changes
    const handleDescChange = (event) => {
    setToDoList({
    ...toDoList, description: event.target.value});
  };

  const handlePriorityChange = (event) => {
    setToDoList({ ...toDoList, priority: event.target.value });
  };

  const handleDateChange = (event) => {
    setToDoList({
      ...toDoList, date: event.target.value});
  };
  
  const addTodo = () => {
    setTodos([...todos, toDoList]);
    setToDoList({ description:"", date: "", priority:"",});
  };

  const deleteLine = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todos, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };
  
  // Renders
  return (
    <>
      <input 
        placeholder="Description" 
        onChange={handleDescChange} 
        value={toDoList.description} />
      <input 
        placeholder="Priority" 
        onChange={handlePriorityChange} 
        value={toDoList.priority} /> 
      <input 
        placeholder="Date" 
        onChange={handleDateChange} 
        value={toDoList.date} />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteLine}>Delete</button>
      <div className="ag-theme-material" style={{width: 700, height: 500}}>
        <AgGridReact 
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
        />
      </div> 
    </>
  )  
}
  
  export default TodoList;