import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Task from "./Component/Task";
import { userActionCreators } from "./redux/User/userActions";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  if (user?.data) {
    localStorage.setItem("token", user.data.results.token);
  }

  const login = useCallback(() => {
    dispatch(userActionCreators.login());
  }, [dispatch]);

  useEffect(() => {
    login();
  }, [login]);

  return (
    <div className=" w-screen h-screen ">
      <Task />
    </div>
  );
};

export default App;
