import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/Tasks/actions";
import ListItem from "./ListItem";

const TaskLists = () => {
  const user = useSelector((state) => state.user.user);
  const allTasks = useSelector((state) => state.taskReducer.tasks);

  const dispatch = useDispatch();

  const getAlltask = useCallback(() => {
    dispatch(actionCreators.getAlltask(user));
  }, [dispatch, user]);

  useEffect(() => {
    getAlltask();
  }, [getAlltask]);

  return (
    <>
      <div className="w-full h-auto flex flex-col bg-white border-[1px]">
        {allTasks.length
          ? allTasks?.map((m, i) => <ListItem m={m} key={i} />)
          : ""}
      </div>
    </>
  );
};

export default TaskLists;
