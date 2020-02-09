import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { TaskContext } from "./contexts/Context";
import { Col } from "reactstrap";
import Column from "./components/Column";
import Add from "./components/Add";
import './App.css';

const App = ()  => {
  const { tasks, columns, columnDispatch } = useContext(TaskContext);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    
    // Dropped out of the Droppable Area
    if(!destination) return;

    // Drop column
    if (type === 'column') {
      const newColumns = Array.from(columns);

      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, columns.find(column => column.id === draggableId));

      return columnDispatch({type: 'REARRANGE', payload: newColumns});
    }

    // Dropped task at the previous position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Dropped task into the same Droppable Area
    if (destination.droppableId === source.droppableId) {
      const targetedColumn = columns.find(column => column.id === source.droppableId);

      const taskIds = Array.from(targetedColumn.taskIds);
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);
      
      return columnDispatch({type: 'UPDATE', id: destination.droppableId, payload: { taskIds }});
    }

    // Dropped task into the different Droppable Area
    const dragFromColumn = columns.find(column => column.id === source.droppableId);
    const dragFromColumnTaskIds = Array.from(dragFromColumn.taskIds);
    dragFromColumnTaskIds.splice(source.index, 1);
    
    const dragIntoColumn = columns.find(column => column.id === destination.droppableId);
    const dragIntoColumnTaskIds = Array.from(dragIntoColumn.taskIds);
    dragIntoColumnTaskIds.splice(destination.index, 0, draggableId);

    columnDispatch({type: 'UPDATE', id: source.droppableId, payload: { taskIds: dragFromColumnTaskIds }});
    columnDispatch({type: 'UPDATE', id: destination.droppableId, payload: { taskIds: dragIntoColumnTaskIds }});
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="row"
          >
            {!!columns.length && columns.map((column, index) => (
              <Col
                style={{ width: `${100 / (columns.length + 1)}%`, minWidth: '17rem' }}
                key={column.id}
              >
                <Column
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              </Col>
            ))}
            <Col style={{ width: `${100 / (columns.length + 1)}%`, minWidth: '17rem' }}>
              {provided.placeholder}
            </Col>
            <Add type="column" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
