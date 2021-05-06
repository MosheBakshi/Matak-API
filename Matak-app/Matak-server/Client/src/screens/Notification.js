import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import NavBar from "../components/NavBar";
import IconButton from "@material-ui/core/IconButton";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEnvelopeOpen, BiEnvelope } from "react-icons/bi";
import { notifications } from "../fakeNotifications";
import axios from "axios";
import { set } from "date-fns";
import { change } from "redux-form";

const Notifications = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeStatusUnread, setChangeStatusUnread] = useState(false);
  const [changeStatusRead, setChangeStatusRead] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { field: "isRead", type: "boolean", headerName: "Is Read", width: 120 },
    { field: "id", headerName: "ID", hide: true },
    { field: "type", headerName: "Type", width: 180 },
    {
      field: "date",
      type: "date",
      headerName: "Date",
      width: 300,
      type: "date",
    },
    {
      field: "sender",
      headerName: "Sender",
      width: 300,
    },
    {
      field: "senderEmail",
      headerName: "SenderEmails",
      width: 200,
    },

    {
      field: "routeDetails",
      headerName: "Route Details",
      description: "Click on square for more information",
      width: 300,
    },
  ];

  notifications.forEach(noti => {
    noti.date = noti.date.slice(0, 25);
  });

  // useEffect(() => {
  //   // change is read square booleanicly
  //   if (selectedRows) {
  //     notifications.filter(
  //       x => x.id === selectedRow.id
  //     )[0].isRead = !notifications.filter(x => x.id === selectedRow.id)[0]
  //       .isRead;
  //   }
  //   //HERE I SEND UPDATE OF NOTIFICATIONS
  // }, [changeStatus]);

  useEffect(() => {
    if (selectedRows) {
      selectedRows.forEach(row => {
        row.data.isRead = false;
      });
    }
    // console.log(selectedRows);
  }, [changeStatusUnread]);
  useEffect(() => {
    if (selectedRows) {
      selectedRows.forEach(row => {
        row.data.isRead = true;
      });
    }
    // console.log(selectedRows);
  }, [changeStatusRead]);

  const signAsRead = () => {
    setChangeStatusRead(prv => !prv);
  };
  const signAsUnRead = () => {
    setChangeStatusUnread(prv => !prv);
  };

  // const deleteClickHandler=()=>{
  //   try {
  //     const {data}=async axios.delete(selectedRows);
  //   } catch (error) {

  //   }
  // }

  const CellClickHandler = e => {
    const tragetRoute = e.row.routeDetails;
    console.log(tragetRoute);
  };
  const rowSelectedHandler = e => {
    if (e.isSelected) {
      setSelectedRows(prev => [...prev, e]);
    } else {
      setSelectedRows(prev => prev.filter(x => x.data.id !== e.data.id));
    }
  };
  // const somefun = e => {
  //   e.selectionModel.forEach(id => {
  //     notifications.forEach(noti => {
  //       console.log(id, noti.id);
  //       if (id === noti.id.toString()) {
  //         rowSelectedHandler(noti);
  //       }
  //     });
  //   });
  // };

  return (
    <>
      <NavBar />
      <div
        style={{
          position: "relative",
          margin: "5rem auto",
          height: 450,
          width: "90%",
        }}
      >
        <span style={{ display: "flex" }}>
          <h1>Notifications</h1>
          <IconButton style={{ marginLeft: "auto", paddingBottom: 0 }}>
            <BiEnvelopeOpen onClick={signAsRead} />
          </IconButton>
          <IconButton style={{ paddingBottom: 0 }}>
            <BiEnvelope
              style={{ position: "relative", bottom: "-1.6px" }}
              onClick={signAsUnRead}
            />
          </IconButton>
          <IconButton style={{ paddingBottom: 0 }}>
            <RiDeleteBin5Fill style={{ color: "#f44336" }} />
          </IconButton>
        </span>
        <DataGrid
          className="table_notification"
          onRowSelected={rowSelectedHandler}
          onCellClick={CellClickHandler}
          rows={notifications}
          rowHeight="63"
          columns={columns}
          pageSize={5}
          checkboxSelection
          sortModel={[
            {
              field: "date",
              sort: "asc",
            },
          ]}
        ></DataGrid>
      </div>
    </>
  );
};

export default Notifications;
