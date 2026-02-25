import React from "react";
import "./style/LoginSignup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../Context/ShopContext";

const LoginSignup = () => {
  const { login  ,setisuser } = useShopContext();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [isLogin, setIsLogin] = useState(true);

  const [userdata, setUserdata] = useState(null);

 useEffect(() => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const adminExists = users.find(
    (user) => user.email === "admin@gmail.com"
  );

  if (!adminExists) {
    users.push({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin0000",
      role: "admin",
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}, []);

 

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      
      const existingUser = users.find(
        (user) =>
          user.email === formdata.email && user.password === formdata.password,
      );
      

      if (existingUser) {
        // localStorage.setItem("currentUser", JSON.stringify(existingUser));
        // localStorage.setItem("isLoggedIn", "true");
        // setisuser("true")

        login(existingUser.email, existingUser.password, existingUser.role);

        if (existingUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert("Invalid Email or Password ");
      }
    } else {
      // SIGNUP LOGIC
      const userExists = users.find((user) => user.email === formdata.email);

      if (userExists) {
        alert("User already exists");

        return;
      }
       if (formdata) {
        setisuser("true")
        localStorage.setItem("currentUser", JSON.stringify(formdata));
        localStorage.setItem("isLoggedIn", "true");
        navigate("/")

      } else {
        alert("Invalid Email or Password ");
      }

      users.push({
        ...formdata,
        role: "user",
      });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup Successful ");
      setIsLogin(true);
    }
  };

  
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <div className="loginsignup-filds">
          {!isLogin && (
            <input
              type="text"
              placeholder=" Your Name"
              value={formdata.name}
              name="name"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formdata.email}
            onChange={handleChange}
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
            name="password"
            required
          />

          <div className="loginsignupagree">
            <input type="checkbox" />
            <p>
              by continuing , i agree to the terms of service and privacy policy
            </p>
          </div>
        </div>
        <button onClick={handleSubmit}>Continue..</button>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;