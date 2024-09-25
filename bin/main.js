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
    const description = process.argv[3];
    taskData.add(description);
    break;
  case 'update':
    const idToUpdate = process.argv[3];
    const UpdatedDescripton = process.argv[4];
    taskData.update(idToUpdate, UpdatedDescripton);
    break;
  case 'delete':
    const idToExclude = process.argv[3];
    taskData.exclude(idToExclude);
    break;
  case 'list':
    const filter = process.argv[3];
    taskData.list(filter);
    break;
  case 'mark-in-progress':
    taskData.markStatus('in-progress');
    break;
  case 'mark-done':
    taskData.markStatus('done');
    break;
  default:
    console.log(`Unknown command: ${command}`);
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
    console.error(`Can't create new tasks data file: ${err}`);
    return;
  }
  console.log("Created new tasks data file");
}
