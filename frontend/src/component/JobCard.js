import React from "react";
import isAuth from "../lib/isAuth";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
const useStyles = makeStyles({
	cardContainer: {
		minHeight: "250px",
	},
	cardContent : {
		minHeight: "150px",
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
			<CardContent className={classes.cardContent}>
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
				<Tooltip
					title="Login First!"
					aria-label="Login First!"
					placement="right"
				>
					<Button variant="contained" color="default">
						Apply
					</Button>
				</Tooltip>
			</CardActions>
		</Card>
	);
}
