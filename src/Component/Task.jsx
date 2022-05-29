import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/Tasks/actions";
import { userActionCreators } from "../redux/User/userActions";

const Task = () => {
  const user = useSelector((state) => state.user.user);
  const Users = useSelector((state) => state.user.allusers);

  const [desc, setDesc] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [assignUser, setassignUser] = useState("");
  const dispatch = useDispatch();

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      desc: desc,
      date: date,
      time: time,
      assignUser: assignUser,
    };
    dispatch(actionCreators.AddTask(data, user));
  };

  const AssignUsers = useCallback(() => {
    dispatch(userActionCreators.getAllusers(user));
  }, [dispatch, user]);

  useEffect(() => {
    AssignUsers();
    console.log(date);
  }, [AssignUsers, date]);

  return (
    <form action="" onSubmit={handleSubmit}>
      <div
        className=" w-96 h-102
   bg-indigo-50 rounded-md m-20 flex flex-col "
      >
        <div className=" p-4 bg-white border-2 rounded-md  text-slate-400 font-medium flex justify-between border-b-2 ">
          {" "}
          <span> TASKS 0 </span>{" "}
          <span className=" cursor-pointer ">
            {" "}
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>

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
                onChange={(e) => setTime(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
                // style={{ paddingTop: "5.5px", paddingBottom: "5.5px" }}
                sx={{
                  backgroundColor: "red",
                  // "& .MuiOutlinedInput-root": {
                  //   backgroundColor: "red !important",
                  // },
                  // "& .MuiFormControl-root": {
                  //   "& .MuiOutlinedInput-root": {
                  //     "& .MuiInputBase-inputAdornedEnd": {
                  //       backgroundColor: "red !important",
                  //       padding: "5.5px 14px",
                  //     },
                  //   },
                  // },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="flex flex-col text-slate-600 px-4 py-2">
          <span>Assign User</span>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            className="mt-2"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Users?.map((m, i) => {
              return (
                <MenuItem
                  key={i}
                  value={m.name}
                  onChange={(e) => setassignUser(e.target.value)}
                >
                  {m.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="ml-auto mt-auto p-4">
          <button className="mr-3  py-3 px-7 text-slate-700 hover:bg-slate-200 rounded-md ">
            Cancel
          </button>
          <button className=" bg-green-500 hover:bg-green-600 py-3 px-7 rounded-md font-medium text-white ">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Task;
