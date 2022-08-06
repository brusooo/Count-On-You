import React , { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiEditCircleFill } from "react-icons/ri";
import RemoveWarn from "./RemoveWarn";
import Edit from "./Edit";

const Card = ({ isDragging, childrens, makeChange, prop1, prop2, prop3 }) => {
  const [active, setActive] = useState(false);
  const [warn, setWarn] = useState(false);
  const [edit, setEdit] = useState(false);


  return (
    <>
      <div
        className={`${
          isDragging ? "bg-[#fcfcb6] shadow-lg" : "bg-[#fafacf] shadow-sm"
        } 
        p-2 flex flex-col cursor-grab rounded-md  my-1 w-full ${
          active ? "max-h-24" : "max-h-11"
        } 
        transition-[max-height] duration-5000 linear select-none overflow-hidden -z-1`}
        ref={prop1}
        {...prop2}
        {...prop3}
      >
        <div className="flex gap-4">
          <i>{childrens.date}</i>
          <h4>{childrens.title}</h4>

          <div className={`absolute ${childrens.overflow ? 'flex' : 'hidden'} gap-2 my-1  right-4 z-1`}>
            <span>
              <MdOutlineArrowDropDownCircle
                className={`text-xl cursor-default ${
                  active ? "rotate-180" : "rotate-0"
                }`}
                onClick={() => {
                  setActive(!active);
                }}
              />
            </span>

            <span>
              <AiOutlineMinusCircle
                className="text-xl cursor-default"
                onClick={() => {
                  setWarn(true);
                  childrens.setOverflow(false);
                }}
              />
            </span>

            <span>
              <RiEditCircleFill
                className="text-xl cursor-default"
                onClick={() => {
                  setEdit(true);
                  childrens.setOverflow(false);
                }}
              />
            </span>
          </div>
        </div>

        <div className="my-2">
          <p>{childrens.description}</p>
        </div>
      </div>
      <RemoveWarn props={{ warn, setWarn, childrens, makeChange }} />
      <Edit props={{ edit, setEdit, childrens, makeChange }} />
    </>
  );
};

export default Card;
