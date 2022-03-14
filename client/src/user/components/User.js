import React from 'react';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const User = (props) => {
	return (
		<Card sx={{ maxWidth: 300, m: 1 }}>
			<CardActionArea to={`/profile/${props.id}`} component={NavLink}>
				<CardMedia
					component="img"
					height="150"
					image={
						props.profileimage === 'defaultimage'
							? 'http://localhost:8000/freefiles/images/user_image.png'
							: `http://localhost:8000/freefiles/images/${props.profileimage}`
					}
					alt={(props.username + ' profile image').toString()}
				/>

				<CardContent>
					<Typography gutterBottom variant="h6" component="h6">
						{props.username}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default User;
