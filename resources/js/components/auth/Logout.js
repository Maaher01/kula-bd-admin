import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
    setIsLoggedIn(false);

    localStorage.removeItem("user_permissions");
    localStorage.removeItem("auth_user");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);

  return <></>;
};

export default Logout;
