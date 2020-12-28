import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import React from "react";
import {useStore} from "../store";
import {changePage} from "../actions/animal";


export const Navbar = () => {
	const {state, dispatch} = useStore();
	return(
		<AppBar position="static">
			<Toolbar variant="dense">
				{
					state.page === 'SEARCH'? "" : (
						<Button onClick={() => changePage(dispatch, 'SEARCH')} color="inherit">
							Search Again
						</Button>
					)
				}
			</Toolbar>
		</AppBar>
	);
};