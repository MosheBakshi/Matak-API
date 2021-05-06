import React, { useState } from "react";
import "./SideMenu.css";
import { CgCloseO } from "react-icons/cg";
import {
  OPTIONS_PAGE,
  ROUTE_DETAILS_PAGE,
  REPORTING_PAGE,
  ROUTE_ADDITIONAL_DETAILS,
  VIEW_AND_CHANGE,
  SET_STARTING_AND_ENDING,
} from "../../constants/pageConstants";

//INITIAL COMPONENTS
import Options from "./components/Options";
import RouteDetails from "./components/RouteDetails";
import Reporting from "./components/Reporting";
import RouteAdditionalDetails from "./components/RouteAdditionalDetails";
import SetStartingAndEnding from "./components/SetStartingAndEnding";
import { useDispatch } from "react-redux";
import { resetRoute } from "../../redux/createdRoute";
import { turnOffIsHidden } from "../../redux/userRoutes";
import ViewAndChange from "./components/ViewAndChange";

function SideMenu({ setSideMenu, selectedRoute = null }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState({
    open: selectedRoute ? VIEW_AND_CHANGE : OPTIONS_PAGE,
  });

  const handleClose = () => {
    setSideMenu(false);
    dispatch(turnOffIsHidden());
    dispatch(resetRoute());
  };

  return (
    <div className={"frosted nav-menu"}>
      <span id="close-button" onClick={handleClose}>
        <CgCloseO />
      </span>
      <div
        id="menu-div"
        className={page.open === OPTIONS_PAGE ? "align-center" : "add-padding"}
      >
        {page.open === OPTIONS_PAGE && <Options setPage={setPage} />}
        {page.open === ROUTE_DETAILS_PAGE && <RouteDetails setPage={setPage} />}
        {page.open === REPORTING_PAGE && <Reporting />}
        {page.open === ROUTE_ADDITIONAL_DETAILS && (
          <RouteAdditionalDetails setSideMenu={setSideMenu} />
        )}
        {page.open === SET_STARTING_AND_ENDING && (
          <SetStartingAndEnding setPage={setPage} />
        )}
        {page.open === VIEW_AND_CHANGE && (
          <ViewAndChange
            setSideMenu={setSideMenu}
            selectedRoute={selectedRoute}
          />
        )}
      </div>
    </div>
  );
}

export default SideMenu;
