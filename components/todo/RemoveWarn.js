import React from "react";
import { toast } from "react-toastify";

const res = (val) => {
  switch (val) {
    case 0:
      return "from-[#009FFD] to-[#2A2A72]";
    case 1:
      return "from-[#2C69D1] to-[#0ABCF9]";
    case 2:
      return "from-[#647DEE] to-[#7F53AC]";
    default:
      return "from-[#FFD700] to-[#FFB700]";
  }
};

const RemoveWarn = ({ props }) => {
  async function save(data) {
    let response = await fetch(`${process.env.ORIGIN}/api/auth/usersData`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  const removeItem = () => {

    let localData = props.makeChange.databaseData.data;


    const colLoc = localData.columns[props.childrens.indice].userIds.findIndex(function (element) {
      return element === props.childrens.id;
    });



    if (loc !== -1) localData.columns[props.childrens.indice].userIds.splice(colLoc, 1);

    const loc = localData.users.findIndex(function (element) {
      return element.id === props.childrens.id;
    });

    if (loc !== -1) localData.users.splice(loc, 1);

    const tempData = {
        email : props.makeChange.databaseData.email,
        data: { columns: localData.columns, users: localData.users },
      };

    props.makeChange.setlocaldata(tempData);

    save(tempData);

    props.setWarn(false);
    props.childrens.setOverflow(true);
    toast("👍Removed Successfully! ", { toastId: "Removed", theme: "dark" });
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-[470px] lg:h-[280px] overflow-hidden  bg-white ${
          props.warn ? "flex" : "hidden"
        } justify-center items-center z-11`}
      >
        <div className="relative flex flex-col w-auto h-auto">
          <span className="text-xl font-semibold mb-6">
            Do you wish to remove?
          </span>
          <div className="flex gap-5 translate-x-14">
            <span
              className="bg-[#2C3E50] py-2 px-4 cursor-pointer text-white font-medium"
              onClick={() => {
                props.setWarn(false);
                props.childrens.setOverflow(true);
              }}
            >
              leave
            </span>
            <span
              className={`p-2 font-medium cursor-pointer bg-gradient-to-r ${res(
                props.childrens.indice
              )} text-white`}
              onClick={removeItem}
            >
              remove
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveWarn;
