import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, editUser, deleteUser, clear } from "../redux/users";
import { DataGrid } from "@material-ui/data-grid";
import { MdDelete, MdModeEdit, MdAdd } from "react-icons/md";
import Button from "@material-ui/core/Button";
import NavBar from "../components/NavBar";
import Modal from "./MatakModal";
import ActionButtons from "../components/AdminScreen/ActionButtons";
import UserEditForm from "../components/AdminScreen/UserEditForm";

const AdminScreen = () => {
  const [showModal, setShowModal] = useState("none");
  const [selectedRow, setSelectedRow] = useState(null);

  const { users, loading, results } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, results]);

  const hideModal = () => {
    setShowModal("none");
    dispatch(clear())
  };

  const handleCreateUser = user => {
    dispatch(createUser(user));
  };

  const handleEditUser = user => {
    dispatch(editUser(user));
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedRow._id));
    hideModal();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 50, hide: true },
    { field: "First_Name", headerName: "First name", width: 160 },
    { field: "Last_Name", headerName: "Last name", width: 160 },
    { field: "Username", headerName: "User Name", width: 160 },
    { field: "User_Type", headerName: "User Type", width: 140 },
    { field: "Mobile", headerName: "Mobile", width: 130 },
    { field: "Email", headerName: "Email", width: 230 },
    { field: "Organization_Name", headerName: "Organization", width: 160 },
    {
      field: "edit",
      headerName: "Edit User",
      width: 130,
      disableClickEventBubbling: true,
      renderCell: params => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map(c => c.field)
            .filter(c => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach(f => {
            thisRow[f] = params.getValue(f);
          });

          setShowModal("edit");
          setSelectedRow(thisRow);
        };

        return <Button startIcon={<MdModeEdit />} onClick={onClick} />;
      },
    },
    {
      field: "delete",
      headerName: "Delete User",
      width: 155,
      disableClickEventBubbling: true,
      renderCell: params => {
        const onClick = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map(c => c.field)
            .filter(c => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach(f => {
            thisRow[f] = params.getValue(f);
          });

          setShowModal("delete");
          setSelectedRow(thisRow);
        };

        return <Button startIcon={<MdDelete />} onClick={onClick} />;
      },
    },
  ];

  return (
    <>
      <NavBar />
      <div className="table-container">
        <div className="table-title">
          <h1>Users</h1>
          <div className="add-btn" onClick={() => setShowModal("create")}>
            <MdAdd size={40} />
          </div>
        </div>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={row => row._id}
          pageSize={10}
          loading={loading === "pending"}
        />
      </div>
      {showModal === "create" && (
        <Modal text={"Create new user"} show onClose={hideModal}>
          <UserEditForm onFormSubmit={handleCreateUser} onCancel={hideModal} />
        </Modal>
      )}
      {showModal === "edit" && (
        <Modal text="Edit User Details" show onClose={hideModal}>
          <UserEditForm
            user={selectedRow}
            onFormSubmit={handleEditUser}
            onCancel={hideModal}
          />
        </Modal>
      )}
      {showModal === "delete" && (
        <Modal
          text="Are you sure you want to delete this user?"
          show
          onClose={hideModal}
        >
          <ActionButtons onOk={handleDeleteUser} onCancel={hideModal} />
        </Modal>
      )}
    </>
  );
};

export default AdminScreen;
