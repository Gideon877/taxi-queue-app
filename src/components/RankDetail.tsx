import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Home as HomeIcon, Route as RouteIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material'
import useRankStore from '../store/useRankStore';
import useRouteStore from '../store/useRouteStore';

interface Route {
    id: number;
    fare: number;
    fromRankId: number;
    toRankId: number;
    queueId: number;
}


const RankDetail: React.FC = () => {
    const { id } = useParams();

    const { getRank, rank, ranks } = useRankStore()
    const { routes, toRankId, fare, setFare, setToRankId, addRoute, getRankRoutes } = useRouteStore()

    const [editRouteId, setEditRouteId] = useState<number | null>(null);
    const [editFare, setEditFare] = useState('');
    const [editFromRankId, setEditFromRankId] = useState<number | null>(null);
    const [editToRankId, setEditToRankId] = useState<number | null>(null);
    const navigate = useNavigate();


    // Fetch rank and associated routes
    useEffect(() => {
        if (id) {
            getRank(Number(id));
            getRankRoutes(Number(id));
        }
    }, [id, getRank, getRankRoutes]);

    const handleAddRoute = () => {
        // if (fare.trim() === '' || fromRankId === null || toRankId === null) return;

        if(id){
            addRoute(Number(id));
        }
        // API call to create a new route (replace with actual endpoint)
        // Example:
        // fetch(`/api/routes`, {
        //   method: 'POST',
        //   body: JSON.stringify({ fare, fromRankId, toRankId, queueId: rank?.queueId }),
        // })
        //   .then(res => res.json())
        //   .then(data => {
        //     setRoutes([...routes, data.route]); // Add newly created route
        //     setFare('');
        //     setFromRankId(null);
        //     setToRankId(null);
        //   });

        // Simulating adding a route
        // const newRoute = { id: routes.length + 1, fare: parseInt(fare), fromRankId, toRankId };
        // setRoutes([...routes, newRoute]);
        // setFare('');
        // setFromRankId(null);
        // setToRankId(null);
    };

    const handleEditRoute = (id: number, fare: number, fromRankId: number, toRankId: number) => {
        setEditRouteId(id);
        setEditFare(fare.toString());
        setEditFromRankId(fromRankId);
        setEditToRankId(toRankId);
    };

    const handleUpdateRoute = () => {
        if (editRouteId !== null && editFare && editFromRankId !== null && editToRankId !== null) {
            // API call to update route (replace with actual endpoint)
            // Example:
            // fetch(`/api/routes/${editRouteId}`, {
            //   method: 'PUT',
            //   body: JSON.stringify({ fare: editFare, fromRankId: editFromRankId, toRankId: editToRankId }),
            // })
            //   .then(res => res.json())
            //   .then(data => {
            //     setRoutes(routes.map(route => route.id === editRouteId ? data.route : route));
            //     setEditRouteId(null);
            //     setEditFare('');
            //     setEditFromRankId(null);
            //     setEditToRankId(null);
            //   });

            // Simulating updating a route
            // setRoutes(routes.map(route => route.id === editRouteId ? { ...route, fare: parseInt(editFare), fromRankId: editFromRankId, toRankId: editToRankId } : route));
            setEditRouteId(null);
            setEditFare('');
            setEditFromRankId(null);
            setEditToRankId(null);
        }
    };

    const handleDeleteRoute = (id: number) => {
        // API call to delete route (replace with actual endpoint)
        // Example:
        // fetch(`/api/routes/${id}`, { method: 'DELETE' })
        //   .then(() => {
        //     setRoutes(routes.filter(route => route.id !== id));
        //   });

        // Simulating route deletion
        // setRoutes(routes.filter(route => route.id !== id));
    };

    const handleViewQueue = (queueId: number) => {
        navigate(`/queue/${queueId}`);
    };

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
                        label="Fare"
                        value={fare}
                        onChange={(e) => setFare(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="From Rank Name"
                        disabled
                        value={rank.rankName}
                        variant="outlined"
                        margin="normal"
                        type="text"
                    />

                    {/* <TextField
                        fullWidth
                        label="To Rank ID"
                        value={toRankId ?? ''}
                        onChange={(e) => setToRankId(Number(e.target.value))}
                        variant="outlined"
                        margin="normal"
                        type="number"
                    /> */}

                    <Autocomplete
                        fullWidth
                        options={ranks.filter(r => r.id !== rank.id)}
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
                                <ListItemText primary={`${route.toRankName} Station - R${route.fare}`} />
                                <IconButton onClick={() => handleEditRoute(route.id, route.fare, route.fromRankId, route.toRankId)}>
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

                    {/* Edit Dialog */}
                    <Dialog open={editRouteId !== null} onClose={() => setEditRouteId(null)}>
                        <DialogTitle>Edit Route</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Fare"
                                value={editFare}
                                onChange={(e) => setEditFare(e.target.value)}
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
                            <TextField
                                fullWidth
                                label="To Rank ID"
                                value={editToRankId ?? ''}
                                onChange={(e) => setEditToRankId(Number(e.target.value))}
                                variant="outlined"
                                margin="normal"
                                type="number"
                            />
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
