import React, { useState, useEffect } from "react";
import MatakIcon from "../images/matak.png";
import loadingGif from "../images/loading.gif";
import { FiMenu } from "react-icons/fi";

//components area
import MapComponent from "../components/MapComponent/MapComponent";
import SideMenu from "../components/SideMenu";
import StatusInfo from "../components/StatusInfo/StatusInfo";
import AvatarIcon from "../components/AvatarIcon";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { MdRefresh } from "react-icons/md";
import useDispatchRoutes from "../customHooks/useDispatchRoutes";
import DropDownNoti from "../components/DropDownNoti/DropDownNoti";

function HomeScreen() {
  useEffect(() => {
    const timer = setInterval(() => {
      fetchRoutesData();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const [sideMenu, setSideMenu] = useState(false);

  const { currentUser } = useSelector(state => {
    return state.users;
  });

  const { loading } = useSelector(state => {
    return state.userRoutes;
  });
  const First_Name = currentUser?.First_Name;
  const { fetchRoutesData } = useDispatchRoutes();

  useEffect(() => {
    fetchRoutesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateRoutes = () => {
    fetchRoutesData();
  };

  return (
    <>
      <FiMenu id="add-icon" onClick={() => setSideMenu(true)} />
      <img id="matak-icon" src={MatakIcon} alt="Matak-Icon" />

      <AvatarIcon letter={First_Name ? First_Name[0].toUpperCase() : "N/A"} />
      <Avatar
        id="refresh-icon"
        onClick={updateRoutes}
        src={loading ? loadingGif : ""}
      >
        <MdRefresh />
      </Avatar>
      <DropDownNoti />

      <CSSTransition
        in={sideMenu}
        timeout={230}
        classNames="menu-transition"
        unmountOnExit
      >
        <SideMenu setSideMenu={setSideMenu} />
      </CSSTransition>

      <StatusInfo />
      <MapComponent setMainSideMenu={setSideMenu} />
    </>
  );
}

export default HomeScreen;
