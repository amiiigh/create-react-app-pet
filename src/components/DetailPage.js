import Grid from '@material-ui/core/Grid';
import React from 'react';
import {useStore} from '../store';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';

//TODO use hooks to get animal id from url to call the detail api

export default function DetailPage(props) {
	const {state} = useStore();
	const animal = state.currentAnimal;
	const useStyles = makeStyles({
		root: {
			width: 500,
		},
		media: {
			height: 200,
		},
	});
	const classes = useStyles();
	return (
		<Grid item xs={10}>
			<Grid item container justify={"center"}>
				<Card className={classes.root}>
					<CardMedia
						className={classes.media}
						image={animal.picture}
						title={animal.name}
					/>
					<CardContent>
						<Typography gutterBottom variant={"h5"} component={"h2"}>
							{animal.name} <Chip variant={"outlined"} disabled size={"small"} label={animal.animal} />
						</Typography>
						<Typography variant={"overline"} component={"p"}>
							Age: {animal.age}
						</Typography>
						<Typography variant={"overline"} component={"p"}>
							Location: {animal.location}
						</Typography>
						<Typography variant={"overline"} component={"p"}>
							Breed: {animal.breed}
						</Typography>
						<Typography variant={"overline"} component={"p"}>
							Favorite Food: {animal.favs}
						</Typography>
						<Typography variant={"body2"} color={"textSecondary"} component={"p"}>
							{animal.about}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}