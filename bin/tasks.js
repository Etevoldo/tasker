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
    const taskToUpdate = this.tasksData.taskList[this.#findIndexById(id)];
    const oldDescription = taskToUpdate.description;

    taskToUpdate.description = UpdatedDescripton;
    taskToUpdate.updatedAt = new Date().toJSON();

    fs.writeFile(this.path, JSON.stringify(this.tasksData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Task #' + id + ' "' + oldDescription
          + '"\nUpdated to: "' + UpdatedDescripton + '"\nSuccefully!');
    });
  }

  exclude() {
    const id = process.argv[3];
    const index = this.#findIndexById(id);
    const oldDescription = this.tasksData.taskList[index].description;

    this.tasksData.taskList.splice(index, 1);

    fs.writeFile(this.path, JSON.stringify(this.tasksData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Task #' + id + ' "' + oldDescription
          + '\nDeleted Succefully!');
    });
  }

  list() {
    const filter = process.argv[3];

    function listElement(element) {
      console.log(
        "#" + element.id +
        "\nDescription: " + element.description +
        "\nStatus: " + element.status +
        "\nCreated: " + new Date(element.createdAt).toLocaleString() +
        "\nLast Updated: " + new Date(element.updatedAt).toLocaleString() +
        "\n"
      );
    }

    if (!filter) {
      this.tasksData.taskList.forEach((element) => {
        listElement(element);
      });
    }
    else {
      const filteredArray = this.tasksData.taskList.filter((element) =>
        element.status === filter
      );

      filteredArray.forEach((element) => { listElement(element); });
    }
  }

  markStatus(newStatus) {
    const id = process.argv[3];
    this.tasksData.taskList[this.#findIndexById(id)].status = newStatus;

    fs.writeFile(this.path, JSON.stringify(this.tasksData), (err) => {
      if (err) {
        console.error(err);
      }
      console.log(`Task #${id} marked to: ${newStatus}`);
    });
  }

  #findIndexById(id) {
    const taskList = this.tasksData.taskList;
    const found = taskList.find((task) => task.id == id);
    return taskList.indexOf(found);
  }
}
