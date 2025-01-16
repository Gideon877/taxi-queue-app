import React from 'react';
import { Box, Typography, Button, Grid2 as Grid, Avatar } from '@mui/material';
import { PassengerSectionType } from '../utils/interfaces';

const PassengerSection: React.FC<PassengerSectionType> = ({ passengerCount, onJoinQueue, onLeaveQueue }) => {
    return (
        <Box sx={{ textAlign: 'center', border: '1px solid #ddd', padding: 2 }}>
            <Typography variant="h5">Passengers</Typography>
            <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 2 }}>
                {[...Array(3)].map((_, index) => (
                    <Grid key={index}>
                        <Avatar alt="Queue" src="/queue.png" sx={{ width: 100, height: 100 }} variant="square" />
                    </Grid>
                ))}
            </Grid>
            <Typography variant="body1">
                <span className="count">{passengerCount}</span> in queue
            </Typography>
            <Box sx={{ marginTop: 2 }}>
                <Button variant="outlined" onClick={onJoinQueue}>Join</Button>
                <Button disabled={passengerCount < 1} color='error' variant="outlined" onClick={onLeaveQueue} sx={{ marginLeft: 1 }}>
                    Leave
                </Button>
            </Box>
        </Box>
    );
};

export default PassengerSection;
