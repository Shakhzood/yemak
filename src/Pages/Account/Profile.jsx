import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

import Input from "../../components/Input/Input";
import { useGlobalContext } from "../../context";
import Button from "../../components/Button/Button";
import Logout from "../../components/ModalWindows/Logout/Logout";
import { updateUserInfo } from "../../Store/Thunk";
import { mainUrl } from "../../Services/Api";
import { useEffect } from "react";

import "./Profile.scss";

const Profile = () => {
  const state = useSelector((state) => state.UserReducer);
  const { isLogoutOpen, setLogoutOpen } = useGlobalContext();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lName, setLName] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    const userAccountInfo = "/user/account";
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    try {
      const response = await fetch(`${mainUrl}${userAccountInfo}`, {
        method: "GET",
        headers: {
          Authorization: activeUser.access_token,
        },
      });
      const { data } = await response.json();
      // console.log(userInfo.data);
      setLoading(false);
      setName(data.first_name);
      setLName(data.last_name);
    } catch (error) {
      console.log("ERROR FETCH USER INFO", error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
    return () => {};
  }, []);

  const userInfo = {
    first_name: name,
    last_name: lName,
  };

  return (
    <div className="inputs-container">
      <br />
      <div className="user-info">
        <FaUser size={64} /> <br />
        <span>{`${name} ${lName}`}</span> <br />
        <span>{state.phone_number}</span>
      </div>
      <div className="three-inputs-btn">
        <div className="three-inputs">
          <Input
            type="text"
            className="input-large"
            placeholder="First name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputLabel="ism"
          />
          <br />
          <Input
            type="text"
            className="input-large"
            placeholder="Last name..."
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            inputLabel="Familiya"
          />
          <br />
          <Input
            type="date"
            className="input-large"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            inputLabel="Tugʻilgan vaqti"
          />
        </div>
        <br />
        <Button
          onClick={() => dispatch(updateUserInfo(userInfo))}
          className="btn btn-warning btn-double"
        >
          saqlash
        </Button>{" "}
        &nbsp; &nbsp; &nbsp;
        <Button
          onClick={() => setLogoutOpen(true)}
          className="btn btn-danger btn-double"
        >
          chiqish
        </Button>
      </div>
      <br />
      &nbsp; &nbsp; &nbsp;
      <br />
      <br />
      {/* Logout pop up window */}
      {isLogoutOpen ? <Logout /> : null}
    </div>
  );
};

export default Profile;
