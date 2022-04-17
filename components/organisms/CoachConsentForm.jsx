import React, { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import Button from "../atoms/Button";
import TextField from "../atoms/TextInput";
import FullScreenDialog from "../molecules/FullScreenDialog";
import BasicDatePicker from "../molecules/DatePicker";

const CoachConsentForm = ({ setCoachId }) => {
    const router = useRouter();

    const [firstNameValue, setFirstNameValue] = useState(null);
    const [lastNameValue, setLastNameValue] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
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

    const isConsentFormIncomplete = () => {
        if (!firstNameValue) return true;
        if (!lastNameValue) return true;
        if (!emailValue) return true;
        if (!dateOfBirth) return true;

        return false;
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

        const generateAccessCode = () => {
            let firstInitial = firstNameValue[0];
            let lastInitial = lastNameValue[0];

            let date = dateOfBirth.toISOString().split("T")[0];

            let month = date.split("-")[1];
            let day = date.split("-")[2];

            return firstInitial + lastInitial + month + day;
        };

        let createCoachRes = await fetch(`/api/coaches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue.toLowerCase(),
                first_name: firstNameValue,
                last_name: lastNameValue,
                date_of_birth: dateOfBirth,
                access_code: generateAccessCode(),
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
                        id="email"
                        type={"text"}
                        value={emailValue}
                        label="Email"
                        onChange={handleEmailChange}
                    />
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
                    <BasicDatePicker
                        value={dateOfBirth}
                        setValue={setDateOfBirth}
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
                            disabled={isConsentFormIncomplete()}
                        >
                            {hasConsented
                                ? "Complete Your Profile"
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
                    <h1>Virtual Informed Consent Form</h1>
                    <p>
                        <strong>Study Name:</strong> Understanding talent in
                        sport: Perceptions on Athlete Development
                    </p>
                    <p>
                        <strong>Principal Investigator:</strong> Kathryn
                        Robinson, PhD (Candidate) School of Kinesiology and
                        Health Science, York University, Tait McKenzie Building,
                        Room 317, 416-736 2100 x22224, krobinso@yorku.ca
                    </p>
                    <p>
                        <strong>Co-Investigator:</strong> Dr. Joseph Baker,
                        Professor, School of Kinesiology and Health Science,
                        York University, Norman Bethune College, Room 338
                        416.736.2100 x22361, bakerj@yorku.ca
                    </p>
                    <p>
                        <strong>Purpose of the Research:</strong> If you choose
                        to participate in Phase 1 of this study, you will be
                        invited to complete a questionnaire lasting
                        approximately 15-20 minutes. This questionnaire collects
                        background information (age, country, sex, education,
                        relationship to sport, years and level of
                        participation), along with your beliefs about athlete
                        development (key characteristics, ranking of importance
                        of those characteristics etc.). Last, you will be asked
                        to take part in a short selection exercise where you
                        will have to choose between two athletes.
                    </p>
                    <p>
                        You will also be invited to complete a follow up
                        questionnaire 1-2 months after completion of the first
                        survey. If you would like to participate in the follow
                        up, an email address will be needed for correspondence.
                        This email will be used only for the purposes of
                        correspondence and not for any other means. With your
                        ongoing consent at the follow up, the questionnaire will
                        take approximately 15 minutes.
                    </p>
                    <p>
                        As noted, this project will employ on-going consent
                        after each phase so that you can choose to participate
                        or withdraw from the study before the next phase. Please
                        note that the ‘identifiable’ information you provide
                        (i.e., email address), will be used for the data
                        collection portion of this study, and not when reporting
                        our findings.
                    </p>
                    <p>
                        <strong>Risks and Discomforts:</strong> There are no
                        anticipated risks associated with this study. However,
                        if any question makes you uncomfortable or embarrassed
                        in any way, you may decline to answer. If at any time
                        during the questionnaire you would like to stop, you are
                        able to exit the webpage and discontinue the
                        questionnaire.
                    </p>
                    <p>
                        <strong>
                            Benefits of the Research and Benefits to You:
                        </strong>{" "}
                        There are no direct benefits to you, however, the
                        information you provide will advance our understanding
                        of athlete development is understood. This will further
                        contribute to the advancement of academic knowledge and
                        applied practice in the area.
                    </p>
                    <p>
                        <strong>Voluntary Participation:</strong> Your
                        participation in the study is completely voluntary and
                        you may choose to stop participating at any time and
                        during any phase of the project. Your decision not to
                        volunteer will not influence the nature of your
                        relationship with York University or the researchers
                        either now, or in the future. Please note that by
                        choosing not to participate in the study it will not
                        result in a penalty or repercussion.
                    </p>
                    <p>
                        <strong>Withdrawal from the Study:</strong> You can stop
                        participating in the study at any time (i.e., before or
                        during any phase), for any reason, if you so decide.
                        Your decision to stop participating will not affect your
                        relationship with the researchers or York University,
                        associated with this project. In the event you withdraw
                        from the study, all data collected will be immediately
                        destroyed where possible. Should you wish to withdraw
                        after the study, you will have the option to also
                        withdraw your data up until the analysis is complete.
                    </p>
                    <p>
                        <strong>Confidentiality:</strong> Unless you choose
                        otherwise your questionnaire responses and all
                        information you supply during the research will be held
                        in confidence. Your name will not appear in any report
                        or publication of the research. Your data from the
                        questionnaires will be safely stored on a password
                        protected computer and only the researchers (primary
                        investigator and her supervisor) will have access to
                        this information. The data will be stored for 7 years on
                        the password protected and file protected computer and
                        then data will be destroyed by April 2028.
                        Confidentiality will be provided to the fullest extent
                        possible by law.
                    </p>
                    <p>
                        The data collected in this research project may be used
                        by members of the research team (Dr. Baker, Katie
                        Robinson) in subsequent research investigations
                        exploring similar lines of inquiry. Such projects will
                        still undergo ethics review by the Human Participants
                        Research Committee, our institutional research ethics
                        board. Any secondary use of data by the research team
                        will be treated with the same degree of confidentiality
                        as in the original research project.
                    </p>
                    <p>
                        The researcher(s) acknowledge that the host of the
                        online survey may automatically collect participant data
                        without their knowledge (i.e., IP addresses.) Although
                        this information may be provided or made accessible to
                        the researchers, it will not be used or saved without
                        participant’s consent on the researcher’s system.
                        Because this project employs e-based collection
                        techniques, data may be subject to access by third
                        parties as a result of various security legislation now
                        in place in many countries and thus the confidentiality
                        and privacy of data cannot be guaranteed during
                        web-based transmission.
                    </p>
                    <p>
                        <strong>Questions About the Research?</strong> If you
                        have questions about the research in general or about
                        your role in the study, please feel free to contact
                        Kathryn Robinson by e-mail at krobinso@yorku.ca or my
                        supervisor Dr. Joe Baker at bakerj@yorku.ca
                        Additionally, the contact information for the
                        Kinesiology Graduate Department is as follows: 4700
                        Keele Street, 341 Bethune College, to reach the graduate
                        program assistant, please call (416) 736 2100 xt 33208.
                    </p>
                    <p>
                        This research has been reviewed and approved by the
                        Human Participants Review Sub- Committee, York
                        University’s Ethics Review Board and conforms to the
                        standards of the Canadian Tri-Council Research Ethics
                        guidelines. If you have any questions about this
                        process, or about your rights as a participant in the
                        study, please contact the Sr. Manager & Policy Advisor
                        for the Office of Research Ethics, 5th Floor, York
                        Research Tower, York University (telephone 416-736-5914
                        or e-mail ore@yorku.ca).
                    </p>
                    <p>
                        This research has received ethics review and approval by
                        the Delegated Ethics Review Committee, which is
                        delegated authority to review research ethics protocols
                        by the Human Participants Review Sub-Committee, York
                        University’s Ethics Review Board, and conforms to the
                        standards of the Canadian Tri-Council Research Ethics
                        guidelines. If you have any questions about this
                        process, or about your rights as a participant in the
                        study, please contact the Sr. Manager & Policy Advisor
                        for the Office of Research Ethics, 5th Floor, Kaneff
                        Tower, York University (telephone 416-736-5914 or e-mail
                        ore@yorku.ca).
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
