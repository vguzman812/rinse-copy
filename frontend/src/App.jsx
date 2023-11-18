import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCurrentUserQuery } from "./slices/usersSlice";
import { setCredentials } from "./slices/authSlice";
import { useEffect } from "react";

function App() {
  // if there is a user in redux, set local storage credentials. This is for Google login methods becuase I don't know how to set local storage from the backend.
  // this allows us to use useSelector(state => state.auth) to get the user info.
  const dispatch = useDispatch();
  const { data: currentUser } = useGetCurrentUserQuery();
  useEffect(() => {
    if (currentUser) {
      dispatch(setCredentials(currentUser));
    }
  }, [currentUser, dispatch]); // Only re-run if currentUser or dispatch changes
  return (
    <div className="mt-20">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
