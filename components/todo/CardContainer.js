import React, { useState } from "react";

const CardContainer = ({ prop1, children , overflow }) => {
  return (
    <div
      className={`relative w-full h-[92%] lg:h-[260px] ${overflow ? 'overflow-y-scroll' : 'overflow-y-hidden'} overflow-x-hidden bg-white`}
      ref={prop1}
    >
      {children}
    </div>
  );
};

export default CardContainer;
