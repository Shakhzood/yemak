import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";

import Button from "../Button/Button";

import "./User.scss";

function User() {
  const first_name = useSelector((state) => state.UserReducer.first_name);
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/Account/profile")}
      type="button"
      className="btn btn-warning btn-very-small"
    >
      <div className="user-btn">
        <div className="user-icon">
          <BiUser />
        </div>
        <span>{first_name && first_name}</span>
      </div>
    </Button>
  );
}

export default User;
