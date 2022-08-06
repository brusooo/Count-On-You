import React from "react";

const res = (str) => {
  switch (str) {
    case "Lineup":
      return "from-[#009FFD] to-[#2A2A72]";
    case "In Progress":
      return "from-[#2C69D1] to-[#0ABCF9]";
    case "Completed":
      return "from-[#647DEE] to-[#7F53AC]";
    default:
      break;
  }
};

const Title = ({ msg }) => {
  return (
    <div
      className={`text-white uppercase font-mochiy p-2 text-center bg-gradient-to-r ${res(
        msg
      )}`}
    >
      {msg}
    </div>
  );
};

export default Title;
