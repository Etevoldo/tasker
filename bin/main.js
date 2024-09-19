#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const tasksData = __dirname + '/../tasksData.json';
const command = process.argv[2];

// debug
process.argv.forEach((val, index, array) => {
  console.log(`${index}: ${val}`)
});

function addTask(){
  const taskName = process.argv[3];
}

console.log(command);
switch (command) {
  case 'add':
    addTask();
    break;
  default:
    console.log('we aint adding');
    break;
}

fs.readFile(tasksData, 'utf8', (err, data) => {
  if (err) {
    createNewTasksData();
    return;
  }
});

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
