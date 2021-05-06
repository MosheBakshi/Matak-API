import React, { useState } from "react";
import L from "leaflet";
import {
  Map,
  Marker,
  TileLayer,
  Polygon,
  Polyline,
  ZoomControl,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import { STATUSES } from "../../constants/statusConstants";

//note:opacity: 0.2, pointerEvents: "none"
import { useDispatch, useSelector } from "react-redux";

import {
  addPositionToCurrent,
  setStartingPosition,
  setEndingPosition,
  displayStartAndEnding,
} from "../../redux/createdRoute";

import { CSSTransition } from "react-transition-group";
import SideMenu from "../SideMenu";

import axiosConfig from "../../config/axiosConfig";
import startFlag from "../../images/start.svg";
import finishFlag from "../../images/finish.svg";
import axios from "axios";

// sets marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent({ setMainSideMenu }) {
  const [routeDetailsMenu, setRouteDetailsMenu] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const dispatch = useDispatch();
  const {
    currentCreatedRoute,
    isEditAvailable,
    isPermanent,
    isSelectingStart,
    isSelectingEnd,
    startingPosition,
    endingPosition,
    isDoneMainRoute,
  } = useSelector(state => {
    return state.createdRoute;
  });

  const { routes, isHidden, filteredRoutes } = useSelector(state => {
    return state.userRoutes;
  });

  const startIcon = new L.Icon({
    iconUrl: startFlag,
    iconAnchor: [10, 50],
  });

  const finishIcon = new L.Icon({
    iconUrl: finishFlag,
    iconAnchor: [10, 50],
  });

  //handle creating a route
  const handleMapClick = e => {
    if (isEditAvailable) {
      const pos = e.latlng;
      const { lat, lng } = pos;
      if (isSelectingStart) {
        dispatch(setStartingPosition([lat, lng]));
      } else if (isSelectingEnd) {
        dispatch(setEndingPosition([lat, lng]));
      } else if (!isDoneMainRoute) {
        dispatch(addPositionToCurrent({ lat, lng }));
      }
    }
  };

  //handle click on routes
  const whenClicked = async route => {
    if (!isEditAvailable) {
      setRouteDetailsMenu(false);
      setMainSideMenu(false);
      const send = {
        _id: route.properties._id,
      };

      try {
        const { data } = await axiosConfig.post("/path/byid", send);
        const selectedRoute = data.data[0];
        dispatch(
          displayStartAndEnding(
            selectedRoute.Start_Point,
            selectedRoute.End_Point
          )
        );
        setSelectedRoute(selectedRoute);
        setRouteDetailsMenu(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickOnRoute = (route, layer) => {
    layer.on({
      click: () => whenClicked(route),
      mouseover: () => {
        !isEditAvailable &&
          layer.bindPopup(route?.properties?.routeName).openPopup(); // here add openPopup()
      },
      mouseout: () => {
        !isEditAvailable && layer.closePopup(); // here add openPopup()
      },
    });
  };

  const renderRoutes = () => {
    const filteredRoutes = currentCreatedRoute.filter(route => {
      if (route.routeType && route.positions.length) {
        return route;
      }
    });
    const routesToRender = filteredRoutes.map((route, index) => {
      switch (route.routeType) {
        case "Point":
          return (
            <Marker
              key={index}
              position={route.positions[0]}
              // icon={startIcon}
            />
          );
        case "LineString":
          return (
            <Polyline
              key={index}
              color={
                isPermanent
                  ? STATUSES?.BeingCreated?.permanent
                  : STATUSES?.BeingCreated?.color
              }
              positions={[route.positions]}
            />
          );
        case "Polygon":
          return (
            <Polygon
              key={index}
              color={
                isPermanent
                  ? STATUSES?.BeingCreated?.permanent
                  : STATUSES?.BeingCreated?.color
              }
              positions={[route.positions]}
            />
          );
        default:
          return;
      }
    });

    return routesToRender;
  };

  return (
    <>
      <CSSTransition
        in={routeDetailsMenu}
        timeout={200}
        classNames="menu-transition"
        unmountOnExit
      >
        <SideMenu
          setSideMenu={setRouteDetailsMenu}
          selectedRoute={selectedRoute}
        />
      </CSSTransition>

      <Map
        zoomControl={false}
        onclick={handleMapClick}
        center={[31.477632, 34.511871]}
        zoom={10.5}
      >
        <TileLayer
          //correct attribution for osm
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="topright" />

        {routes &&
          !isHidden &&
          routes.map((route, i) => {
            return (
              <GeoJSON
                color={
                  route.Is_Permanent
                    ? STATUSES?.Permanent?.color
                    : STATUSES[route["Status_Name"]]?.color
                }
                //key is like a dependency to render the geoJson
                key={route._id + isEditAvailable + route.updatedAt}
                data={route["Array_Of_Points"]}
                onEachFeature={handleClickOnRoute}
                // pointToLayer={stam}
              />
            );
          })}

        {filteredRoutes.map((route, i) => {
          return (
            <GeoJSON
              color={
                route.Is_Permanent
                  ? STATUSES?.Permanent?.color
                  : STATUSES[route["Status_Name"]]?.color
              }
              //key is like a dependency to render the geoJson
              key={route._id + isEditAvailable}
              data={route["Array_Of_Points"]}
              onEachFeature={handleClickOnRoute}
              // pointToLayer={stam}
            />
          );
        })}

        {renderRoutes()}
        {startingPosition && (
          <Marker position={startingPosition} icon={startIcon} />
        )}
        {endingPosition && (
          <Marker position={endingPosition} icon={finishIcon} />
        )}
      </Map>
    </>
  );
}

export default MapComponent;
