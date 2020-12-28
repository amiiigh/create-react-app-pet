import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {StoreContext} from "../store";
import {getAnimals, searchAnimal} from "../actions/animal";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReplayOutlinedIcon from '@material-ui/icons/ReplayOutlined';
import IconButton from "@material-ui/core/IconButton";

const useStyles = theme => ({
	paper: {
		padding: theme.spacing(2),
		width: 300
	},
	input: {
		marginBottom: theme.spacing(2)
	}
});

class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNotValid: true,
			maxAgeChanged: false,
			breedChanged: false,
			animalChanged: false,
			locationChanged: false,
			maxAgeValid: false,
			breedValid: false,
			animalValid: false,
			locationValid: false,
			maxAge: '',
			breed: '',
			animal: '',
			location: ''
		};
	}

	static contextType = StoreContext;

	componentDidMount() {
		getAnimals(this.context.dispatch);
	};

	isFormValid = () => {
		return this.state.maxAgeValid && this.state.locationValid && this.state.animalValid && this.state.breedValid;
	};

	handleChange = (e) => {
		if (e.target.name === "animal") {
			this.setState({ breed: ""});
		}
		this.setState({
			[e.target.name] : e.target.value,
			[e.target.name+'Changed']: true,
		}, () => this.validateInput(e.target.name));
	};

	isValidZip = (zip) => {
		return /^\d{5}(-\d{4})?$/.test(zip);
	};

	validateInput = (name) => {
		if (name === 'maxAge' || name ==='breed' || name === 'animal') {
			if (this.state[name] !== "") {
				this.setState({[name + "Valid"]: true});
			} else {
				this.setState({[name + "Valid"]: false});
			}
		} else if (name === 'location') {
			if (this.isValidZip(this.state.location)) {
				this.setState({locationValid: true})
			} else {
				this.setState({locationValid: false})
			}
		}
	};

	submitForm = () => {
		let query = {
			animal: this.state.animal,
			maxAge: parseInt(this.state.maxAge),
			breed: this.state.breed,
			location: this.state.location,
		};
		searchAnimal(this.context.dispatch, query);
	};

	getAnimalMenuItems = (animals) => {
		return animals.map((animal, index) =>
			<MenuItem key={index} value={animal}>{animal}</MenuItem>
		)
	};

	getBreedsMenuItems = (breeds) => {
		if (this.state['animal']) {
			return breeds[this.state['animal']].map((breed, index) =>
				<MenuItem key={index} value={breed}>{breed}</MenuItem>
			)
		}
	};

	reloadPage = () => {
		window.location.reload();
	};

	isLoading = () => {
		return this.context.state.fetchingAnimals || this.context.state.searching
	};

	getErrorMessage = () => {
		if (this.context.state.fetchingAnimalsError !== "") {
			return 'GET ANIMAL ' + this.context.state.fetchingAnimalsError;
		} else if (this.context.state.searchError) {
			return 'SEARCH ' + this.context.state.searchError;
		}
	};

	render() {
		const animals = this.context.state.animals;
		const { classes } = this.props;
		return (
			this.getErrorMessage() === "" ? (
					<Grid item>
						{this.isLoading() ? <LinearProgress /> : ""}
						<Paper square={true} className={classes.paper} elevation={2}>
							<Grid container direction={"column"}>
								<TextField
									error={this.state.maxAgeChanged && !this.state.maxAgeValid}
									name='maxAge'
									onChange={this.handleChange}
									className={classes.input}
									label="Max Age"
									size={"small"}
									type="number"
									variant="outlined" />
								<TextField
									error={this.state.locationChanged && !this.state.locationValid}
									name='location'
									onChange={this.handleChange}
									className={classes.input}
									label="Location"
									size={"small"}
									type="text"
									variant="outlined" />
								<FormControl error={this.state.animalChanged && !this.state.animalValid}
											 size="small" variant="outlined" className={classes.input}>
									<InputLabel>Animal</InputLabel>
									<Select value={this.state.animal} defaultValue="" name="animal"
											onChange={this.handleChange} label="Animal">
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{this.getAnimalMenuItems(Object.keys(animals))}
									</Select>
								</FormControl>
								<FormControl error={this.state.breedChanged && !this.state.breedValid} size="small"
											 variant="outlined" className={classes.input}>
									<InputLabel id="breed">Breed</InputLabel>
									<Select value={this.state.breed} defaultValue="" name="breed" labelId="breed"
											label="Breed" onChange={this.handleChange}>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{this.getBreedsMenuItems(animals)}
									</Select>
								</FormControl>
								<Button onClick={this.submitForm} disabled={!this.isFormValid()} variant="contained"
										color="primary">
									Submit
								</Button>
							</Grid>
						</Paper>
					</Grid>
				) :
				<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
					<Typography color="textSecondary" variant="h5" component="h5">
						Something went wrong! Try again later
					</Typography>
					<Typography variant={"overline"} component="h5">
						{this.getErrorMessage()}
					</Typography>
					<IconButton aria-label="reload" onClick={this.reloadPage}>
						<ReplayOutlinedIcon/>
					</IconButton>

				</Grid>
		);
	}
}

export default withStyles(useStyles)(SearchPage)