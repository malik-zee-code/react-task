import axios from "axios";

export const login = () => {
  const body = {
    email: "smithwills1989@gmail.com",
    password: "12345678",
  };

  const fetchUser = axios.post("https://stage.api.sloovi.com/login", body);

  return (dispatch) => {
    fetchUser
      .then((d) => {
        dispatch({ type: "LOGIN", payload: d.data.results });
      })
      .catch((err) => console.log(err));
  };
};

export const getAllusers = (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const fetchAll = axios.get(
    `https://stage.api.sloovi.com/team?product=outreach&company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
    config
  );

  return (dispatch) => {
    fetchAll.then((d) => {
      console.log(d.data.results.data);
      dispatch({ type: "GET_ALL_USERS", payload: d.data.results.data });
    });
  };
};
