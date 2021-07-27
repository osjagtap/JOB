import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles({
	cardContainer: {
		minHeight: "200px",
	},
	details: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function JobCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.cardContainer}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{props.title}
				</Typography>
				<Typography
					className={classes.details}
					color="textSecondary"
					gutterBottom
				>
					Post : {props.post}
				</Typography>
				<Typography
					className={classes.details}
					color="textSecondary"
					gutterBottom
				>
					Job id : {props.job_id}
				</Typography>
				<Typography
					className={classes.details}
					color="textSecondary"
					gutterBottom
				>
					Job Type : {props.job_type}
				</Typography>
				<Typography
					className={classes.details}
					color="textSecondary"
					gutterBottom
				>
					Number of Openings : {props.no_of_openings}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" disabled>
					Apply
				</Button>
			</CardActions>
		</Card>
	);
}
