import React, { useState } from 'react';

function TodolistApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newTime, setNewTime] = useState("");

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === "task") {
            setNewTask(value);
        } else if (name === "time") {
            setNewTime(value);
        }
    }

    function addTask() {
        if (newTask.trim() !== "") {
            const taskObject = {
                task: newTask,
                time: newTime,
                completed: false // Initially set as incomplete
            };
            setTasks(prevTasks => [...prevTasks, taskObject]);
            setNewTask("");
            setNewTime("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleTaskStatus(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>TASKS FOR THE DAY</h1>
            <div>
                <input
                    type="text"
                    name="task"
                    placeholder="Enter your task to add..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Enter time (optional)..."
                    value={newTime}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className={task.completed ? "completed text" : "text"}>{task.task}</span>
                        {task.time && (
                            <div>
                                <span className="time">Time: {task.time}</span>
                                <div className="timer-animation"></div>
                            </div>
                        )}
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskStatus(index)}
                        />
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            ☝
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodolistApp;
