import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const User = (props) => {
	return (
		<Button to={`/profile/${props.id}`} component={NavLink}>
			<Card sx={{ maxWidth: 300 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="250"
						image={`http://localhost:8000/freefiles/images/${props.profileimage}`}
						alt={(props.id + props.username + props.profileimage).toString()}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{props.username}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Button>
	);
};

export default User;
