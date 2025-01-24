import React, { useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Breadcrumbs,
    Link,
    CssBaseline,
    Autocomplete,
    ListItemAvatar,
    Avatar,
    ListItemButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Home as HomeIcon, Route as RouteIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material'
import useRankStore from '../store/useRankStore';
import useRouteStore from '../store/useRouteStore';

const RankDetail: React.FC = () => {
    const { id } = useParams();

    const { getRank, rank, ranks } = useRankStore()
    const {
        routes,
        editRouteId,
        toRankId,
        fare,
        editFare,
        setEditRouteId,
        updateRoute,
        setFare,
        setToRankId,
        addRoute,
        setEditFare,
        getRankRoutes,
        deleteRoute
    } = useRouteStore()

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getRank(Number(id));
            getRankRoutes(Number(id));
        }
    }, [id, getRank, getRankRoutes]);

    const handleAddRoute = () => id ? addRoute(Number(id)) : null;

    const handleEditRoute = (id: number, fare: number) => {
        setEditRouteId(id);
        setEditFare(fare);
    };

    const handleUpdateRoute = () => updateRoute();

    const handleDeleteRoute = (id: number) => deleteRoute(id);

    const handleViewQueue = (queueId: number) => {
        navigate(`/queue/${queueId}`);
    };

    const filteredRanks = ranks.filter(rank => !routes.some(route => route.toRankId === rank.id));

    return (
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

                <Typography
                    sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
                >
                    <RouteIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Routes
                </Typography>
            </Breadcrumbs>

            <CssBaseline />
            {rank && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Manage Routes for {rank.rankName} (Rank ID: {rank.id})
                    </Typography>

                    <TextField
                        fullWidth
                        label="From Rank Name"
                        disabled
                        value={rank.rankName}
                        variant="outlined"
                        margin="normal"
                        type="text"
                    />

                    <Autocomplete
                        fullWidth
                        options={filteredRanks.filter(r => r.id !== rank.id )}
                        getOptionLabel={(option) => option.rankName}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="To Rank"
                                variant="outlined"
                                margin="normal"
                            />
                        )}
                        value={ranks.find(rank => rank.id === toRankId) || null}
                        onChange={(_event, newValue) => {
                            if (newValue) {
                                setToRankId(newValue.id);
                            } else {
                                setToRankId(null);
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Fare"
                        value={fare}
                        onChange={(e) => setFare(Number(e.target.value))}
                        variant="outlined"
                        margin="normal"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddRoute}
                        style={{ marginBottom: '2rem' }}
                    >
                        Add Route
                    </Button>

                    <Typography variant="h5" gutterBottom>
                        Routes List
                    </Typography>
                    <List>
                        {routes.map((route) => (
                            <ListItem key={route.id} divider>
                                <ListItemButton component="a" href={`/rank/${route.toRankId}`}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <RouteIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${route.toRankName}`} secondary={`R${route.fare}`} />
                                </ListItemButton>

                                <IconButton onClick={() => handleEditRoute(route.id, route.fare)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteRoute(route.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => handleViewQueue(route.queueId)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Edit Dialog 
                        TODO: need to add more data to be edited
                    */}
                    <Dialog open={editRouteId !== null} onClose={() => setEditRouteId(null)}>
                        <DialogTitle>Edit Route</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Fare"
                                value={editFare}
                                onChange={(e) => setEditFare(Number(e.target.value))}
                                variant="outlined"
                                margin="normal"
                            />
                            {/* <TextField
                                fullWidth
                                label="From Rank ID"
                                value={editFromRankId ?? ''}
                                onChange={(e) => setEditFromRankId(Number(e.target.value))}
                                variant="outlined"
                                margin="normal"
                                type="number"
                            /> */}
                            {/* <TextField
                                fullWidth
                                label="Destination "
                                value={editToRankId ?? ''}
                                onChange={(e) => setEditToRankId(Number(e.target.value))}
                                variant="outlined"
                                disabled
                                margin="normal"
                                type="number"
                            /> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setEditRouteId(null)} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateRoute} color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Container>
    );
};

export default RankDetail;
