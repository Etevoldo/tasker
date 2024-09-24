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

  add(){
    const description = process.argv[3];
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

  update() {
    const id = process.argv[3];
    const UpdatedDescripton = process.argv[4];
    let taskToUpdate = this.tasksData.taskList[id];

    const time = new Date().toJSON();
    const oldDescription = taskToUpdate.description;

    taskToUpdate.description = UpdatedDescripton;
    taskToUpdate.updatedAt = time;

    fs.writeFile(this.path, JSON.stringify(this.tasksData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Task: #' + id + ' "' + oldDescription
          + '"\nUpdated to: "' + UpdatedDescripton + '"\nSucceefully!');
    });
  }

  delete() {
    const id = process.argv[3];
    const oldDescription = this.tasksData.taskList[id].description;
    delete this.tasksData.taskList[id];
    console.log(this.tasksData.taskList);

    fs.writeFile(this.path, JSON.stringify(this.tasksData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Task: #' + id + ' "' + oldDescription
          + '\n Deleted Succeefully!');
    });
  }
}
