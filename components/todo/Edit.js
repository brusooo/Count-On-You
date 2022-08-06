import React, { useState  } from "react";
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

const Edit = ({ props }) => {

  async function save(data) {
    let response = await fetch(`${process.env.ORIGIN}/api/auth/usersData`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  const [values, setValues] = useState({
    title: props.childrens.title,
    description: props.childrens.description,
    date: props.childrens.date,
  });

  const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    let localData = props.makeChange.databaseData.data;

    let tempData = {
      id: props.childrens.id,
      title: values.title,
      description: values.description,
      date: values.date,
    };

    const loc = localData.users.findIndex(function (element) {
      return element.id === props.childrens.id;
    });

    if (loc !== -1) localData.users[loc] = tempData;

    const tempDbData = {
      email: props.makeChange.databaseData.email,
      data: { columns: localData.columns, users: localData.users },
    };

    props.makeChange.setlocaldata(tempDbData);

    save(tempDbData);

    toast("👍 Updated Successfully! ", { toastId: "Updated", theme: "dark" });
    props.setEdit(false);
    props.childrens.setOverflow(true);

  };

  return (
    <>
      <div
        className={`vlg:top-0 vlg:py-10 vlg:px-6 absolute -top-0 left-0 w-full h-full bg-white ${
          props.edit ? "flex" : "hidden"
        } lg:justify-center lg:items-center z-11`}
      >
        <form
          className="realtive vlg:flex vlg:flex-col vlg:gap-3 grid grid-cols-[0.5fr_1fr] -translate-y-2  grid-rows-3"
          onSubmit={handleSubmit}
        >
          <label className="relative font-semibold lg:top-3">Title</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={(handleChange)}
            autoComplete={"off"}
            maxLength={15}
            className="border-2 rounded-md w-[220px] vlg:w-[298px] vlg:h-10 h-8 p-2 my-2 border-zinc-400"
          />

          <label className="relative font-semibold lg:top-3">Description</label>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            autoComplete={"off"}
            maxLength={50}
            className="border-2 rounded-md w-[220px] vlg:w-[298px] vlg:h-10 h-8 p-2 my-2 border-zinc-400"
          />

          <label className="relative font-semibold lg:top-3">Date</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={values.date}
            className="border-2 rounded-md w-[220px] vlg:w-[298px] vlg:h-10 h-8 p-2 my-2 border-zinc-400"
          />

          <br />
          <div className="vlg:relative absolute flex gap-3 vlg:right-0 right-0.5 vlg:bottom-2 -bottom-4">
            <span
              className="vlg:relative py-1 px-3 vlg:px-12 cursor-pointer  bg-[#2C3E50] text-white  font-semibold text-center"
              onClick={() => {
                props.setEdit(false);
                props.childrens.setOverflow(true);
              }}
            >
              Leave
            </span>
            <button className={`vlg:relative py-1 px-2 vlg:px-12 bg-gradient-to-r ${res(
                props.childrens.indice
              )}  text-white  font-semibold text-center`}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(Edit);
