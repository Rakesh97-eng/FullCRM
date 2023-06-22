import * as React from "react";
import "./profile.css";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../redux/taskslice";

function SimpleDialog(props) {
  const { onClose, setSelectedValue, open, dispatch } = props;
  let { access } = useSelector((state) => state.task);

  React.useEffect(() => {
    let userDetails = sessionStorage.getItem("Access");
    dispatch(authenticate(userDetails));
  }, []);
  React.useEffect(() => {
    if (access !== null) {
      setSelectedValue(access.email);
    }
  }, [access]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog  sx={{ pt: 0 }} onClose={handleClose} open={open}>
      <DialogTitle sx={{fontSize:20,fontFamily:'sans-serif',fontWeight:'bold'}}>Profile</DialogTitle>
      <List sx={{marginLeft:2 }} >
        <ListItem disableGutters>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={access?.email} />
        </ListItem>

        <ListItem sx={{fontWeight:'bold'}} disableGutters>
          Role:
          <Typography sx={{fontSize:14,marginLeft:4,fontFamily:'sans-serif'}} >{access?.role}</Typography>
        </ListItem>
      </List>
      <Button
        onClick={() => {
          sessionStorage.clear();
        }}
      >
        Logout
      </Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  let dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  let data = useSelector((state) => state.task);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
    <div  className="profilecontainer">
      <Button
        
        sx={{float:"right"}}
        onClick={handleClickOpen}
      >
        <Stack direction="row" spacing={2}>
          {data?.access?.email ? (
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              alt="Remy Sharp"
              src="kkk"
            >
              {data?.access?.email.split("")[0]}
            </Avatar>
          ) : (
            <Avatar src="/broken-image.jpg" />
          )}
        </Stack>
      </Button>
      
      <SimpleDialog
        setSelectedValue={setSelectedValue}
        open={open}
        onClose={handleClose}
        dispatch={dispatch}
      />
    </div>
    <div>
    <Typography variant="subtitle1" component="div">
      Email: {selectedValue}
    </Typography>
    </div>
    </>
  );
}
