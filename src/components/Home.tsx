import React, { useState } from 'react'
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Ranks from './Ranks'  // Assuming you already have a Ranks component
// import Stats from './Stats';

const Home: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Box sx={{ padding: '30px', textAlign: 'center', maxWidth: '1200px', margin: 'auto' }}>
            {/* Header Section */}
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Welcome to the Rank Manager App
            </Typography>

            {/* Description Section */}
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#555', marginTop: '20px' }}>
                This application allows you to manage ranks and routes. You can create new ranks,
                explore available ranks, and view details for each rank. Let’s get started by adding
                new ranks or exploring the existing ones.
            </Typography>

            {/* Button to open the modal */}
            <Button variant="outlined" color="primary" onClick={handleOpenModal} sx={{ marginTop: '30px' }}>
                Learn What You Can Do
            </Button>

            {/* Modal/Dialog for Features */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>What You Can Do</DialogTitle>
                <DialogContent>
                    <List sx={{ textAlign: 'left', paddingLeft: '20px' }}>
                        <ListItem>
                            <ListItemText primary="Create new ranks to organize your data." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Explore available ranks and their details." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="View the ranks and manage related routes and queues." />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Ranks Section */}
            <Box sx={{ marginTop: '30px' }}>
                <Ranks />
            </Box>
        </Box>
    )
}

export default Home
