import React, { useState, useEffect } from 'react';
import CategoryPage from './Category';
import './categories.css';
import './App.css';
import './topbar.css';
import TopBar from './topbar';
import TaskPage from './AddTask';
import { initKeycloak, getKeycloakInstance } from './keycloak';
import { cats } from "./Category";
import { tsks } from "./AddTask";

function logoutFunc() {
  alert("Logout.");
}

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      const init = async () => {
        try {
          await initKeycloak();
          const authenticated = await getKeycloakInstance().authenticated;
          setAuthenticated(authenticated);
  
          if (authenticated) {
            // Get user information
            const userInfo = await getKeycloakInstance().loadUserInfo();
            setUserInfo(userInfo);
            const userName = userInfo["given_name"];
            document.getElementById("charter-title").innerText = "Charter for " + userName;
          }
        } catch (error) {
          console.error('Keycloak initialization failed:', error);
        }
      };
  
      init();
    }, []);
  
    logoutFunc = async () => {
      try {
        await getKeycloakInstance().logout();
      } catch (error) {
        console.error('Keycloak logout failed:', error);
      }
    };

    const [sortOrder, setSortOrder] = useState('default');
    const [handledCats, setHandledCats] = useState([]);
    const [handledTasks, setHandledTasks] = useState([]);
    const [updateLists, setUpdateLists] = useState(false);
    const handleUpdateLists = () => {
        setUpdateLists(true); // Set the flag to trigger the update
    };



    // Use useEffect to update handledCats and handledTasks when updateLists is true
    useEffect(() => {
        if (updateLists) {
            setHandledCats(cats.map(cat => cat.cat));
            setHandledTasks(Object.values(tsks).flat());
            setUpdateLists(false); // Reset the flag after updating
        }
    }, [updateLists]);

    return (
        <div className="App">
            <TopBar sortOrder={sortOrder} setSortOrder={setSortOrder} tasks={handledTasks} categories={handledCats} onUpdateLists={handleUpdateLists} />
            <div className="categoriesAndTasks">
                <CategoryPage />
                <TaskPage sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
        </div>
    );
};

export { logoutFunc };
export default App;