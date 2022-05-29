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

  axios.post(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.company_id}`,
    body,
    config
  );
};

// ---------------------- EDIT TASK --------------------------------

export const EditTask = (data, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const body = {
    assigned_user: data.assigned_user,
    task_date: data.taskdate,
    task_time: data.task_time,
    is_completed: 0,
    time_zone: timezone_offset_in_seconds(new Date()),
    task_msg: data.task_desc,
  };

  axios.put(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${data.taskId}?company_id=${user.company_id}`,
    body,
    config
  );
};

// ---------------------- DELETE TASK --------------------------------
export const DeleteTask = (task, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  axios.delete(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id>?company_id=${user.company_id}`,
    config
  );
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
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.companyid}`,
    config
  );
  return (dispatch) => {
    rec.then((d) => dispatch({ type: "GET_ALL_TASK", paylaod: d }));
  };
};

// ---------------------------- GET SINGLE TASK ------------------------------

export const GetSingleTask = (task, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const rec = axios.get(
    `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id_from_previous_test>?company_id=${user.companyid}`,
    config
  );

  return (dispatch) => {
    rec.then((d) => dispatch({ type: "GET_SINGLE_TASK", payload: d }));
  };
};
