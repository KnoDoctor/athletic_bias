import React, { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Button from "../atoms/Button";
import TextField from "../atoms/TextInput";

const LoginForm = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emailValue, setEmailValue] = useState(null);
    const [passwordValue, setPasswordValue] = useState(null);
    const [showPassword, setShowPassword] = useState(null);

    function handleClick(e) {
        e.preventDefault();

        login();
    }

    function handleEmailChange(e) {
        setEmailValue(e.target.value);
    }
    function handlePasswordChange(e) {
        setPasswordValue(e.target.value);
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const login = async () => {
        setLoading(true);
        let loginRes = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
        });
        let loginData = await loginRes.json();

        if (!loginData.success) {
            setLoading(false);
            setError(loginData.message);
            localStorage.setItem("loggedIn", false);
            console.log("Login Failed");
            return;
        }

        // localStorage.setItem("refreshToken", loginData.refreshToken);
        localStorage.setItem("accessToken", loginData.accessToken);
        // localStorage.setItem("idToken", loginData.idToken);
        localStorage.setItem("loggedIn", true);
        setLoading(false);
        console.log("Login Successful");
        router.push("/");
    };

    return (
        <Card variant="outlined">
            <Box style={{ width: "60%", margin: "auto", textAlign: "center" }}>
                <h1>Login</h1>
                <TextField
                    id="email"
                    type={"text"}
                    value={emailValue}
                    label="Email"
                    onChange={handleEmailChange}
                />
                <TextField
                    id="email"
                    type={showPassword ? "text" : "password"}
                    value={passwordValue}
                    label="Password"
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    loadingSettings={{
                        loading,
                    }}
                >
                    Sign in
                </Button>
                <FormControlLabel
                    sx={{
                        display: "block",
                    }}
                    control={
                        <Switch
                            checked={loading}
                            onChange={() => setLoading(!loading)}
                            name="loading"
                            color="primary"
                        />
                    }
                    label="Loading"
                />
            </Box>
        </Card>
    );
};

export default LoginForm;
