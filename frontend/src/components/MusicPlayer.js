import React, {Component, useState, setState, useEffect} from 'react';
import {Grid2, Typography, Card, Iconbutton, LinearProgress, Icon, IconButton, useScrollTrigger} from "@mui/material";
import {PlayArrow, SkipNext, Pause} from '@mui/icons-material';

const MusicPlayer = (props) => {
    // Initialize state with props
    const [state, setState] = useState({
        title: props.title,
        artist: props.artist,
        duration: props.duration,
        time: props.time,
        image_url: props.image_url,
        is_playing: props.is_playing
    });

    // Update state if props change
    useEffect(() => {
        setState({
        title: props.title,
        artist: props.artist,
        duration: props.duration,
        time: props.time,
        image_url: props.image_url,
        is_playing: props.is_playing
        });
    }, [props]);
      
    const songProgress = (state.time / state.duration) * 100;

      // Logging state after every change
    useEffect(() => {
        console.log('Updated state:', state);
    }, [state]);  // Log state when it changes
    
    const PauseSong =() => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        };
        fetch('/spotify/pause', requestOptions);
    }

    const PlaySong =() => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        };
        fetch('/spotify/play', requestOptions);
    }

    return(
        <Card style={{ width: '300px', padding: '16px' }}>
            <Grid2 container spacing={3} direction="column" align="center">
                <Grid2 xs={4}>
                    {<img src={state.image_url} height="100%" width="100%" /> || ""}
                </Grid2>
                <Grid2 item spacing={3} xs={8}>
                    <Typography component="h5" variant="h5">
                        {state.title || "Unknown Title"}
                    </Typography>
                    <Typography color="textSecondary" variant="subtiltle1">
                        {state.artist || "Unknown Artist"}
                    </Typography>
                    <div>
                        <IconButton onClick={() => {state.is_playing ? PauseSong() : PlaySong() }}>{state.is_playing ? <Pause/> : <PlayArrow/>}</IconButton>
                        <IconButton>{<SkipNext/>}</IconButton>
                    </div>
                </Grid2>
            </Grid2>
            <LinearProgress variant="determinate" value = {songProgress}/>
            <Typography color="textSecondary" variant="p">
                Buttons only Work on Premium Accounts
            </Typography>
        </Card>
    );
};

export default MusicPlayer;