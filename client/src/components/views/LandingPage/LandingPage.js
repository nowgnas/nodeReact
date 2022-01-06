import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("landing page");
    axios.get("/api/hello").then((response) => console.log(response.data));
  });

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      alert(response.data);
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("logout fail");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
