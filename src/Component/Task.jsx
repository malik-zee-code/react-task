import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/Tasks/actions";
import { userActionCreators } from "../redux/User/userActions";
import TaskLists from "./TaskLists";

const Task = () => {
  const user = useSelector((state) => state.user.user);
  const Users = useSelector((state) => state.user.allusers);
  const toggle = useSelector((state) => state.taskReducer.toggle);
  const allTasks = useSelector((state) => state.taskReducer.tasks);

  const [desc, setDesc] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState(new Date());
  const [assignUser, setassignUser] = useState("");
  const dispatch = useDispatch();

  const convertintoSeconds = (hour, mins) => {
    let converHintoSec = +hour * 60 * 60;
    let converMintoSec = +mins * 60;

    return converHintoSec + converMintoSec;
  };

  const toggleHandler = () => {
    dispatch({ type: "TOGGLE" });
  };

  const handleSubmit = () => {
    const data = {
      desc: desc,
      date: date,
      time: convertintoSeconds(time.getHours(), time.getMinutes()),
      assignUser: assignUser,
    };
    dispatch(actionCreators.AddTask(data, user));
  };

  const AssignUsers = useCallback(() => {
    dispatch(userActionCreators.getAllusers(user));
  }, [dispatch, user]);

  useEffect(() => {
    AssignUsers();
  }, [AssignUsers, date, dispatch, user]);

  return (
    <div
      className=" w-96 h-auto
    bg-cyan-50 rounded-md m-20 flex flex-col "
    >
      <div className=" p-4 bg-slate-50 border-2 rounded-md h-full w-full  text-slate-400 font-medium flex justify-between border-b-2 ">
        {" "}
        <span> TASKS {allTasks.length} </span>{" "}
        <span className=" h-full pl-5 ">
          {" "}
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer"
            onClick={toggleHandler}
          />
        </span>
      </div>
      {toggle ? (
        <>
          {" "}
          <div className=" flex flex-col  p-4  text-slate-600  ">
            {" "}
            <label htmlFor="">Task Description</label>{" "}
            <input
              type="text"
              className=" outline-none focus:ring-2 ring-offset-indigo-400 p-1 my-2 border-2 "
              defaultValue={"Follow Up"}
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
                className="outline-none p-1 focus:ring-2 ring-offset-indigo-400"
                onChange={(e) => setDate(e.target.value)}
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
              id="selectid"
              onChange={(e) => setassignUser(e.target.value)}
              className="p-1 outline-none rounded-sm mt-2"
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
          <div className="ml-auto mt-auto p-4">
            <button
              className="mr-3  py-3 px-7 text-slate-700 hover:bg-slate-200 rounded-md "
              onClick={toggleHandler}
            >
              Cancel
            </button>
            <button
              className=" bg-green-500 hover:bg-green-600 py-3 px-7 rounded-md font-medium text-white "
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>{" "}
        </>
      ) : (
        <TaskLists />
      )}
    </div>
  );
};

export default Task;
