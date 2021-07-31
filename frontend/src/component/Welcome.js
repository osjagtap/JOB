import React, { useState, useContext, useEffect } from "react";
import {
	Grid,
	Typography,
	MobileStepper,
	Paper,
	Button,
	makeStyles,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import JobCard from "./JobCard";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";
import axios from "axios";
import bgImage from "../../src/Assests/bg.jpeg";

const Welcome = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			maxWidth: 400,
			flexGrow: 1,
		},
		outerBody: {
			marginTop: "350px",
		},
		outerContainer: {
			marginTop: "-450px",
		},
		bgImage: {
			width: "80%",
		},
		header: {
			display: "flex",
			alignItems: "center",
			height: 50,
			paddingLeft: theme.spacing(4),
			backgroundColor: theme.palette.background.default,
		},
		img: {
			height: 255,
			display: "block",
			maxWidth: 400,
			overflow: "hidden",
			width: "100%",
		},
	}));
	const classes = useStyles();
	const theme = useTheme();
	const [jobs, setJobs] = useState([]);
	const setPopup = useContext(SetPopupContext);

	const onLoad = () => {
		axios
			.get(apiList.getJobs, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log(response.data);
				setJobs(response.data);
			})
			.catch((err) => {
				console.log(err.response.data);
				setPopup({
					open: true,
					severity: "error",
					message: "Error",
				});
			});
	};
	useEffect(() => {
		onLoad();
	}, []);

	return (
		<div className={classes.outerBody}>
			<Grid
				container
				className={classes.outerContainer}
				justify="center"
				align="center"
			>
				<Grid item lg={12}>
					<Typography variant="h2">Find Your Dream Job</Typography>
				</Grid>
			</Grid>
			<Grid container justify="center">
				{jobs &&
					jobs.map((job, index) => {
						return (
							<Grid item lg={10}>
								<JobCard
									title={job.title}
									job_type={job.jobType}
									job_id={job._id}
									no_of_openings={job.maxPositions}
									post={job.post}
								/>
							</Grid>
						);
					})}
			</Grid>
		</div>
	);
};

export const ErrorPage = (props) => {
	return (
		<Grid
			container
			item
			direction="column"
			alignItems="center"
			justify="center"
			style={{ padding: "30px", minHeight: "93vh" }}
		>
			<Grid item>
				<Typography variant="h2">Error 404</Typography>
			</Grid>
		</Grid>
	);
};

export default Welcome;
