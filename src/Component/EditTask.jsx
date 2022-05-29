import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/Tasks/actions";
import { userActionCreators } from "../redux/User/userActions";

const EditTask = (props) => {
  const user = useSelector((state) => state.user.user);
  const Users = useSelector((state) => state.user.allusers);

  const [desc, setDesc] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState(new Date());
  const [assignUser, setassignUser] = useState("");
  const dispatch = useDispatch();
  const [deleted, setisDeleted] = useState(false);

  const convertintoSeconds = (hour, mins) => {
    let converHintoSec = +hour * 60 * 60;
    let converMintoSec = +mins * 60;

    return converHintoSec + converMintoSec;
  };

  const DeleteHandler = () => {
    dispatch(actionCreators.DeleteTask(props.m.id, user));
    setisDeleted(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      desc: desc,
      date: date,
      time: convertintoSeconds(time.getHours(), time.getMinutes()),
      assignUser: assignUser,
      taskId: props.m.id,
    };
    dispatch(actionCreators.EditTask(data, user));
  };

  const AssignUsers = useCallback(() => {
    dispatch(userActionCreators.getAllusers(user));
  }, [dispatch, user]);

  useEffect(() => {
    AssignUsers();
  }, [AssignUsers, date, dispatch, user]);

  return (
    <form action="" onSubmit={handleSubmit} className="border-2">
      <div className="flex flex-col">
        {" "}
        <div className=" flex flex-col  p-4  text-slate-600  ">
          {" "}
          <label htmlFor="">Task Description</label>{" "}
          <input
            type="text"
            className=" outline-none focus:ring-2 ring-offset-indigo-400 p-1 my-2 border-2 "
            defaultValue={props.m.task_msg}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className=" grid grid-cols-2 px-4 text-slate-600  ">
          <div className="flex flex-col">
            {" "}
            <span>Date</span>{" "}
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              className="outline-none p-1 focus:ring-2 ring-offset-indigo-400 border-2"
              onChange={(e) => setDate(e.target.value)}
              defaultValue={props.m.task_date}
            />
          </div>
          <div className="flex flex-col ml-2 ">
            <span>Time</span>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={time}
                onChange={(e) => {
                  setTime(e);
                }}
                renderInput={(params) => <TextField {...params} />}
                InputProps={{
                  sx: {
                    "& .MuiOutlinedInput-input": {
                      paddingTop: "5.5px",
                      paddingBottom: "5.5px",
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex flex-col text-slate-600 px-4 py-2">
          <span>Assign User</span>
          <select
            name="selection"
            id=""
            onChange={(e) => setassignUser(e.target.value)}
            className="p-1 outline-none rounded-sm mt-2 border-2"
          >
            {Users?.map((m, i) => {
              return (
                <option
                  style={{ borderRadius: "1px" }}
                  key={i}
                  value={m.user_id}
                  className="p-1 rounded-none"
                >
                  {m.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full ml-auto mt-auto p-4 flex justify-between items-center">
          <div
            onClick={DeleteHandler}
            className="py-1 px-2  rounded-full hover:bg-slate-200 cursor-pointer hover:opacity-80"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div>
            <span
              className="mr-3 cursor-pointer py-3 px-7 text-slate-700 hover:bg-slate-200 rounded-md "
              onClick={props.close}
            >
              Cancel
            </span>
            <button className=" bg-green-500 hover:bg-green-600 py-3 px-7 rounded-md font-medium text-white ">
              Save
            </button>
          </div>{" "}
        </div>
      </div>
    </form>
  );
};

export default EditTask;
