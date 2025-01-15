import React from 'react';
import { Box, Breadcrumbs, CssBaseline, Grid2 as Grid, Link, Paper, Typography, Container } from '@mui/material';
import PassengerSection from './PassengerSection';
import TaxiSection from './TaxiSection';
import TaxiDepartingSection from './TaxiDepartingSection';
import useAppStore from '../store/useQueueStore';
import { FaUserCheck, FaTaxi, FaMoneyBillWave } from 'react-icons/fa';
import { Home as HomeIcon, Route as RouteIcon, LinearScale as LinearScaleIcon } from '@mui/icons-material'


const QueueSections: React.FC = () => {

    const {
        passengerCount,
        taxiCount,
        taxiDepartedCount,
        setPassengerCount,
        setTaxiCount,
        setTaxiDepartedCount,
    } = useAppStore()

    const handleJoinPassengerQueue = () => setPassengerCount(passengerCount + 1);
    const handleLeavePassengerQueue = () => setPassengerCount(Math.max(passengerCount - 1, 0));

    const handleJoinTaxiQueue = () => setTaxiCount(taxiCount + 1);
    const handleDepartTaxi = () => {
        if (taxiCount > 0 && passengerCount >= 5) {
            // setTaxiCount(Math.max(taxiCount - 1, 0))
            setTaxiDepartedCount(taxiDepartedCount + 1);
            // setPassengerCount(Math.max(passengerCount - 5, 0))
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Taxi Queue
                    </Link>

                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/rank/1"
                    >
                        <RouteIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Routes
                    </Link>

                    <Typography
                        sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                    >
                        <LinearScaleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Queue
                    </Typography>
                </Breadcrumbs>
            </Container>

            <CssBaseline />
            <Grid container spacing={4}>
                {/* Passengers Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <PassengerSection
                        passengerCount={passengerCount}
                        onJoinQueue={handleJoinPassengerQueue}
                        onLeaveQueue={handleLeavePassengerQueue}
                    />
                </Grid>

                {/* Taxis Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <TaxiSection
                        taxiCount={taxiCount}
                        onJoinQueue={handleJoinTaxiQueue}
                    />
                </Grid>

                {/* Taxi Departing Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <TaxiDepartingSection
                        onDepartTaxi={handleDepartTaxi}
                        taxiDepartedCount={taxiDepartedCount}
                    />
                </Grid>
            </Grid>

            {/* Stats Section */}
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                        <FaUserCheck size={40} color="#4CAF50" style={{ marginRight: 16 }} />
                        <div>
                            <Typography variant="h6">Passengers Departed</Typography>
                            <Typography variant="h4">{taxiDepartedCount * 5}</Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                        <FaTaxi size={40} color="#FF9800" style={{ marginRight: 16 }} />
                        <div>
                            <Typography variant="h6">Taxis Needed</Typography>
                            <Typography variant="h4">
                                {Math.max(0, Math.ceil(passengerCount / 5) - taxiCount)}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                        <FaUserCheck size={40} color="#4CAF50" style={{ marginRight: 16 }} />
                        <div>
                            <Typography variant="h6">Passengers Needed</Typography>
                            <Typography variant="h4">
                                {passengerCount % 5 === 0 ? 0 : 5 - (passengerCount % 5)}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>


                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                        <FaMoneyBillWave size={40} color="#2196F3" style={{ marginRight: 16 }} />
                        <div>
                            <Typography variant="h6">Fare Made</Typography>
                            <Typography variant="h4">R {(taxiDepartedCount * 50).toFixed(2)}</Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default QueueSections;
