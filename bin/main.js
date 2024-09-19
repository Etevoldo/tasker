#!/usr/bin/env node
'use strict';
const fs = require('node:fs');

const tasksData = __dirname + '/../tasksData.json';
const command = process.argv[2];

// Check if file exists before trying to use the program
try {
  fs.readFileSync(tasksData, 'utf8')
}
catch(err) {
    createNewTasksData();
    return;
}

//loading taskList from the taskData to further operations later
let taskList;
try {
  taskList = JSON.parse(fs.readFileSync(tasksData, 'utf8'));
}
catch (err) {
  console.error(`Couldn't open tasksData: ${err}`);
}

switch (command) {
  case 'add':
    addTask();
    break;
  default:
    console.log('we aint adding');
    break;
}
//todo split this in another file
function addTask(){
  const taskDescription = process.argv[3];
  const time = new Date().toJSON();

  const newTask = {
    "id": taskList.qty,
    "description": taskDescription,
    "status": "todo",
    "createdAt": time,
    "updatedAt": time
  };

  taskList.tasks.push(newTask);
  taskList.qty++;
  fs.writeFile(tasksData, JSON.stringify(taskList), (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Task: ${taskDescription} saved succeefully!`);
  });
}

function createNewTasksData() {
  const content = {
    "qty": 0,
    "tasks": []
  };

  try {
    fs.writeFileSync(tasksData, JSON.stringify(content));
  }
  catch (err) {
    console.error(`can't create new tasks data file: ${err}`);
    return;
  }
}
