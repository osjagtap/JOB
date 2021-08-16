import { useContext, useEffect, useState } from "react";
import {
	Button,
	Grid,
	Typography,
	Modal,
	Paper,
	makeStyles,
	TextField,
	CircularProgress,
	Box,
} from "@material-ui/core";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
	body: {
		height: "inherit",
	},
	popupDialog: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// padding: "30px",
	},
	progress: {
		marginLeft: "150px",
	},
}));

const Profile = (props) => {
	const classes = useStyles();
	const setPopup = useContext(SetPopupContext);
	const [profileDetails, setProfileDetails] = useState({
		name: "",
		bio: "",
		contactNumber: "",
		achievements: "",
		progress: 70,
	});

	const [phone, setPhone] = useState("");

	const handleInput = (key, value) => {
		setProfileDetails({
			...profileDetails,
			[key]: value,
		});
	};

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		axios
			.get(apiList.user, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				setProfileDetails(response.data);
				setPhone(response.data.contactNumber);
				console.log("GET DETAILS : ", profileDetails);
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
	const handleUpdate = () => {
		console.log("Progress : ", profileDetails.progress);
		let updatedDetails = {
			...profileDetails,
		};
		if (phone !== "") {
			updatedDetails = {
				...profileDetails,
				contactNumber: `+${phone}`,
				progress: 100,
			};
		} else {
			updatedDetails = {
				...profileDetails,
				contactNumber: "",
				progress: 100,
			};
		}
		console.log("UPDATED DETAILS", updatedDetails);

		axios
			.put(apiList.user, updatedDetails, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				setPopup({
					open: true,
					severity: "success",
					message: response.data.message,
				});
				getData();
			})
			.catch((err) => {
				setPopup({
					open: true,
					severity: "error",
					message: err.response.data.message,
				});
				console.log(err.response);
			});
	};

	return (
		<>
			<Grid
				container
				item
				direction="column"
				alignItems="center"
				style={{ padding: "30px", minHeight: "93vh" }}
			>
				<Grid item container>
					<Grid item lg={10}>
						<Typography variant="h2">Profile</Typography>
					</Grid>
					<Grid item lg={2}>
						<div className={classes.progress}>
							<Box position="relative" display="inline-flex">
								<CircularProgress
									variant="determinate"
									value={profileDetails.progress}
								/>
								<Box
									top={0}
									left={0}
									bottom={0}
									right={0}
									position="absolute"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<Typography
										variant="caption"
										component="div"
										color="textSecondary"
									>{`${profileDetails.progress}%`}</Typography>
								</Box>
							</Box>
						</div>
					</Grid>
				</Grid>
				<Grid item xs style={{ width: "100%" }}>
					<Paper
						style={{
							padding: "20px",
							outline: "none",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							//   width: "60%",
						}}
					>
						<Grid container direction="column" alignItems="stretch" spacing={3}>
							<Grid item>
								<TextField
									label="Name"
									value={profileDetails.name}
									onChange={(event) => handleInput("name", event.target.value)}
									className={classes.inputBox}
									variant="outlined"
									fullWidth
									style={{ width: "100%" }}
								/>
							</Grid>
							<Grid item>
								<TextField
									label="Bio (upto 250 words)"
									multiline
									rows={8}
									style={{ width: "100%" }}
									variant="outlined"
									value={profileDetails.bio}
									onChange={(event) => {
										if (
											event.target.value.split(" ").filter(function (n) {
												return n !== "";
											}).length <= 250
										) {
											handleInput("bio", event.target.value);
										}
									}}
								/>
							</Grid>
							<Grid item>
								<TextField
									label="Achievements"
									multiline
									placeholder=""
									rows={4}
									style={{ width: "100%" }}
									variant="outlined"
									value={profileDetails.achievements}
									onChange={(event) => {
										handleInput("achievements", event.target.value);
									}}
								/>
							</Grid>
							<Grid
								item
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<PhoneInput
									country={"in"}
									value={phone}
									onChange={(phone) => setPhone(phone)}
									style={{ width: "auto" }}
								/>
							</Grid>
						</Grid>
						<Button
							variant="contained"
							color="primary"
							style={{ padding: "10px 50px", marginTop: "30px" }}
							onClick={() => handleUpdate()}
						>
							Update Details
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Profile;
