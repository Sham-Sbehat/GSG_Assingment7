// MUI IMPORTS
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";

function Tasks() {
  const [taskNameInputValue, setTaskNameInputValue] = useState("");
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([
  ]);

  useEffect(() => {
    const storageTask = JSON.parse(localStorage.getItem("tasks"));
    if (storageTask !== null) {
      setTasks(storageTask);
    }
  }, []);

  
  const taskList = tasks.map((task) => {
    return (
      <div key={task.id} className='todo'>
      
          <Box flexGrow={1}>{task.name}</Box>
          <Box mr={2}>
            <Button
              className="submit-edits" title="Delete"
              onClick={() => {
                handleDeleteClick(task.id);
              }}
              variant="outlined"
              color="error"
            >
              delete
            </Button>
          </Box>
          <Box>
            <Button
              className="submit-edits" title="edit"
              onClick={() => {
                handleOpenDialog(task.id);
              }}
              color="secondary"
              variant="outlined"
            >
             
             edit
            </Button>
          </Box>

          
      </div>
    );
  });

 

  const handleClose = () => {
    setOpen(false);
    setUpdatedTaskName("");
  };

  const handleOpenDialog = (taskId) => {
    setSelectedTaskId(taskId);
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      setUpdatedTaskName(taskToUpdate.name);
    }
    setOpen(true);
  };

  const handleUpdateClick = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTaskId) {
        return { ...task, name: updatedTaskName };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleClose();
  };

  function handleDeleteClick(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  

  function handleAddClick() {
    const newTask = { id: uuidv4(), name: taskNameInputValue };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
 
  return (
    <>
      <div
         className="todo-container"
      >
       <Stack
       className="form"
          sx={{ width: 800, margin: "40px" }}
          direction="row"
          spacing={2}
        >
          <TextField
          className="add-task"
            value={taskNameInputValue}
            onChange={(event) => {
              setTaskNameInputValue(event.target.value);
            }}
            label="Task"
            variant="filled"
            focused
          />

          <Button
          className="add-button"
           
            onClick={handleAddClick}
            variant="outlined"
          >
            add
          </Button>
        </Stack>
        <>{taskList}</>
        
      </div>

    </>
  );
}

export default Tasks;