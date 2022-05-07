import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "../components/atoms/Button";

export default function Index() {
    const router = useRouter();

    const [loading, setLoading] = useState({
        accessToken: false,
        data: false,
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCoachLoading, setIsCoachLoading] = useState(true);
    const [coach, setCoach] = useState(null);
    const [refreshToken, setRefreshToken] = useState("");
    const [idToken, setIdToken] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [posts, setPosts] = useState([]);

    // const fetchAccessToken = async () => {
    //     setLoading({ ...loading, accessToken: true });
    //     let accessTokenRes = await fetch("/api/auth/token", {
    //         method: "GET", // or 'PUT'
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     let accessTokenData = await accessTokenRes.json();

    //     if (!accessTokenData.success) {
    //         setIsLoggedIn(false);
    //         setLoading(false);
    //         localStorage.setItem("loggedIn", false);
    //         console.log("Refresh token invalid.");
    //         return;
    //     }
    //     console.log(accessTokenData);
    //     setRefreshToken(accessTokenData.refreshToken);
    //     localStorage.setItem("refreshToken", accessTokenData.refreshToken);
    //     localStorage.setItem("accessToken", accessTokenData.accessToken);
    //     console.log("Access token received :)");

    //     setLoading({ ...loading, accessToken: false });
    // };

    // const fetchData = async () => {
    //     setLoading({ ...loading, data: true });
    //     let postsRes = await fetch("http://localhost:5000/posts", {
    //         method: "GET", // or 'PUT'
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //         },
    //     });
    //     let postsData = await postsRes;
    //     if (postsData.status === 403) {
    //         console.log("403 - Dancing is forbidden");
    //         setErrorMessage("403 - Dancing is forbidden");
    //         setPosts([]);
    //         setLoading({ ...loading, data: false });
    //         return;
    //     }
    //     let posts = await postsData.json();
    //     console.log(posts);
    //     setPosts(posts);
    //     setErrorMessage(null);

    //     setLoading({ ...loading, data: false });
    // };

    // const logout = async () => {
    //     let logoutRes = await fetch("/api/auth/logout");
    //     let logoutData = await logoutRes.json();
    //     console.log(logoutData);
    //     localStorage.setItem("loggedIn", false);
    //     localStorage.setItem("refreshToken", "");
    //     localStorage.setItem("accessToken", "");
    //     localStorage.setItem("idToken", "");
    //     setIsLoggedIn(false);
    // };

    const getCoachData = async () => {
        setIsCoachLoading(true);
        let coach = JSON.parse(localStorage.getItem("coach"));

        if (coach) {
            let coachRes = await fetch(`/api/coaches/${coach.coach_id}`);
            let coachData = await coachRes.json();

            if (!coachData.success) {
                localStorage.clear();
                setIsCoachLoading(false);
                return;
            }

            localStorage.setItem("coach", JSON.stringify(coachData.data));
            setCoach(coachData.data);
        }
        setIsCoachLoading(false);
    };

    const setExitSurveyComplete = async () => {
        setIsCoachLoading(true);
        let coach = JSON.parse(localStorage.getItem("coach"));

        if (coach) {
            let updateCoachRes = await fetch(`/api/coaches/${coach.coach_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed_exit_survey: true,
                }),
            });

            let updateCoachData = await updateCoachRes.json();

            if (!updateCoachData.success) {
                setLoading(false);
                console.log(updateCoachData);
                return;
            }
            getCoachData();
        }
        setIsCoachLoading(false);
    };

    useEffect(() => {
        getCoachData();
    }, []);

    useEffect(() => {
        if (router.query.surveyCompleted) {
            setExitSurveyComplete();
        }
    }, [router.query]);

    // useEffect(() => {
    //     let payload = parseJwtPayload(idToken);

    //     if (payload) {
    //         setUser(payload);
    //         return;
    //     }

    //     setEmail("");
    // }, [refreshToken, idToken]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <h1 style={{ textAlign: "center" }}>Take Your Pick</h1>
                {isCoachLoading ? (
                    <p style={{ textAlign: "center" }}>Loading...</p>
                ) : (
                    <>
                        {coach ? (
                            <>
                                {coach.current_signup_step === "complete" ? (
                                    <>
                                        {coach.completed_responses < 15 ? (
                                            <>
                                                <p>
                                                    Hi {coach.first_name}, thank
                                                    you for completing your
                                                    profile!
                                                </p>
                                                <p>
                                                    In the second part of this
                                                    survey you will be shown
                                                    fifteen athlete profiles and
                                                    asked for feedback. Imagine
                                                    you have an empty roster you
                                                    are looking to fill and
                                                    consider these athletes as
                                                    if you would be selecting
                                                    them to your team.
                                                </p>
                                                <p>
                                                    So far you have reviewed{" "}
                                                    {coach.completed_responses}{" "}
                                                    out of 15 athlete profiles.
                                                </p>
                                                <Link href="/survey">
                                                    <a
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                        >
                                                            Continue to Athletes
                                                        </Button>
                                                    </a>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                {coach.completed_exit_survey ? (
                                                    <>
                                                        <h2>Thank You!</h2>
                                                        <p>
                                                            Your time and
                                                            insight are very
                                                            much appreciated.
                                                        </p>
                                                        <p>
                                                            Any questions or
                                                            comments, please
                                                            email Katie at{" "}
                                                            <a href="mailto:krobinso@yorku.ca">
                                                                krobinso@yorku.ca
                                                            </a>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>
                                                            You're almost done{" "}
                                                            {coach.first_name}!
                                                        </p>
                                                        <p>
                                                            We just have one
                                                            final request.
                                                            Please take a few
                                                            minutes to complete
                                                            the exit survey
                                                            linked below on your
                                                            experience with Take
                                                            Your Pick. This
                                                            information is
                                                            extremely helpful
                                                            for us to improve
                                                            the selection tool.
                                                        </p>
                                                        <p>Thank you ♥</p>
                                                        <Link
                                                            href={`https://docs.google.com/forms/d/e/1FAIpQLSdOvqlipXubRL2lBUnE-6pOlClLjvacDWKShw7Ian4d3k0E4Q/viewform?usp=pp_url&entry.726004286=${coach.first_name}+${coach.last_name}&entry.959984559=${coach.email}`}
                                                        >
                                                            <a
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                            >
                                                                <Button
                                                                    color={
                                                                        "primary"
                                                                    }
                                                                    variant={
                                                                        "contained"
                                                                    }
                                                                >
                                                                    Exit Survey
                                                                </Button>
                                                            </a>
                                                        </Link>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            Hi {coach.first_name}, we still need
                                            a bit of information from you.
                                            Please complete you coach profile by
                                            clicking below.
                                        </p>
                                        <Link
                                            href={`/coaches/signup/${coach.current_signup_step}`}
                                        >
                                            <a
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    Complete your profile
                                                </Button>
                                            </a>
                                        </Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <p>
                                    Welcome to Take Your Pick, please follow the
                                    link below to get started.
                                </p>
                                <Link href="/coaches/signup/consent">
                                    <a style={{ textDecoration: "none" }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        >
                                            Get Started
                                        </Button>
                                    </a>
                                </Link>
                            </>
                        )}
                    </>
                )}
            </Box>
            {/* <Box sx={{ my: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    style={{ textAlign: "center" }}
                >
                    Accounts
                </Typography>
                {isLoggedIn === "true" ? (
                    <>
                        <p style={{ textAlign: "center" }}>
                            Logged in as {user?.name} {user?.family_name} -{" "}
                            {user?.email}
                        </p>
                        {posts.length > 0 ? (
                            <>
                                <h3 style={{ textAlign: "center" }}>
                                    My Posts
                                </h3>

                                <p style={{ textAlign: "center" }}>
                                    {posts[0].title}
                                </p>
                            </>
                        ) : (
                            <></>
                        )}
                        {errorMessage ? (
                            <>
                                <p style={{ textAlign: "center" }}>
                                    {errorMessage}
                                </p>
                            </>
                        ) : (
                            <></>
                        )}
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        fetchAccessToken();
                                    }}
                                    loadingSettings={{
                                        loading: loading.accessToken,
                                    }}
                                >
                                    Fetch<br></br>Access Token
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={fetchData}
                                    loadingSettings={{
                                        loading: loading.data,
                                    }}
                                >
                                    Fetch<br></br>Data
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link href="/login">
                        <Button variant="contained">Login</Button>
                    </Link>
                )}
            </Box> */}
        </Container>
    );
}
