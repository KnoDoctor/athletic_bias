import React, { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import Button from "../atoms/Button";
import TextField from "../atoms/TextInput";
import FullScreenDialog from "../molecules/FullScreenDialog";

const CoachConsentForm = ({ setCoachId }) => {
    const router = useRouter();

    const [firstNameValue, setFirstNameValue] = useState(null);
    const [lastNameValue, setLastNameValue] = useState(null);
    const [emailValue, setEmailValue] = useState(null);
    const [accessCodeValue, setAccessCodeValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passwordValue, setPasswordValue] = useState(null);
    const [showPassword, setShowPassword] = useState(null);
    const [open, setOpen] = useState(false);
    const [hasConsented, setHasConsented] = useState(false);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

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
    function handleAccessCodeChange(e) {
        setAccessCodeValue(e.target.value);
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const createCoach = async () => {
        const errorSetter = (errorObject) => {
            switch (errorObject.code) {
                case "P2002":
                    return {
                        code: "P2002",
                        severity: "error",
                        message:
                            "A coach profile with that email already exists, use your access code to proceed to the survey",
                    };

                default:
                    break;
            }
        };
        setLoading(true);
        let createCoachRes = await fetch(`/api/coaches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstNameValue,
                last_name: lastNameValue,
                email: emailValue,
            }),
        });
        let createCoachData = await createCoachRes.json();

        if (!createCoachData.success) {
            setLoading(false);
            setError(errorSetter(createCoachData.error));
            console.log(createCoachData);
            return;
        }

        setCoachId(createCoachData.data.coach_id);

        setLoading(false);
        router.push("/coaches/signup/details");
    };

    const authenicateCoach = async () => {
        setLoading(true);
        if (!accessCodeValue) return setLoading(false);
        let authenticateCoachRes = await fetch(`/api/coaches/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                accessCode: accessCodeValue,
            }),
        });
        let authenticateCoachData = await authenticateCoachRes.json();
        if (authenticateCoachData.data.length === 0) {
            setError({
                code: "IE0001",
                severity: "info",
                message: "We couldn't verify your account. Please try again.",
            });
            setLoading(false);
            return;
        }
        if (authenticateCoachData.data.length > 1) {
            setError({
                code: "IE0002",
                severity: "info",
                message: "It appears we have a duplicate account on file.",
            });
            setLoading(false);
            return;
        }
        setCoachId(authenticateCoachData.data[0].coach_id);
        localStorage.setItem(
            "coach",
            JSON.stringify(authenticateCoachData.data[0])
        );

        setLoading(false);
        router.push("/");
    };

    return (
        <>
            <Card elevation={5}>
                <Box
                    style={{
                        width: "90%",
                        margin: "auto",
                        textAlign: "center",
                    }}
                >
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
                    {error?.code === "P2002" || error?.code === "IE0001" ? (
                        <TextField
                            id="accessCode"
                            type={"text"}
                            value={accessCodeValue}
                            label="Access Code"
                            onChange={handleAccessCodeChange}
                        />
                    ) : (
                        <></>
                    )}
                    {error?.code === "P2002" || error?.code === "IE0001" ? (
                        <Button
                            variant="contained"
                            color={"primary"}
                            onClick={() => authenicateCoach()}
                            loadingSettings={{
                                loading,
                            }}
                        >
                            Continue to Survey
                        </Button>
                    ) : (
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
                    )}
                    {error ? (
                        <Alert
                            sx={{ margin: "0 1rem 1rem" }}
                            severity={error.severity}
                        >
                            {error.message}
                        </Alert>
                    ) : (
                        <></>
                    )}
                    {hasConsented && !error ? (
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
            <FullScreenDialog
                open={open}
                handleDialogClickOpen={handleDialogClickOpen}
                handleDialogClose={handleDialogClose}
            >
                <Container>
                    <h1>Hello World</h1>
                    <p>
                        I consent to participate in Perceptions on Athlete
                        Development conducted by Kathryn Robinson. I have
                        understood the nature of this project and wish to
                        participate. I am not waiving any of my legal rights by
                        signing this form.
                    </p>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            handleDialogClose();
                            setHasConsented(true);
                        }}
                    >
                        I consent to participate
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDialogClose();
                            setHasConsented(false);
                        }}
                    >
                        I do not consent to participate
                    </Button>
                </Container>
            </FullScreenDialog>
        </>
    );
};

export default CoachConsentForm;
