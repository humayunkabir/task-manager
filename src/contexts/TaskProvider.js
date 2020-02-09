import React, {useEffect, useReducer} from "react";
import PropTypes from "prop-types";
import taskReducer from '../reducers/taskReducer';
import columnReducer from '../reducers/columnReducer';
import { TaskContext } from './Context';
import {getItemFromStore, setItemToStore} from "../helpers/utils";

const TaskProvider = ({ children }) => {
  const [tasks, taskDispatch] = useReducer(taskReducer, getItemFromStore('tasks', []));
  const [columns, columnDispatch] = useReducer(columnReducer, getItemFromStore('columns', []));
  
  useEffect(() => {
    setItemToStore('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    setItemToStore('columns', columns);
  }, [columns]);
  
  const value = { tasks, taskDispatch, columns, columnDispatch };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

TaskProvider.propTypes = {children: PropTypes.node.isRequired};

export default TaskProvider;
