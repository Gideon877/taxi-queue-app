import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useRankStore from '../store/useRankStore';


const Ranks: React.FC = () => {

    const {rankName, editRankId,editRankName, ranks, setRankName, addRank, updateRank, setEditRankId, setEditRankName, deleteRank} = useRankStore();
   
    const navigate = useNavigate();

    const handleAddRank = () => {
        if (rankName.trim() === '') return;
        addRank(rankName)
    };

    const handleEditRank = (id: number, name: string) => {
        setEditRankId(id);
        setEditRankName(name);
    };

    const handleUpdateRank = () => {
        updateRank()
    };

    const handleDeleteRank = (id: number) => {
        deleteRank(id)
    };

    const handleViewRank = (id: number) => {
        navigate(`/rank/${id}`);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Add New Rank
            </Typography>

            <TextField
                fullWidth
                label="Rank Name"
                value={rankName}
                onChange={(e) => setRankName(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddRank}
                style={{ marginBottom: '2rem' }}
            >
                Add Rank
            </Button>

            <Typography variant="h5" gutterBottom>
                Current Rank List
            </Typography>

            {ranks.length > 0 ?
                (<List>
                    {ranks.map((rank) => (
                        <ListItem key={rank.id} divider>
                            <ListItemText primary={rank.rankName} />
                            <IconButton onClick={() => handleViewRank(rank.id)}>
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEditRank(rank.id, rank.rankName)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteRank(rank.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>)
                : (<Typography variant="body1" color="textSecondary">
                    There are no ranks available. Please add a rank.
                </Typography>)

            }

            {/* Edit Dialog */}
            <Dialog open={editRankId !== null} onClose={() => setEditRankId(null)}>
                <DialogTitle>Edit Rank</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Rank Name"
                        value={editRankName}
                        onChange={(e) => setEditRankName(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditRankId(null)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateRank} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Ranks;
