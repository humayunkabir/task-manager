import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from "./contexts/AppProvider";
import TaskProvider from "./contexts/TaskProvider";

ReactDOM.render(
  <AppProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </AppProvider>,
  document.getElementById('root')
);
