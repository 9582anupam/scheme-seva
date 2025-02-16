import React, { useState } from "react";
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

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // General error message
    const [nameError, setNameError] = useState(""); // Email-specific error
    const [emailError, setEmailError] = useState(""); // Email-specific error
    const [passwordError, setPasswordError] = useState(""); // Password-specific error
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setNameError("");
        setError("");
        setEmailError("");
        setPasswordError("");

        if (!name || !email || !password) {
            if (!name) setNameError("Name is required");
            if (!email) setEmailError("Email is required");
            if (!password) setPasswordError("Password is required");
            return;
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/users/signup`,
                {
                    name,
                    email,
                    password,
                },
            );
            console.log("Signup success:", response.data.success);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handleGoogleSignUp = async () => {
        // Handle Google sign-up logic here
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
                                variant="h5"
                                gutterBottom
                                sx={{ fontWeight: "bold" }}>
                                Sign Up
                            </Typography>
                        </div>
                        <StyledForm noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={isSubmitted && !!nameError}
                                helperText={isSubmitted && nameError}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={isSubmitted && !!passwordError}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                error={isSubmitted && !!passwordError}
                                helperText={isSubmitted && passwordError}
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
                                Sign Up
                            </SubmitButton>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={handleGoogleSignUp}
                                sx={{ marginTop: 2 }}>
                                Sign Up with Google
                            </Button>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-[#00aaff] text-lg">
                                        Sign In
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

export default Signup;
