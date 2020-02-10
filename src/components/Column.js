import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classNames from 'classnames';
import Add from "./Add";
import Flex from "./common/flex/Flex";

const Column = ({column, tasks, index, ...rest}) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided) => (
      <Card
        {...provided.draggableProps}
        innerRef={provided.innerRef}
        {...rest}
      >
        <CardHeader
          {...provided.dragHandleProps}
          tag={Flex}
          justify="between"
          align="center"
        >
          <h6 className="mb-0">{column.title}</h6>
          <Button close />
        </CardHeader>
        <Droppable droppableId={column.id} type="task">
          {(provided, snapshot) => (
            <CardBody
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              className={classNames({
                'bg-info': snapshot.isDraggingOver,
                'bg-light': !snapshot.isDraggingOver
              })}
            >
              {!!column.taskIds.length && column.taskIds.map((id, index) => (
                <Task task={{ id, ...tasks.find(task => id === task.id) }} index={index} key={id} />
              ))}
              {/*{provided.placeholder}*/}
            </CardBody>
          )}
        </Droppable>
        <CardFooter>
          <Add type="task" columnId={column.id}/>
        </CardFooter>
      </Card>
    )}
  </Draggable>
);

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
};

export default Column;
