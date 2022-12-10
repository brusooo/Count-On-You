import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Container from "./Container";
import DropContainer from "./DropContainer";


const Kanban = ({ databaseData , setlocaldata  }) => {
  
  async function save(data) {
    let response = await fetch(`${process.env.ORIGIN}/api/auth/usersData`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  };


  const onDragEnd = ({ source, destination, draggableId }) => {
    if (source && destination) {
      setlocaldata(() => {
        const { index: sourceIndex, droppableId: sourceId } = source;
        const { index: destinationIndex, droppableId: destinationId } =
        destination;
        const sourceContainer = databaseData.data.columns.find(
          (column) => column.id === sourceId
          );
        const destinationContainer = databaseData.data.columns.find(
            (column) => column.id === destinationId
            );
        const sourceIds = Array.from(sourceContainer.userIds);
        const destinationIds = Array.from(destinationContainer.userIds);
        const isSameContainer = sourceContainer.id === destinationContainer.id;
        sourceIds.splice(sourceIndex, 1);
        if (isSameContainer) {
          sourceIds.splice(destinationIndex, 0, draggableId);
        } else {
          destinationIds.splice(destinationIndex, 0, draggableId);
        }
        const newSourceContainer = {
          ...sourceContainer,
          userIds: sourceIds,
        };
        const newDestinationContainer = {
          ...destinationContainer,
          userIds: destinationIds,
        };
        const tempColumns = databaseData.data.columns.map((column) => {
          if (column.id === newSourceContainer.id) {
            return newSourceContainer;
          } else if (
            column.id === newDestinationContainer.id &&
            !isSameContainer
          ) {
            return newDestinationContainer;
          } else {
            return column;
          }
        });

        const tempUsers = databaseData.data.users;
        const tempEmail = databaseData.email;
        const tempData = { email : tempEmail,data : { columns : tempColumns , users : tempUsers }}
        save(tempData)
        
        return tempData;
      });
    }
  };

  
  const { users, columns } = databaseData.data;
  
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(({ id, title, userIds } , index) => (
          <DropContainer
            id={id}
            key={id}
            title={title}
            indice={index}
            makeChange={{databaseData,setlocaldata}}
            users={userIds.map((id) => users.find((user) => user.id === id))}
          />
        ))}
      </DragDropContext>
    </Container>
  );
  
};


export default Kanban;


