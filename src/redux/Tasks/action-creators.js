import axios from "axios";

function timezone_offset_in_seconds(dt) {
  return -dt.getTimezoneOffset() * 60;
}

// ---------------------- ADD TASK --------------------------------

export const AddTask = (data, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application",
      "Content-Type": "application/json",
    },
  };

  const body = {
    assigned_user: data.assignUser,
    task_date: data.date,
    task_time: data.time,
    is_completed: 0,
    time_zone: timezone_offset_in_seconds(new Date()),
    task_msg: data.desc,
  };

  console.log(body);

  axios
    .post(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.company_id}`,
      body,
      config
    )
    .then((d) => console.log("TASK ADDED:", d))
    .catch((err) => console.log(err));
};

// ---------------------- EDIT TASK --------------------------------

export const EditTask = (data, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const body = {
    assigned_user: data.assignUser,
    task_date: data.date,
    task_time: data.time,
    is_completed: 0,
    time_zone: timezone_offset_in_seconds(new Date()),
    task_msg: data.desc,
  };

  axios
    .put(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${data.taskId}?company_id=${user.company_id}`,
      body,
      config
    )
    .then(() => console.log("updated"))
    .catch((err) => console.log(err));
};

// ---------------------- DELETE TASK --------------------------------
export const DeleteTask = (taskid, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios
    .delete(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskid}?company_id=${user.company_id}`,
      config
    )
    .then(() => console.log("DELETED"))
    .catch((err) => console.log(err));
};

// ======================================= ACTION CREATORS =================================

// ---------------------------- GET ALL TASK ------------------------------

export const getAlltask = (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const rec = axios.get(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.company_id}`,
    config
  );
  return (dispatch) => {
    rec
      .then((d) => dispatch({ type: "GET_ALL_TASK", payload: d.data.results }))
      .then((d) => console.log(d))
      .catch((err) => console.log(err));
  };
};

// ---------------------------- GET SINGLE TASK ------------------------------

export const GetSingleTask = (taskid, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const rec = axios.get(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskid}?company_id=${user.company_id}`,
    config
  );

  return (dispatch) => {
    rec
      .then((d) =>
        dispatch({ type: "GET_SINGLE_TASK", payload: d.data.results })
      )
      .catch((err) => console.log(err));
  };
};
