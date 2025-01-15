import React from 'react';
import { Box, Typography, Button, Grid2 as Grid, Avatar } from '@mui/material';
import { TaxiSectionType } from '../utils/interfaces';

const TaxiSection: React.FC<TaxiSectionType> = ({ taxiCount, onJoinQueue }) => {
	return (
		<Box sx={{ textAlign: 'center', border: '1px solid #ddd', padding: 2 }}>
			<Typography variant="h5">Taxis</Typography>
			<Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 2 }}>
				{[...Array(3)].map((_, index) => (
					<Grid key={index}>
						<Avatar alt="Taxi" src="minivan.png" sx={{ width: 100, height: 100 }} variant="square" />
					</Grid>
				))}
			</Grid>
			<Typography variant="body1">
				<span className="count">{taxiCount}</span> taxis in queue
			</Typography>
			<Box sx={{ marginTop: 2 }}>
				<Button variant="outlined" onClick={onJoinQueue}>Join queue</Button>
			</Box>
		</Box>
	);
};

export default TaxiSection;
