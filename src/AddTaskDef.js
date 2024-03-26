import React from 'react';

const TaskCategories = ({ categories, onDelete}) => {
    return (
        <div className = "task-categories-container"> <div>
            <h2>To do</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}
                        <button onClick={() => onDelete(index)} className='delete-category-button'>x</button>
                    </li>
                ))}
            </ul>

        </div>
        <div>
            <h2>Ongoing</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}
                        <button onClick={() => onDelete(index)} className='delete-category-button'>x</button>
                    </li>
                ))}
            </ul>

        </div>
        <div>
            <h2>Done</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}
                        <button onClick={() => onDelete(index)}  className='delete-category-button'>x</button>
                    </li>
                ))}
            </ul>

        </div>
        </div>


    );
};

export default TaskCategories;
