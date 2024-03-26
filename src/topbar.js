import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';
import ThemePopup from './ThemePopup';
import { logoutFunc } from './App';

function TopBar({ sortOrder, setSortOrder, tasks, categories, onUpdateLists }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showThemePopup, setShowThemePopup] = useState(false);
    const [showAuto, setShowAuto] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [saveAsPdfClicked, setSaveAsPdfClicked] = useState(false);

    const savePNG = async () => {
        const appElement = document.getElementsByClassName('App')[0];
        const canvas = await html2canvas(appElement);
        const dataUrl = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'screenshot.png';
        link.click();
    };

    useEffect(() => {
        if (saveAsPdfClicked) {
            saveAsPDF();
            setSaveAsPdfClicked(false);
        }
    }, [saveAsPdfClicked]);

    const [showRulesPopup, setShowRulesPopup] = useState(false);
    const [selectedType, setSelectedType] = useState('task');
    const [selectedTask, setSelectedTask] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const toggleRulesPopup = () => {
        setShowRulesPopup(!showRulesPopup);
        onUpdateLists();
    };

    const toggleAuto = () => {
        setShowAuto(!showAuto);
        setShowFilters(false);
        setShowMenu(false);
        setShowThemePopup(false);
        setShowShareMenu(false);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
        setShowAuto(false);
        setShowMenu(false);
        setShowThemePopup(false);
        setShowShareMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowAuto(false);
        setShowFilters(false);
        setShowShareMenu(false);
    };

    const toggleThemePopup = () => {
        setShowThemePopup(!showThemePopup);
        setShowAuto(false);
        setShowFilters(false);
        setShowShareMenu(false);
    };

    const toggleFeedbackPopup = () => {
        setShowFeedbackPopup(!showFeedbackPopup);
    };

    const toggleShareMenu = () => {
        setShowShareMenu(!showShareMenu);
        setShowAuto(false);
        setShowMenu(false);
        setShowThemePopup(false);
        setShowFilters(false);
    };

    const sendFeedback = () => {
        const feedbackText = document.getElementById('feedback-textarea').value;
        const emailSubject = 'Feedback for Your App';
        const mailtoLink = `mailto:dianastphx@gmail.com?subject=${encodeURIComponent(
            emailSubject
        )}&body=${encodeURIComponent(feedbackText)}`;
        window.location.href = mailtoLink;
        toggleFeedbackPopup();
    };

    const [notificationRules, setNotificationRules] = useState({
        time: 0,
        target: 'task',
        timerId: null,
        customTimeUnit: 'minutes',
    });

    const handleRuleChange = (key, value) => {
        setNotificationRules((prevRules) => ({
            ...prevRules,
            [key]: value,
        }));
    };

    const setupNotifications = () => {
        const { time, customTimeUnit, target } = notificationRules;

        let timeInMilliseconds;
        if (customTimeUnit === 'minutes') {
            timeInMilliseconds = time * 60 * 1000;
        } else if (customTimeUnit === 'days') {
            timeInMilliseconds = time * 24 * 60 * 60 * 1000;
        } else {
            alert('Unsupported time unit');
            return;
        }

        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    const notificationTimer = setTimeout(() => {
                        new Notification(`Reminder for ${target}`, {
                            body: `It's time to check your ${target}.`,
                        });
                    }, timeInMilliseconds);

                    handleRuleChange('timerId', notificationTimer);
                } else {
                    alert('Notification permission denied');
                }
            });
        } else {
            alert('Notifications not supported in this browser');
        }
    };

    const requestNotificationPermission = async () => {
        try {
            await Notification.requestPermission();
            setupNotifications();
        } catch (error) {
            alert('Notification permission denied');
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(notificationRules.timerId);
        };
    }, [notificationRules.timerId]);

    const timeUnits = [
        { label: 'Minutes', value: 'minutes' },
        { label: 'Days', value: 'days' },
    ];

    const closeMenuOnOutsideClick = (event) => {
        if (
            !event.target.closest('.dropdown-menu') &&
            !event.target.closest('.button') &&
            !event.target.closest('.settings-button')
        ) {
            setShowAuto(false);
            setShowFilters(false);
            setShowMenu(false);
            setShowThemePopup(false);
            setShowShareMenu(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', closeMenuOnOutsideClick);

        return () => {
            document.body.removeEventListener('click', closeMenuOnOutsideClick);
        };
    }, []);

    const saveAsPDF = () => {
        const appElement = document.getElementsByClassName('App')[0];
        const pdfOptions = {
            margin: 10,
            filename: 'your_document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf(appElement, pdfOptions);
    };

    return (
        <div>
            <div className="top-bar">
                <div className="left-section">
                    <img src={logo} alt='To Do' className='logo' />
                    <h1 className="charter-title" id="charter-title">Charter for</h1>
                </div>
                <div className="right-section">
                    <div className="buttons">
                        <button className={`button ${showAuto ? 'active' : ''}`} onClick={toggleAuto}>
                            Automation
                            {showAuto && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={toggleRulesPopup}>Reminders</li>
                                        <li onClick={toggleFeedbackPopup}>Send feedback</li>
                                    </ul>
                                </div>
                            )}
                        </button>

                        <button className={`button ${showFilters ? 'active' : ''}`} onClick={toggleFilters}>
                            Filters
                            {showFilters && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={() => setSortOrder('default')}>By Default</li>
                                        <li onClick={() => setSortOrder('byTasks')}>By No. of tasks</li>
                                        <li onClick={() => setSortOrder('byName')}>By Column Name</li>
                                    </ul>
                                </div>
                            )}
                        </button>

                        <button
                            className={`button ${showShareMenu ? 'active' : ''}`}
                            onClick={toggleShareMenu}>
                            Share
                            {showShareMenu && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={savePNG}>Save as PNG</li>
                                    </ul>
                                </div>
                            )}
                        </button>


                        <button
                            className={`button settings-button ${showMenu ? 'active' : ''}`}
                            onClick={toggleMenu}>
                            <i className='bx bx-dots-horizontal-rounded'></i>
                            {showMenu && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={toggleThemePopup}>Change Theme</li>
                                        <li onClick={logoutFunc}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                {showThemePopup && (
                    <div className="theme-popup">
                        <ThemePopup onClose={toggleThemePopup} />
                    </div>
                )}
            </div>
            {showFeedbackPopup && (
                <div className="feedback-popup">
                    <div className="feedback-content">
                        <button className="close-buttonn" onClick={toggleFeedbackPopup}>
                            X
                        </button>
                        <h2>Give Feedback</h2>
                        <p>What would you like to share with us?</p>
                        <textarea id="feedback-textarea" placeholder="Write your feedback here..." />
                        <button onClick={sendFeedback} style={{ backgroundColor: `var(--theme-color)` }}>Send</button>
                    </div>
                </div>
            )}
            {showRulesPopup && (
                <div className="reminders-popup">
                    <div className="reminders-content">
                        <button className="close-buttonn" onClick={toggleRulesPopup}>
                            X
                        </button>
                        <label className="setReminder">Set Reminder! <br /> <br /></label>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="reminderTime" className="reminderLabel">In </label>
                            <div>
                                <input
                                    className="timeInput"
                                    type="text"
                                    placeholder="Number of"
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        if (/^\d*\.?\d*$/.test(input)) {
                                            handleRuleChange('time', input);
                                        }
                                    }}
                                />
                                <select
                                    className="selectTime"
                                    value={notificationRules.customTimeUnit}
                                    onChange={(e) => handleRuleChange('customTimeUnit', e.target.value)}
                                >
                                    {timeUnits.map((unit) => (
                                        <option key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <label htmlFor="reminderTime" className="reminderLabel"> </label>

                            <label htmlFor="reminderTarget" className="reminderLabel">Remind me about</label>
                            <select
                                className="selectElement"
                                id="reminderTarget"
                                value={notificationRules.target}
                                onChange={(e) => {
                                    handleRuleChange('target', e.target.value);
                                    setSelectedTask(e.target.value);
                                }}
                            >
                                <option value="task" disabled={!selectedTask}>
                                    Select a Task
                                </option>
                                {tasks.map((task) => (
                                    <option key={task}>
                                        {task}
                                    </option>
                                ))}
                                <option value="category" disabled={!selectedCategory}>
                                    Select a Category
                                </option>
                                {categories.map((category) => (
                                    <option key={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <button onClick={requestNotificationPermission} style={{ backgroundColor: `var(--theme-color)` }}>Set Reminder</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopBar;
