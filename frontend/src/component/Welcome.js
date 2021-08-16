import React, { useState, useContext, useEffect } from "react";
import {
	Grid,
	Typography,
	MobileStepper,
	Paper,
	Button,
	makeStyles,
	Divider,
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
import job from "../../src/Assests/job.jpg";

const Welcome = (props) => {
	const useStyles = makeStyles((theme) => ({
		body: {
			height: "inherit",
		},
		topSection: {
			marginTop: "30px",
			marginBottom: "110px",
		},
		cardContainer: {
			margin: "3%",
		},
		jobImg: {
			width: "100%",
		},
		title: {
			fontFamily: "'Secular One', sans-serif",
			marginLeft: "25px",
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
		<div>
			<Grid
				container
				spacing={3}
				className={classes.topSection}
				alignItems="center"
			>
				<Grid item lg={5} md={12} sm={12} xs={12}>
					<div style={{ textAlign: "center" }}>
						<Typography component="h1" variant="h2" className={classes.title}>
							Find Your Dream Jobs{" "}
						</Typography>
					</div>
				</Grid>
				<Grid item lg={7} md={12} sm={12} xs={12}>
					<img
						src={job}
						alt="Find Jobs illustration"
						className={classes.jobImg}
					/>
				</Grid>
			</Grid>
			<Divider />
			<div>
				<div style={{ textAlign: "center" , marginTop: "40px"}}>
					<Typography
						variant="h4"
						style={{ fontFamily: "'Ubuntu', sans-serif" }}
					>
						All Jobs
					</Typography>
				</div>
			</div>
			<div className={classes.cardContainer}>
				<Grid container spacing={5} justify="center" alignItems="center">
					{jobs &&
						jobs.map((job, index) => {
							return (
								<Grid item lg={4} md={6} sm={10} xs={10}>
									<JobCard
										title={job.title}
										job_type={job.jobType}
										job_id={job._id}
										no_of_openings={job.maxPositions}
										post={job.post}
										className={classes.jobCard}
									/>
								</Grid>
							);
						})}
				</Grid>
			</div>
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
