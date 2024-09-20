'use strict';

const fs = require('node:fs');

exports.Tasks = class Tasks {
  constructor(path) {
    try {
      this.tasksData = JSON.parse(fs.readFileSync(path, 'utf8'));
      this.path = path;
    }
    catch (err) {
      console.error(`Cound't load your task list! ${err}`);
    }
  }

  add(description){
    const time = new Date().toJSON();

    const newTask = {
      "id": this.tasksData.qty,
      "description": description,
      "status": "todo",
      "createdAt": time,
      "updatedAt": time
    };

    this.tasksData.taskList.push(newTask);
    this.tasksData.qty++;
    fs.writeFile(this.path, JSON.stringify(this.tasksData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log(`Task: ${description} saved succeefully!`);
    });
  }
}
