import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Test = () => {
  const context = useContext(UserContext);
  if (context.user) {
    return <h3 style={{ color: "white" }}>{context.user.email}</h3>;
  } else return <h1>plz Login!</h1>;
};

export default Test;
