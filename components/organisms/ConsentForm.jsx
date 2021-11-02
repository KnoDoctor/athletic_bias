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

const ConsentForm = ({ hasConsented, handleDialogClickOpen }) => {
    const router = useRouter();

    const [firstNameValue, setFirstNameValue] = useState(null);
    const [lastNameValue, setLastNameValue] = useState(null);
    const [emailValue, setEmailValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passwordValue, setPasswordValue] = useState(null);
    const [showPassword, setShowPassword] = useState(null);

    function handleViewConsentFormClick(e) {
        e.preventDefault();
        handleDialogClickOpen();
    }

    function handleContinueClick(e) {
        e.preventDefault();

        console.log("Consented Cick");
        createCoach();
    }

    function handleEmailChange(e) {
        setEmailValue(e.target.value);
    }

    function handleFirstNameChange(e) {
        setFirstNameValue(e.target.value);
    }
    function handleLastNameChange(e) {
        setLastNameValue(e.target.value);
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const createCoach = async () => {
        setLoading(true);
        let createCoachRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/coaches`,
            {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstNameValue,
                    last_name: lastNameValue,
                    email: emailValue,
                }),
            }
        );
        let createCoachData = await createCoachRes.json();

        if (!createCoachData.success) {
            setLoading(false);

            console.log(createCoachData);
            return;
        }

        setLoading(false);
        console.log(createCoachData);
        router.push("/about");
    };

    return (
        <Card elevation={5}>
            <Box style={{ width: "90%", margin: "auto", textAlign: "center" }}>
                <h2>Perceptions on Athlete Development</h2>
                <TextField
                    id="firstName"
                    type={"text"}
                    value={firstNameValue}
                    label="First Name"
                    onChange={handleFirstNameChange}
                />
                <TextField
                    id="lastName"
                    type={"text"}
                    value={lastNameValue}
                    label="Last Name"
                    onChange={handleLastNameChange}
                />
                <TextField
                    id="email"
                    type={"text"}
                    value={emailValue}
                    label="Email"
                    onChange={handleEmailChange}
                />

                <Button
                    variant="contained"
                    color={"primary"}
                    onClick={
                        hasConsented
                            ? handleContinueClick
                            : handleViewConsentFormClick
                    }
                    loadingSettings={{
                        loading,
                    }}
                >
                    {hasConsented
                        ? "Continue to Survey"
                        : "Review Consent Form"}
                </Button>
                {hasConsented ? (
                    <Box style={{ width: "70%", margin: "auto" }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            color="primary"
                            onClick={handleViewConsentFormClick}
                        >
                            Review Consent Form
                        </Button>
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </Card>
    );
};

export default ConsentForm;
