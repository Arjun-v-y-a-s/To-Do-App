import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TodoList from "./TodoList";


const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

 useEffect(() => {
  const verifyCookie = async () => {
    try {
      // Agar cookie nahi hai, tab bhi wait kar
      if (!cookies.token) return;

      const { data } = await axios.post(
        "https://to-do-app-qfin.onrender.com/userVerification",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;

      if (status) {
        setUsername(user);
        toast(`Hello ${user}`, { position: "top-right" });
      } else {
        removeCookie("token");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      removeCookie("token");
      navigate("/login");
    }
  };

  verifyCookie();
}, [cookies, navigate, removeCookie]);


  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4 className="home_header">
          Welcome <span>{username}</span>
        </h4>
        <div className="todo_wrapper">
          <TodoList />
        </div>
        <button className="logout_btn" onClick={Logout}>
          LOGOUT
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
