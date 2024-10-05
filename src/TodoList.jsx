  // Imports from React
  import { useState } from "react";
  import { useRef } from "react";
  import TodoTable from "./TodoTable";
  import { AgGridReact } from "ag-grid-react";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-material.css";
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import dayjs from 'dayjs';
  import 'dayjs/locale/en-gb';
  import DeleteIcon from '@mui/icons-material/Delete';
 

    function TodoList() {

    // States
    const [desc, setDesc] = useState("");
    const [todos, setTodos] = useState([]);
    const [toDoList, setToDoList] = useState({
      description: "",
      date: null,
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

  const handleDateChange = (inputDate) => {
    setToDoList({
      ...toDoList, date: inputDate});
  };
  
  const addTodo = () => {
    const formatDate = {
      ...toDoList,
      date: toDoList.date ? dayjs(toDoList.date).format("YYYY-MM-DD") : ""
    }
    setTodos([...todos, formatDate]);
    setToDoList({ description:"", date: null, priority:"",});
  };

  const deleteLine = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todos, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
  };
  
  // Renders
  return (
    <>
    <div className="input-container">
      <input 
        placeholder="Description" 
        onChange={handleDescChange} 
        value={toDoList.description} />
      <input 
        placeholder="Priority" 
        onChange={handlePriorityChange} 
        value={toDoList.priority} /> 

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker value={toDoList.date} onChange={(handleDateChange)} sx={{ width: '100%' }} />
      </LocalizationProvider>
      </div>
      
      <button className="add_button" onClick={addTodo}>Add</button>
      <button icon={<DeleteIcon />} className="delete_button" onClick={deleteLine}>Delete</button>
      

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