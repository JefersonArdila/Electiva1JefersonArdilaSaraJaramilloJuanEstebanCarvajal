import React from "react";
import { Contenedor } from "./styles";
import XIcon from "@mui/icons-material/X";
import { IconOption } from "./IconOption";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import BrowserNotSupportedRoundedIcon from "@mui/icons-material/BrowserNotSupportedRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Ajusta la ruta si es necesario
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const handleLogout = async () => {
    await signOut(auth); // Cierra sesión
  };
  return (
    <Contenedor>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <XIcon
          className="XLogo"
          style={{
            width: "46px",
            height: "30px",
            margin: "10px 0",
            cursor: "pointer",
          }}
        ></XIcon>
      </Link>

      <br></br>

      {/* */}

      <IconOption active text="Home" Icon={HomeRoundedIcon} />
      <IconOption text="Explore" Icon={SearchRoundedIcon} />
      <IconOption text="Notifications" Icon={NotificationsNoneRoundedIcon} />
      <IconOption text="Messages" Icon={MailOutlineRoundedIcon} />
      <IconOption text="Grok" Icon={BrowserNotSupportedRoundedIcon} />
      <IconOption text="Communities" Icon={PeopleOutlineIcon} />
      <IconOption primary text="Premium" Icon={XIcon} />
      <IconOption primary text="Business" Icon={BoltIcon} />
      <IconOption primary text="Profile" Icon={PermIdentityOutlinedIcon} />
      <IconOption primary text="More" Icon={MoreHorizOutlinedIcon} />
      <br></br>
      <br></br>
      <Button onClick={handleLogout} variant="outlined" fullWidth>
        log out
      </Button>
    </Contenedor>
  );
};
