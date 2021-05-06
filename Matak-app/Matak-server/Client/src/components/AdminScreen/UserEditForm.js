import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";

const renderTextField = ({
  label,
  input,
  fieldValue,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => {
  if (input.value === "" && custom.defaultValue) {
    // hack for redux form with material components
    input.onChange(String(custom.defaultValue));
  }
  return (
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      type={type}
      fullWidth
      {...input}
      {...custom}
    />
  );
};

function UserEditForm({ user, onFormSubmit, formValues, pristine, invalid }) {
  const [userDetails, setUserDetails] = useState({
    Last_Name: user?.Last_Name || "",
    First_Name: user?.First_Name || "",
    Username: user?.Username || "",
    Password: "",
    Email: user?.Email || "",
    Mobile: user?.Mobile || "",
    Usert_Type: user?.User_Type || "",
    Organization_Name: user?.Organization_Name || "",
  });
  console.log("user in form:", userDetails);
  const { results, loading, error } = useSelector(state => state.users);

  const handleFormSubmit = () => {
    if (user) {
      onFormSubmit({ ...formValues, _id: user._id });
    } else {
      onFormSubmit(formValues);
    }
  };

  const radioButton = ({ input, ...rest }) => (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="Arbel" control={<Radio />} label="Arbel" />
        <FormControlLabel value="Matak" control={<Radio />} label="Matak" />
        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
      </RadioGroup>
    </FormControl>
  );

  return (
    <form>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0 1rem 0",
        }}
      >
        <ListItem>
          <div className="form-field">
            <Field
              type="text"
              name="First_Name"
              defaultValue={userDetails.First_Name}
              component={renderTextField}
              label="First Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Last_Name"
              defaultValue={userDetails.Last_Name}
              type="text"
              component={renderTextField}
              label="Last Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Username"
              defaultValue={userDetails.Username}
              type="text"
              component={renderTextField}
              label="Username"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Password"
              type="password"
              defaultValue={userDetails.Password}
              component={renderTextField}
              label="Password"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Email"
              defaultValue={userDetails.Email}
              type="text"
              component={renderTextField}
              label="Email"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              name="Mobile"
              type="text"
              defaultValue={userDetails.Mobile}
              component={renderTextField}
              label="Mobile"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field
              type="text"
              name="Organization_Name"
              defaultValue={userDetails.Organization_Name}
              component={renderTextField}
              label="Organization Name"
            />
          </div>
        </ListItem>
        <ListItem>
          <div className="form-field">
            <Field name="User_Type" component={radioButton}>
              <Radio value="Arbel" label="Arbel" />
              <Radio value="Matak" label="Matak" />
              <Radio value="Admin" label="Admin" />
            </Field>
          </div>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={pristine || invalid}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </ListItem>
      </List>
      {loading === "pending" && (
        <div className="form-message">
          <CircularProgress />
        </div>
      )}
      {results && (
        <div className="form-message success">User created successfuly</div>
      )}
      {error && (
        <div className="form-message failure">Failed to create new user</div>
      )}
    </form>
  );
}

const validate = values => {
  const errors = {};
  const requiredFields = [
    "First_Name",
    "Last_Name",
    "Email",
    "Username",
    "Mobile",
    "User_Type",
    "Organization_Name",
    "Password",
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const mapStateToProps = ({ form, users }) => ({
  users,
  formValues: form.userForm.values,
});

export default reduxForm({
  form: "userForm",
  validate,
})(connect(mapStateToProps)(UserEditForm));
