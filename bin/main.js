#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const tasks = require('./tasks.js');

const tasksDataPath = __dirname + '/../tasksData.json';
const command = process.argv[2];

// Check if file exists before trying to use the program
try {
  fs.readFileSync(tasksDataPath, 'utf8')
}
catch(err) {
  createNewTasksData();
}

let taskData = new tasks.Tasks(tasksDataPath);

switch (command) {
  case 'add':
    taskData.add();
    break;
  case 'update':
    taskData.update();
    break;
  case 'delete':
    taskData.exclude();
    break;
  case 'list':
    taskData.list();
    break;
  default:
    console.log('we aint adding');
    break;
}

function createNewTasksData() {
  const content = {
    "qty": 0,
    "taskList": []
  };

  try {
    fs.writeFileSync(tasksDataPath, JSON.stringify(content));
  }
  catch (err) {
    console.error(`can't create new tasks data file: ${err}`);
    return;
  }
  console.log("Created new tasks data file");
}
