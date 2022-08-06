import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Column from "./Column";
import Nothing from "./Nothing";
import Card from "./Card";
import Title from "./Title";
import CardContainer from "./CardContainer";

const DropContainer = ({ id, title, users, indice, makeChange }) => {
  const [ overflow , setOverflow ] = useState(true);

  return (
    <Column>
      <Title style={{ marginBottom: 5 }} msg={title} />
      <Droppable droppableId={id}>
        {({ innerRef, placeholder }, { isDraggingOver }) => (
          <CardContainer isDraggingOver={isDraggingOver} prop1={innerRef} overflow={overflow}>
            {!isEmpty(users) ? (
              users.map(({ id, title, description, date }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(
                    {
                      draggableProps,
                      dragHandleProps: eventHandlers,
                      innerRef,
                    },
                    { isDragging }
                  ) => (
                    <Card
                      isDragging={isDragging}
                      prop1={innerRef}
                      prop2={draggableProps}
                      prop3={eventHandlers}
                      childrens={{ date, title, description, indice, id , setOverflow , overflow }}
                      makeChange={makeChange}
                    />
                  )}
                </Draggable>
              ))
            ) : (
              <Nothing />
            )}
            {placeholder}
          </CardContainer>
        )}
      </Droppable>
    </Column>
  );
};

export default DropContainer;
