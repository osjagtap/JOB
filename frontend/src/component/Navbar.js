import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import image from "../Assests/logo.png";
import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
  logo : {
    width : "90px",
    height : "70px",
    marginBottom: "-4px",
    marginLeft : "-22px"
  }
}));

const Navbar = (props) => {
	const classes = useStyles();
	let history = useHistory();

	const handleClick = (location) => {
		console.log(location);
		history.push(location);
	};

	return (
		<AppBar position="fixed">
			<Toolbar>
				<div className={classes.title}>
					<img src={image} alt="logo" className={classes.logo} />
				</div>
				{isAuth() ? (
					userType() === "recruiter" ? (
						<>
							<Button color="inherit" onClick={() => handleClick("/home")}>
								Home
							</Button>
							<Button color="inherit" onClick={() => handleClick("/addjob")}>
								Add Jobs
							</Button>
							<Button color="inherit" onClick={() => handleClick("/myjobs")}>
								My Jobs
							</Button>
							<Button color="inherit" onClick={() => handleClick("/employees")}>
								Employees
							</Button>
							<Button color="inherit" onClick={() => handleClick("/profile")}>
								Profile
							</Button>
							<Button color="inherit" onClick={() => handleClick("/logout")}>
								Logout
							</Button>
						</>
					) : (
						<>
							<Button color="inherit" onClick={() => handleClick("/home")}>
								Home
							</Button>
							<Button
								color="inherit"
								onClick={() => handleClick("/applications")}
							>
								Applications
							</Button>
							<Button color="inherit" onClick={() => handleClick("/profile")}>
								Profile
							</Button>
							<Button color="inherit" onClick={() => handleClick("/logout")}>
								Logout
							</Button>
						</>
					)
				) : (
					<>
						<Button color="inherit" onClick={() => handleClick("/login")}>
							Login
						</Button>
						<Button color="inherit" onClick={() => handleClick("/signup")}>
							Signup
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
