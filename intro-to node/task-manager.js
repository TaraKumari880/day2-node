const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Define the path to the tasks file
const tasksFilePath = path.join(__dirname, 'tasks.txt');

// Read tasks from the file
const readTasks = () => {
  if (!fs.existsSync(tasksFilePath)) {
    return [];
  }
  const data = fs.readFileSync(tasksFilePath, 'utf-8');
  return data.split('\n').filter(line => line.trim() !== '').map(line => {
    const match = line.match(/^\[( |x)\] (.*)$/);
    return {
      description: match[2],
      completed: match[1] === 'x'
    };
  });
};

// Write tasks to the file
const writeTasks = (tasks) => {
  const data = tasks.map(task => [${task.completed ? 'x' : ' '}] ${task.description}).join('\n');
  fs.writeFileSync(tasksFilePath, data);
};

// Add a new task
const addTask = (taskDescription) => {
  const tasks = readTasks();
  tasks.push({ description: taskDescription, completed: false });
  writeTasks(tasks);
  console.log('Task added successfully.');
};

// View a list of tasks
const viewTasks = () => {
  const tasks = readTasks();
  tasks.forEach((task, index) => {
    console.log(${index + 1}. ${task.description} [${task.completed ? 'Completed' : 'Incomplete'}]);
  });
};

// Mark a task as complete
const markTaskAsComplete = (taskIndex) => {
  const tasks = readTasks();
  if (taskIndex < 1 || taskIndex > tasks.length) {
    console.log('Invalid task number.');
    return;
  }
  tasks[taskIndex - 1].completed = true;
  writeTasks(tasks);
  console.log('Task marked as complete.');
};

// Remove a task
const removeTask = (taskIndex) => {
  const tasks = readTasks();
  if (taskIndex < 1 || taskIndex > tasks.length) {
    console.log('Invalid task number.');
    return;
  }
  tasks.splice(taskIndex - 1, 1);
  writeTasks(tasks);
  console.log('Task removed successfully.');
};