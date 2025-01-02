import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "rsuite";
import { CiBellOn } from "react-icons/ci";
import { useContext } from "react";
import { Context } from "./UseContext/context";
function Header() {
  const {UserName } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-end">
      <div className="pr-20">
        <Badge content={0} style={{ cursor: "pointer" }}>
          <CiBellOn
            size={25}
            onClick={() => {
              navigate("/Notification");
            }}
          />
        </Badge>
      </div>
      {UserName?.first_name ? (
        <span className="pr-20">{UserName?.first_name}</span>
      ) : (
        <span className="pr-20">Admin</span>
      )}
      {UserName?.profilepic !== "" ? (
        <Avatar size="sm" circle src={UserName?.profilepic} alt="@SevenOutman" />
      ) : (
        <Avatar
          size="sm"
          style={{
            background: "#244E96",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          circle
        >
          <span className="fs-18">{UserName?.first_name.charAt(0)}</span>
        </Avatar>
      )}
    </div>
  );
}
export default Header;
