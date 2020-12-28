import Grid from "@material-ui/core/Grid";
import React from "react";
import AnimalCard from "./animalCard";
import {useStore} from "../store";
import Typography from "@material-ui/core/Typography";

export default function ResultsPage() {
	const {state} = useStore();
	const searchResults = state.searchResults;

	let result;
	if (state.searchResults.length === 0) {
		result =
			<Typography variant={"h5"} color={"textSecondary"} component={"h5"}>
				Sorry! We couldn't find any results
			</Typography>
	} else {
		result = searchResults.map((animal) => {
			return(
				<Grid item key={animal.id}>
					<AnimalCard animal={animal}/>
				</Grid>
			);
		});
	}
	return (
		<Grid item xs={10}>
			<Grid justify="center" container spacing={2}>
				{result}
			</Grid>
		</Grid>
	);
}