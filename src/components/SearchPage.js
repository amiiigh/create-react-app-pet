import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {StoreContext} from "../store";
import {getAnimals, searchAnimal} from "../actions/animal";

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

	render() {
		const animals = this.context.state.animals;
		const { classes } = this.props;
		return (
			<Grid item>
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
						<FormControl error={this.state.animalChanged && !this.state.animalValid} size="small" variant="outlined" className={classes.input}>
							<InputLabel>Animal</InputLabel>
							<Select value={this.state.animal} defaultValue="" name="animal" onChange={this.handleChange} label="Animal">
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{this.getAnimalMenuItems(Object.keys(animals))}
							</Select>
						</FormControl>
						<FormControl error={this.state.breedChanged && !this.state.breedValid} size="small" variant="outlined" className={classes.input}>
							<InputLabel id="breed">Breed</InputLabel>
							<Select value={this.state.breed} defaultValue="" name="breed" labelId="breed" label="Breed" onChange={this.handleChange}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{this.getBreedsMenuItems(animals)}
							</Select>
						</FormControl>
						<Button onClick={this.submitForm} disabled={!this.isFormValid()} variant="contained" color="primary">
							Submit
						</Button>
					</Grid>
				</Paper>
			</Grid>
		);
	}
}

export default withStyles(useStyles)(SearchPage)