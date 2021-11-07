import React, { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";

import Button from "../atoms/Button";
import TextField from "../atoms/TextInput";
import FullScreenDialog from "../molecules/FullScreenDialog";

const CoachConsentForm = ({ setCoachId }) => {
    const router = useRouter();

    const [firstNameValue, setFirstNameValue] = useState(null);
    const [lastNameValue, setLastNameValue] = useState(null);
    const [emailValue, setEmailValue] = useState(null);
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
                method: "POST",
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

        setCoachId(createCoachData.data.coach_id);

        setLoading(false);
        router.push("/coaches/signup/details");
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
                                Consent Form
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
