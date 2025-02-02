import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Grid2, Button, ButtonGroup, Typography } from "@mui/material";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
            this.setState({
            roomCode: data.code,
            });
        });
    }

    clearRoomCode = () => {
        this.setState({
            roomCode: null,
        });
    }

    renderHomePage() {
        return (
            <Grid2 container spacing={3} direction="column" align="center">
                <Grid2 xs={12} align="center">
                <Typography variant="h3" component="h3">
                    House Party
                </Typography>
                </Grid2>
                <Grid2 xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="secondary" to="/join" component={Link}>
                    Join a Room
                    </Button>
                    <Button color="primary" to="/create" component={Link}>
                    Create a Room
                    </Button>
                </ButtonGroup>
                </Grid2>
            </Grid2>
        );
    }

    render() {
        return (
            <Router>
                <Routes>
                <Route path="/" element={this.state.roomCode ? (<Navigate to={`/room/${this.state.roomCode}`} />) : (this.renderHomePage())}/>
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room leaveRoomCallBack={this.clearRoomCode} />}/>
                </Routes>
            </Router>
        );
    }
}
