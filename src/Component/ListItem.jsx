import { faBell, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditTask from "./EditTask";

const ListItem = (props) => {
  const user = useSelector((state) => state.user.user);

  const [isEditable, setisEditable] = useState(false);
  return (
    <>
      {isEditable ? (
        <EditTask m={props.m} close={() => setisEditable(false)} />
      ) : (
        <div className="flex justify-between border-[1px] p-3 border-slate-100 items-center ">
          <div className="flex">
            <img src={user?.icon} className="w-12 h-auto" alt="" />
            <div className="flex flex-col ml-2">
              <span>{props.m.task_msg}</span>
              <span className=" text-sm text-red-600 ">
                {props.m.task_date}
              </span>
            </div>
          </div>

          <div className="flex">
            <span
              className=" cursor-pointer px-2 mr-[7px] py-[2px] border-[1px] border-slate-200 rounded-sm text-sm"
              onClick={() => setisEditable((pre) => !pre)}
            >
              {" "}
              <FontAwesomeIcon icon={faPen} />
            </span>
            <span className=" cursor-pointer px-2 mx-1 py-[2px] border-[1px] border-slate-200 rounded-sm text-sm">
              <FontAwesomeIcon icon={faBell} />
            </span>
            <span className=" cursor-pointer px-2  py-[2px] border-[1px] border-slate-200 rounded-sm text-sm">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
