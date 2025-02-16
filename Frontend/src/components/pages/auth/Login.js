import React, { useState, useContext } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    IconButton,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./auth.css";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

// Define the custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#74B83E", // Primary color
        },
        secondary: {
            main: "#52BD39", // Secondary color
        },
        background: {
            default: "#F5FBF4", // Background color
        },
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    textAlign: "center",
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const GoogleButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setIsUserLoggedIn } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setEmailError("");
        setGeneralError("");
        setError("");

        if (!email) {
            setEmailError("Email is required");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }

        try {
            const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/users/login`,
                { email, password },
                { withCredentials: true }
            );
            console.log("res", response);
            const data = response.data;
            if (data.success) {
                console.log("User logged in successfully", data.user.accessToken);
                localStorage.setItem("accessToken", data.user.accessToken);
                setIsUserLoggedIn(true); // Update login state
                navigate("/");
            } else {
                setGeneralError(data.message);
                console.log(data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="h-[calc(100svh-5rem)] flex justify-center items-center">
                <Container component="main" maxWidth="xs" className="relative">
                    <StyledPaper elevation={3}>
                        <div className="flex items-center">
                            <IconButton
                                onClick={() => navigate("/")}
                                color="inherit"
                                size="small"
                                sx={{ position: "absolute", left: "2rem" }}>
                                <ArrowBackIcon
                                    sx={{ height: "35px", width: "35px" }}
                                />
                            </IconButton>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{ fontWeight: "bold", margin: "0 auto" }}>
                                Login
                            </Typography>
                        </div>

                        <StyledForm noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={isSubmitted && !!emailError}
                                helperText={isSubmitted && emailError}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={isSubmitted && !!generalError}
                                helperText={isSubmitted && generalError}
                            />
                            {error && (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    align="center">
                                    {error}
                                </Typography>
                            )}
                            <SubmitButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ color: "white" }}>
                                Login
                            </SubmitButton>
                            <GoogleButton
                                fullWidth
                                variant="outlined"
                            // onClick={handleGoogleSignIn}
                            >
                                Login with Google
                            </GoogleButton>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="text-[#00aaff] text-lg">
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Box>
                        </StyledForm>
                    </StyledPaper>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Login;
