import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { FaRoute, FaMoneyBillWave } from 'react-icons/fa';
import useQueueStore from '../store/useQueueStore';

interface RouteDetailsProps {
    queueId?: number;
}

const RouteDetails: React.FC<RouteDetailsProps> = () => {

    const { routeDetails } = useQueueStore()

    if(!routeDetails) return <h3>Loading...</h3>;

    return (
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {(
                <Grid key={routeDetails.routeId} item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Route ID: {routeDetails.routeId}
                        </Typography>
                        <Typography variant="body1">
                            <FaRoute style={{ marginRight: 8 }} />
                            From: {routeDetails.fromRankName}
                        </Typography>
                        <Typography variant="body1">
                            <FaRoute style={{ marginRight: 8 }} />
                            To: {routeDetails.toRankName}
                        </Typography>
                        <Typography variant="body1">
                            <FaMoneyBillWave style={{ marginRight: 8 }} />
                            Fare: R {routeDetails.fare.toFixed(2)}
                        </Typography>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
};

export default RouteDetails;
