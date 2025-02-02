import React, { useState } from "react";
import { TextField, Button, Grid2, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
    }

    const roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: roomCode,
            }),
        }
        fetch("/api/join-room", requestOptions).then((response) => {
            if (response.ok) {
                navigate(`/room/${roomCode}`);
            } else {
                setError("Room not found.");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Grid2 container spacing={1} direction="column" alignItems="center">
            <Grid2 xs={12}>
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid2>
            <Grid2 xs={12}>
                <TextField
                    error={!!error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid2>
            <Grid2 xs={12}>
                <Button variant="contained" color="secondary" onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid2>
            <Grid2>
                <Button variant="contained" color="primary" to="/" component={Link}>
                    Back
                </Button>
            </Grid2>
        </Grid2>
    );
}

export default RoomJoinPage;
