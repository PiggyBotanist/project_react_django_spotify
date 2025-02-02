import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

const Room = ({ leaveRoomCallBack, onLeave }) => {
  const { roomCode } = useParams(); // Get room code from URL params
  const navigate = useNavigate();
  
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  // Fetch room details when the component mounts or when roomCode changes
  useEffect(() => {
    // Mount these information after loading all other information of this components
    getRoomDetails();
    const interval = setInterval(() => getCurrentSong(), 1000);

    // Unmount when component unmounts
    return () => clearInterval(interval);

  }, [roomCode, leaveRoomCallBack, onLeave]);

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallBack();
          onLeave();
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        if(data.is_host){
          authenticateSpotify();
        }
      });
  };

  // Leave room button pressed
  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions)
      .then((response) => response.json())
      .then(() => {
        leaveRoomCallBack();
        onLeave();
      });
  };

  const authenticateSpotify = () => {
    fetch(`/spotify/is-authenticated`)
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);

        if(!data.status){
          fetch('/spotify/get-auth-url').then((response) => response.json())
          .then((data) => {
            window.location.replace(data.url);
          })
        }
      });
  }

  const getCurrentSong =() => {
    fetch('/spotify/current-song').then((response) => {
      if(!response){
        return{};
      } else {
        return response.json();
      }
    }).then((data) => {
      setSong(data);
    });
  }

  // Render settings button if the user is the host
  const renderSettingsButton = () => (
    <Grid2 xs={12}>
      <Button variant="contained" color="secondary" onClick={() => setShowSettings(true)}>
        Settings
      </Button>
    </Grid2>
  );

  // Render settings modal with CreateRoomPage
  const renderSettings = () => (
    <Grid2 container spacing={1} direction="column" alignItems="center">
      <Grid2 xs={12} align="center">
        <CreateRoomPage
          update={true}
          votesToSkip={votesToSkip}
          guestCanPause={guestCanPause}
          roomCode={roomCode}
          updateCallBack={getRoomDetails}
        />
      </Grid2>
      <Grid2 xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => setShowSettings(false)}>
          Close
        </Button>
      </Grid2>
    </Grid2>
  );

  return showSettings ? (
    renderSettings()
  ) : (
    <Grid2 container spacing={1} direction="column" alignItems="center">
      <Grid2 xs={12}>
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid2>

      <MusicPlayer {...song}/>

      {isHost && renderSettingsButton()}
      <Grid2 xs={12}>
        <Button variant="contained" color="primary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid2>
    </Grid2>
  );
};

// Functional wrapper to use `useParams` and `useNavigate`, then pass them as props
const RoomWithParams = ({ leaveRoomCallBack }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate("/"); // Navigate to the homepage after leaving
  };

  return <Room leaveRoomCallBack={leaveRoomCallBack} onLeave={handleLeave} />;
};

export default RoomWithParams;
