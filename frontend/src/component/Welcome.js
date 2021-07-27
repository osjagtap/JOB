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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [
	{
		label: "San Francisco – Oakland Bay Bridge, United States",
		imgPath:
			"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bird",
		imgPath:
			"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bali, Indonesia",
		imgPath:
			"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
	},
	{
		label: "NeONBRAND Digital Marketing, Las Vegas, United States",
		imgPath:
			"https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Goč, Serbia",
		imgPath:
			"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
	},
];
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
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = tutorialSteps.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};
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
			<Grid container justify="center">
				<Grid item lg={12}>
					<div className={classes.root}>
						<Paper square elevation={0} className={classes.header}>
							<Typography>{tutorialSteps[activeStep].label}</Typography>
						</Paper>
						<AutoPlaySwipeableViews
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={activeStep}
							onChangeIndex={handleStepChange}
							enableMouseEvents
						>
							{tutorialSteps.map((step, index) => (
								<div key={step.label}>
									{Math.abs(activeStep - index) <= 2 ? (
										<img
											className={classes.img}
											src={step.imgPath}
											alt={step.label}
										/>
									) : null}
								</div>
							))}
						</AutoPlaySwipeableViews>
						<MobileStepper
							steps={maxSteps}
							position="static"
							variant="text"
							activeStep={activeStep}
							nextButton={
								<Button
									size="small"
									onClick={handleNext}
									disabled={activeStep === maxSteps - 1}
								>
									Next
									{theme.direction === "rtl" ? (
										<KeyboardArrowLeft />
									) : (
										<KeyboardArrowRight />
									)}
								</Button>
							}
							backButton={
								<Button
									size="small"
									onClick={handleBack}
									disabled={activeStep === 0}
								>
									{theme.direction === "rtl" ? (
										<KeyboardArrowRight />
									) : (
										<KeyboardArrowLeft />
									)}
									Back
								</Button>
							}
						/>
					</div>
				</Grid>
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
