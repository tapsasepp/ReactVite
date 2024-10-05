import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from "./TodoList";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';


function App() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  }

  return (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab icon={<HomeIcon />} label="HOME"  />
          <Tab icon={<EventNoteIcon />} label="TODOS"  />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <div style={{ fontSize: '1.3rem', color: 'black'}}>
            ToDoList <br />
            Front-End programming
            </div>
            </Box>
          </div>
        )}

        {tabValue === 1 &&  (
          <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TodoList/>
            </Box>
          </div>
          )}
        </div>
      );
    }

export default App
