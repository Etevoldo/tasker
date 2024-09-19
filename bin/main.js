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
try {
  let taskList = JSON.parse(fs.readFileSync(tasksData, 'utf8'));
}
catch (err) {
  console.error(`Couldn't open tasksData: ${err}`)
}


switch (command) {
  case 'add':
    addTask();
    break;
  default:
    console.log('we aint adding');
    break;
}

function addTask(){
  const taskName = process.argv[3];

  console.log(taskName);

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
