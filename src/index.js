import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from "./contexts/AppProvider";
import TaskProvider from "./contexts/TaskProvider";
// import Workspace from "./components/iframe/Workspace";

ReactDOM.render(
  <AppProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </AppProvider>, document.getElementById('root')
);
