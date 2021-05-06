import {
  red,
  yellow,
  orange,
  teal,
  pink,
  grey,
  blue,
  green,
  blueGrey,
  purple,
} from "@material-ui/core/colors/";

export const STATUSES = {
  BeingCreated: {
    name: "Being-Created",
    color: purple[500],
    permanent: purple[900],
  },
  Submitted: {
    name: "Submitted",
    color: blue[500],
  },
  Received: {
    name: "Received",
    color: yellow[500],
  },
  "Changes-Required": {
    name: "Changes-Required",
    color: orange[500],
  },
  Approved: {
    name: "Approved",
    color: green[500],
  },
  Denied: {
    name: "Denied",
    color: red[500],
  },
  Completed: {
    name: "Completed",
    color: teal[500],
  },
  Canceled: {
    name: "Canceled",
    color: grey[500],
  },
  Suspended: {
    name: "Suspended",
    color: pink[500],
  },
  Permanent: {
    name: "Permanent",
    color: blueGrey[500],
  },
};
