import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useStore} from "../store";
import {changePage} from "../actions/animal";
import Grid from "@material-ui/core/Grid";


export const Navbar = () => {
	const {state, dispatch} = useStore();
	let buttons = "";
	if (state.page === 'RESULTS') {
		buttons =
			<Grid container direction={"row-reverse"} justify="space-between">
				<Button endIcon={<SearchIcon />} onClick={() => changePage(dispatch, 'SEARCH')} color="inherit">
					Search Again
				</Button>
			</Grid>
	} else if (state.page === 'DETAIL') {
		buttons =
			<Grid container direction={"row-reverse"} justify="space-between">
				<Button endIcon={<SearchIcon />} onClick={() => changePage(dispatch, 'SEARCH')} color="inherit">
					Search Again
				</Button>
				<Button startIcon={<ArrowBackIcon />} onClick={() => changePage(dispatch, 'RESULTS')} color="inherit">
					Back to Results
				</Button>
			</Grid>

	}
	return(
		<AppBar position="static">
			<Toolbar variant="dense">
				{buttons}
			</Toolbar>
		</AppBar>
	);
};