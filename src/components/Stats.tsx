import React, { useEffect } from 'react';
import useStatsStore from '../store/useStatsStore';
import { Container, Typography, Box, CircularProgress, Grid, Paper, CssBaseline } from '@mui/material';

const Stats: React.FC = () => {
    const { stats, detailedStats, fetchStats, fetchDetailedStats } = useStatsStore();

    useEffect(() => {
        fetchStats();
        fetchDetailedStats();
    }, [fetchStats, fetchDetailedStats]);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Stats
                </Typography>
                
                {/* General Stats */}
                <Paper elevation={3} sx={{ padding: 2, mb: 4 }}>
                    <Typography variant="h5">General Stats</Typography>
                    {stats ? (
                        <pre>{JSON.stringify(stats, null, 2)}</pre>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                            <Typography sx={{ ml: 2 }}>Loading stats...</Typography>
                        </Box>
                    )}
                </Paper>

                  {/* Detailed Stats Section */}
                  <Paper elevation={3} sx={{ padding: 2, mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Detailed Stats
                    </Typography>

                    {/* Highest Fare Routes */}
                    <Typography variant="h6" gutterBottom>Highest Fare Routes</Typography>
                    {detailedStats?.highestFareRoutes ? (
                        <Grid container spacing={2}>
                            {detailedStats.highestFareRoutes.map((route, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography variant="subtitle2">{route.fromRankName} to {route.toRankName}</Typography>
                                        <Typography variant="body1">Fare: R {route.fare}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1">No data available for highest fare routes.</Typography>
                    )}

                    <CssBaseline />

                    {/* Frequent Routes */}
                    <Typography variant="h6" gutterBottom>Frequent Routes</Typography>
                    {detailedStats?.frequentRoutes ? (
                        <Grid container spacing={2}>
                            {detailedStats.frequentRoutes.map((route, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography variant="subtitle2">{route.fromRankName} to {route.toRankName}</Typography>
                                        {/* <Typography variant="body1">Route Count: {route.routeCount}</Typography> */}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1">No data available for frequent routes.</Typography>
                    )}

                    {/* Queues With Most Departures */}
                    <Typography variant="h6" gutterBottom>Queues With Most Departures</Typography>
                    {detailedStats?.queuesWithMostDepartures ? (
                        <Grid container spacing={2}>
                            {detailedStats.queuesWithMostDepartures.map((queue, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography variant="subtitle2">{queue.fromRankName} to {queue.toRankName}</Typography>
                                        <Typography variant="body1">Departures: {queue.departures}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1">No data available for queues with most departures.</Typography>
                    )}

                    {/* Fare by From Rank */}
                    <Typography variant="h6" gutterBottom>Fare by From Rank</Typography>
                    {detailedStats?.fareByFromRank ? (
                        <Grid container spacing={2}>
                            {detailedStats.fareByFromRank.map((fare, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography variant="subtitle2">{fare.fromRankName}</Typography>
                                        <Typography variant="body1">Total Fare: R {fare.totalFare}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1">No data available for fare by from rank.</Typography>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Stats;
