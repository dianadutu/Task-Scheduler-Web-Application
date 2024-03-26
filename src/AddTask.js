import React, {useEffect, useState} from 'react';
import './tasks.css';
import TaskColumn from './TaskColumn';
import AddColumnPopup from './AddColumnPopup';

let tsks = [];
function AddTask({sortOrder, setSortOrder }) {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    done: []
  });
  const [showForm, setShowForm] = useState(false);

  const moveTask = (sourceCategory, taskId, targetCategory) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[sourceCategory] = updatedTasks[sourceCategory] || [];
      const taskToMove = updatedTasks[sourceCategory].find(task => task.id === taskId);

      if (!taskToMove) {
        console.error(`Task with ID ${taskId} not found.`);
        return updatedTasks;
      }

      updatedTasks[sourceCategory] = updatedTasks[sourceCategory].filter(task => task.id !== taskId);

      updatedTasks[targetCategory] = updatedTasks[targetCategory] || [];
      updatedTasks[targetCategory] = [...updatedTasks[targetCategory], taskToMove];

      return updatedTasks;
    });
  };

  const handleAddTask = (taskDescription, category, color, name, priority, id = 0) => {
    let newTask = { id: Date.now(), description: taskDescription, color: color, name: name, priority: priority};

    if(id) {
      newTask.id = id;
    }
    setTasks(prevTasks => ({
      ...prevTasks,
      [category]: [...prevTasks[category], newTask]
    }));
  };

  const deleteTasks = (category, taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[category] = updatedTasks[category].filter(task => task.id !== taskId);
      return updatedTasks;
    });
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const deleteColumn = columnName => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[columnName];
    setTasks(updatedTasks);
  };


  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);

  const addColumn = () => {
    setShowAddColumnPopup(true);
  };

  const handleAddColumn = (columnName) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [columnName]: [],
    }));
  };

  const [taskCounts, setTaskCounts] = useState({
    todo: 0,
    ongoing: 0,
    done: 0,
  });

  // Update task counts whenever tasks change
  useEffect(() => {
    const newTaskCounts = Object.fromEntries(
        Object.entries(tasks).map(([category, categoryTasks]) => [category, categoryTasks.length])
    );
    setTaskCounts(newTaskCounts);
    tsks = Object.fromEntries(
        Object.entries(tasks).map(([category, categoryTasks]) => [category, categoryTasks.map(task => task.name)])
    );
    console.log(tsks);
  }, [tasks]);

  const getSortedColumns = () => {
    if (sortOrder === 'byName') {
      return Object.keys(tasks).sort();
    } else if (sortOrder === 'default') {
      return Object.keys(tasks);
    } else if (sortOrder === 'byTasks') {
      return Object.keys(taskCounts).sort((a, b) => taskCounts[b] - taskCounts[a]);
    }
  };

  return (
      <div className="task-containers">
        <div className="task-columns">
          {getSortedColumns().map((category) => (
              <TaskColumn
                  key={category}
                  category={category}
                  tasks={tasks[category]}
                  categories={Object.keys(tasks)}
                  onAddTask={handleAddTask}
                  onDeleteTask={deleteTasks}
                  onDeleteColumn={deleteColumn}
                  onMoveTask={(taskId, targetCategory) => moveTask(category, taskId, targetCategory)}
                  setShowForm={toggleForm}
              />
          ))}
          <button onClick={addColumn} className="add-column-button">
            Add new column
          </button>
        </div>
        {showAddColumnPopup && (
            <div className="add-column-popup-overlay">
              <div className="add-column-popup">
                <AddColumnPopup onClose={() => setShowAddColumnPopup(false)} onAddColumn={handleAddColumn} />
              </div>
            </div>
        )}
      </div>
  );
}
export {tsks};
export default AddTask;