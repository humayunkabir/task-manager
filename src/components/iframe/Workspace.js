import React, {useState} from "react";
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { Button, Col, Container, Row } from "reactstrap";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import '../../App.css';

const rawColors = [
  {
    id: '1',
    name: 'primary',
  },
  {
    id: '2',
    name: 'info',
  },
  {
    id: '3',
    name: 'danger',
  },
  {
    id: '4',
    name: 'warning',
  },
  {
    id: '5',
    name: 'success',
  },
];

const DragItem = ({ color, index }) => (
  <Draggable draggableId={color.id} index={index} type="COLOR">
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        ref={provided.innerRef}
        className={`bg-${color.name} p-3 mb-3`}
      >
        <span{...provided.dragHandleProps} className='bg-white p-3 m-n3'>Drag</span>
      </div>
    )}
  </Draggable>
);

const Workspace = () => {
  const [colors, setColors] = useState([...rawColors]);
  const [droppedItems, setDroppedItems] = useState([]);
  
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // Dropped out of the Droppable Area
    if(!destination) return;

    // Dropped task at the previous position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Dropped task into the same Droppable Area
    if (destination.droppableId === source.droppableId) {
      console.log({ destination, source, draggableId, type });
      const targetedColor = colors.find(color => color.id === draggableId);

      colors.splice(source.index, 1);
      colors.splice(destination.index, 0, targetedColor);
      //
      // return columnDispatch({type: 'UPDATE', id: destination.droppableId, payload: { taskIds }});
      setColors(colors);
    }
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="colors" type="COLOR">
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`bg-${snapshot.isDraggingOver ? 'dark': 'light'} min-vh-100`}
            >
              <Container>
                <Row>
                  <Col xs={2}>
                    {colors.map((color, index) => (
                      <DragItem
                        color={color}
                        index={index}
                        key={color.id}
                      />
                    ))}
                  </Col>
                  <Col>
                    <Frame
                      style={{ width: '100%', height: '100vh' }}
                      head={
                        <link href='https://prium.github.io/twbs-sparrow/v1.4.1/assets/css/theme.css' rel='stylesheet'></link>
                      }
                    >
                      <FrameContextConsumer >
                        {({document, window}) => {
                          // Callback is invoked with iframe's window and document instances
                          console.log(document, window);
                          
                          return (
                            <>
                              {colors.map((droppedItem, index) => (
                                <Button color={droppedItem.name} block key={droppedItem.name + index} className='py-8'>
                                  {droppedItem.name}
                                </Button>
                              ))}
                            </>
                          )
                        }}
                      </FrameContextConsumer>
                    </Frame>
                  </Col>
                </Row>
              </Container>
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Workspace;
