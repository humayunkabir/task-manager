import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import classNames from 'classnames';
import {Card, CardBody} from "reactstrap";

const Task = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Card
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        innerRef={provided.innerRef}
        className={classNames('mb-3', { 'border': snapshot.isDragging })}
      >
        <CardBody>
          {task.content}
        </CardBody>
      </Card>
    )}
  </Draggable>
);

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
