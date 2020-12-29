import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {useStore} from '../store';
import {setCurrentAnimal} from '../actions/animal';
import Chip from '@material-ui/core/Chip';

export default function AnimalCard(props) {
	const useStyles = makeStyles({
		root: {
			width: 300,
		},
		media: {
			height: 140,
		},
	});
	const classes = useStyles();
	const {dispatch} = useStore();
	return(
		<Card className={classes.root}>
			<CardActionArea onClick={() => setCurrentAnimal(dispatch, props.animal)}>
				<CardMedia
					className={classes.media}
					image={props.animal.picture}
					title={props.animal.name}
				/>
				<CardContent>
					<Typography gutterBottom variant={"h5"} component={"h2"}>
						{props.animal.name} <Chip variant={"outlined"} disabled size={"small"} label={props.animal.animal} />
					</Typography>
					<Typography variant={"overline"} component={"p"}>
						Age: {props.animal.age}
					</Typography>
					<Typography variant={"overline"} component={"p"}>
						Location: {props.animal.location}
					</Typography>
					<Typography variant={"overline"} component={"p"}>
						Breed: {props.animal.breed}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}