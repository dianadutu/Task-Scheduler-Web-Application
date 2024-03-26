import React from 'react';
import './ThemePopup.css';

const ThemePopup = ({ onClose }) => {
    const changeTheme = (color1,backgroundImage) => {
        document.documentElement.style.setProperty('--theme-color', color1);
        const topBar = document.querySelector('.top-bar');
        const App = document.querySelector('.App');
        const addColumnButton = document.querySelector('.add-column-button');
        const addTaskButton = document.querySelector('.confirm-add-category-button');

        if (topBar) {
            topBar.style.backgroundColor = color1;
        }
        if (App) {
            App.style.backgroundColor = ''; // Reset background color
            App.style.backgroundImage = `url(${backgroundImage})`;
        }
        if (addColumnButton) {
            addColumnButton.style.backgroundColor = color1; // Schimbăm culoarea butonului
        }

        if (addTaskButton) {
            addTaskButton.style.backgroundColor = `var(--theme-color)`;
        }
    };

    return (
        <div className="theme-popup">
            <div className="theme-content">
                <h3>Choose a Theme</h3>
                <div className="theme-buttons">
                <button style={{ backgroundColor: 'lightblue', color: 'white' }} className="theme-button" onClick={() => changeTheme('#c1dddf', '')}>Default</button>
                    <button style={{ backgroundColor: 'pink', color: 'white' }} className="theme-button" onClick={() => changeTheme('#FF90BC', 'https://i.etsystatic.com/22098416/r/il/ef7a12/2542952296/il_fullxfull.2542952296_fgta.jpg')}>Barbie</button>
                    <button style={{ backgroundColor: 'gray', color: 'white' }} className="theme-button" onClick={() => changeTheme('#4F4A45', 'https://i.imgur.com/PCZOeXX.jpeg')}>Star Wars</button>
                    <button style={{ backgroundColor: '#860A35', color: 'white' }} className="theme-button" onClick={() => changeTheme('#17B169', 'https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')}>Christmas</button>
                    <button style={{ backgroundColor: '#ACE1AF', color: 'white' }} className="theme-button" onClick={() => changeTheme('#ACE1AF', 'https://i.etsystatic.com/13631806/r/il/767edb/3473287803/il_794xN.3473287803_82v1.jpg')}>Nature</button>
                    <button style={{ backgroundColor: '#89CFF0', color: 'white' }} className="theme-button" onClick={() => changeTheme('#89CFF0', 'https://media.newyorker.com/photos/5b5a414992497e4fd0017662/master/w_1920,c_limit/Sunday-Reading-Under-the-Sea.jpg')}>Under the sea</button>
                </div>
                <button onClick={onClose} className="close-button">Close</button>
                <button onClick={onClose} className="close-button" style={{ backgroundColor: `var(--theme-color)` }}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ThemePopup;
