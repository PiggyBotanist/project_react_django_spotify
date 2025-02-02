import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Collapse, Alert } from "@mui/material";


const CreateRoomPage = (props) => {
  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause); // State for guest control
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip); // State for votes to skip
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Handle changes for votes to skip
  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  // Handle changes for guest can pause
  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === 'true');
  };

  // Handle the create room button press
  const handleCreateButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`)); // Navigate to room with the code
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode
      }),
    };
    fetch('/api/update-room', requestOptions)
      .then((response) => {
        if (response.ok){
          setSuccessMsg("Room Updated Successfully!");
        } else {
          setErrorMsg("Error Updating Room...");
        }
        props.updateCallBack();
      }
    )
  };

  const title = props.update ? "Update Room" : "Create a Room";

  const renderCreateButtons =() => {
    return(
      <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center">
        <Grid2 xs={12}>
          <Button color="secondary" variant="contained" onClick={handleCreateButtonPressed}>
            Create A Room
          </Button>
        </Grid2>
        <Grid2 xs={12}>
          <Button color="primary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid2>
      </Grid2>
    )
  };

  const renderUpdateButtons =() => {
    return(
      <Grid2 xs={12} direction="column" justifyContent="center" alignItems="center">
        <Button color="secondary" variant="contained" onClick={handleUpdateButtonPressed}>
          Update Room
        </Button>
      </Grid2>
    )
  };

  return (
    <Grid2 container spacing={1} direction="column" justifyContent="center" alignItems="center">
      <Grid2 xs={12} align="center">
        <Collapse in={errorMsg != "" || successMsg != ""}>
          {successMsg != "" ? (<Alert severity="success" onClose={() => {setSuccessMsg("")}}>{successMsg}</Alert>) : (<Alert severity="error" onClose={() => {setErrorMsg("")}}>{errorMsg}</Alert>)}
        </Collapse>
      </Grid2>
      <Grid2 xs={12} align="center">
        <Typography component="h4" variant="h4">
          { title }
        </Typography>
      </Grid2>

      <Grid2 xs={12}>
        <FormControl component="fieldset">
          <FormHelperText>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup 
            row={true}
            value={guestCanPause.toString()} // Bind state to radio button
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid2>

      <Grid2 xs={12}>
        <FormControl component="fieldset">
          <TextField 
            variant="standard"
            required={true}
            onChange={handleVotesChange}
            type="number" 
            value={votesToSkip} // Bind state to text field
            inputProps={{
              min: 1,
              style: { textAlign: "center" }
            }}
          />
        </FormControl>
        <FormHelperText style={{ textAlign: 'center' }}>
          Votes Required to Skip Song
        </FormHelperText>
      </Grid2>

      {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid2>
  );
};

CreateRoomPage.defaultProps = {
  update: false,
  votesToSkip: 2,
  guestCanPause: false,
};

export default CreateRoomPage;
