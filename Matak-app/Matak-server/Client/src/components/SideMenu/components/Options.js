import React from "react";
import { FaSearch, FaMapMarked, FaHistory, FaSuitcase } from "react-icons/fa";
import {
  ROUTE_DETAILS_PAGE,
  REPORTING_PAGE,
} from "../../../constants/pageConstants";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsDoneMainRouteOff } from "../../../redux/createdRoute";

function Options({ setPage }) {
  const dispatch = useDispatch();
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      <div
        onClick={() => {
          setPage({
            open: ROUTE_DETAILS_PAGE,
          });
          dispatch(setIsDoneMainRouteOff());
        }}
        className="list-item"
      >
        <FaMapMarked />
        <li>New Route Request</li>
      </div>

      <div
        onClick={() =>
          setPage({
            open: REPORTING_PAGE,
          })
        }
        className="list-item"
      >
        <FaSearch />
        <li>Search Routes</li>
      </div>

      <div className="list-item">
        <FaHistory />
        <li>Routes History</li>
      </div>

      {/* <div className="list-item">
        <ImAppleinc />
        <li>Status</li>
      </div> */}
      <Link to={`/routes-management`}>
        <div className="list-item">
          <FaSuitcase />
          <li>Routes Management</li>
        </div>
      </Link>
    </ul>
  );
}

export default Options;
