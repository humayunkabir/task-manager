import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {TaskContext} from "../contexts/Context";
import {Button, Form, Input, InputGroup, InputGroupAddon} from "reactstrap";
import uuid from "uuid/v1";

const Add = ({ type, columnId }) => {
  const { taskDispatch, columns, columnDispatch } = useContext(TaskContext);
  const [text, setText] = useState('');
  const [active, setActive] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (type === 'task') {
      const id = uuid();
      taskDispatch({type: 'ADD', payload: {id, content: text }});
      const { taskIds } = columns.find(column => column.id === columnId);
      columnDispatch({type: 'UPDATE', id: columnId, payload: { taskIds: [...taskIds, id] }});
    }

    if (type === 'column') columnDispatch({type: 'ADD', payload: { title: text }});

    setText('');
  };

  return active ? (
    <Form onSubmit={handleSubmit} style={{ minWidth: '17rem' }}>
      <InputGroup>
        <Input value={text} onChange={({ target }) => setText(target.value)}/>
        <InputGroupAddon addonType='append'>
          <Button color="primary" type="submit" disabled={!text}>Add {type}</Button>
          <Button close onClick={() => setActive(false)}  className="ml-2"/>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  ) : (
    <Button color='light' block onClick={() => setActive(true)}>+ Add {type}</Button>
  );
};

Add.propTypes = {
  type: PropTypes.oneOf(['task', 'column']).isRequired,
  columnId: PropTypes.string
};

Add.defaultProps = { columnId: '' };

export default Add;
