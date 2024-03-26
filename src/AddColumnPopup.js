import React, { useState } from 'react';

const AddColumnPopup = ({ onClose, onAddColumn, themeColor }) => {
    const [columnName, setColumnName] = useState('');

    const handleAddColumn = () => {
        if (columnName) {
            onAddColumn(columnName);
            onClose();
        }
    };

    return (
        <div className="add-column-popup">
            <h2>Add a Column</h2>
            <input
                type="text"
                placeholder="Enter column name"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
            />
            <div className="button-container">
                <button onClick={handleAddColumn} style={{ backgroundColor: `var(--theme-color)` }}>Add</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddColumnPopup;
