import React, { useState } from 'react';

const AddNewCategory = ({ addCategory }) => {
    const [showInput, setShowInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newCategoryName.trim() !== '') {
            addCategory(newCategoryName);
            setNewCategoryName('');
            setShowInput(false);
        }
    };
    const handleCancel = () => {
        setShowInput(false);
        setNewCategoryName('');
    };

    return (
        <div>
            {showInput ? (
                <form onSubmit={handleSubmit}>
                    <input
                        className='category-name-textbox'
                        type="text"
                        placeholder="Enter category name"
                        value={newCategoryName}
                        onChange={(event) => setNewCategoryName(event.target.value)}
                        maxLength={15}
                    />
                    <button type="submit" className='confirm-add-category-button' style={{ backgroundColor: `var(--theme-color)` }}>Add Category</button>
                    <button type="button" onClick={handleCancel} className='cancel-add-category-button'>Cancel</button>
                </form>
            ) : (
                <button onClick={handleButtonClick} className='add-category-button'>Add new Category</button>
            )}
        </div>
    );
};

export default AddNewCategory;
