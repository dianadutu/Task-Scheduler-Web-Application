import React, { useState } from 'react';
import { cats } from './Category';
import './dropdown.css'; // Import the CSS file

const Dropdown = ({ options, onSelectColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  let getColour = (value) => {
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].cat === value) {
        return cats[i].colour;
      }
    }
  };

  const onOptionClicked = (value) => () => {
    const selectedColor = getColour(value);
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedColor);
    onSelectColor(selectedColor); // Transmite culoarea către componenta părinte
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggling}>
        {selectedOption || 'Select a category'}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li className="dropdown-list-item" onClick={onOptionClicked(option)} key={index}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
