#!/usr/bin/env node
'use strict';
const fs = require('node:fs');

const tasksData = __dirname + '/../tasksData.json';
const command = process.argv[2];

// Check if file exists before trying to use the program
fs.readFile(tasksData, 'utf8', (err) => {
  if (err) {
    createNewTasksData();
    return;
  }
});

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
    "qtd": 0,
    "tasks": []
  };

  fs.writeFile(tasksData, JSON.stringify(content), (err) => {
    if(err) {
      console.error(`can't create new tasks data file: ${err}`);
      return;
    }
    console.log("Created new data file for your tasks");
  });
}
