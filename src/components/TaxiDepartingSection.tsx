import React from 'react';
import { Box, Typography, Button, Grid2 as Grid, Avatar } from '@mui/material';
import { TaxiDepartingSectionType } from '../utils/interfaces';
import useAppStore from '../store/useQueueStore';

const TaxiDepartingSection: React.FC<TaxiDepartingSectionType> = ({ onDepartTaxi, taxiDepartedCount }) => {
    const {passengerCount, taxiCount } = useAppStore()
    return (
        <Box sx={{ textAlign: 'center', border: '1px solid #ddd', padding: 2 }}>
            <Typography variant="h5">Taxi Departing</Typography>
            <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 2 }}>
                {[...Array(3)].map((_, index) => (
                    <Grid key={index}>
                        <Avatar alt="Arrow" src="/arrow.png" sx={{ width: 100, height: 100 }} variant="square" />
                    </Grid>
                ))}
                <Grid>
                    <Avatar alt="Taxi" src="/minivan.png" sx={{ width: 100, height: 100 }} variant="square"/>
                </Grid>
            </Grid>
            <Typography variant="body1">
                <span className="count">{taxiDepartedCount}</span> taxis departed
            </Typography>
            <Box sx={{ marginTop: 2 }}>
                <Button disabled={taxiCount < 1 || passengerCount < 5} variant="contained" color="primary" onClick={onDepartTaxi}>Depart</Button>
            </Box>
        </Box>
    );
};

export default TaxiDepartingSection;
