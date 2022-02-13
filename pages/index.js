import { useState, useEffect } from "react";

import Link from "next/link";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "../components/atoms/Button";

export default function Index() {
    const [loading, setLoading] = useState({
        accessToken: false,
        data: false,
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [coach, setCoach] = useState(null);
    const [refreshToken, setRefreshToken] = useState("");
    const [idToken, setIdToken] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [posts, setPosts] = useState([]);

    console.log(coach);

    const fetchAccessToken = async () => {
        setLoading({ ...loading, accessToken: true });
        let accessTokenRes = await fetch("/api/auth/token", {
            method: "GET", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        });
        let accessTokenData = await accessTokenRes.json();

        if (!accessTokenData.success) {
            setIsLoggedIn(false);
            setLoading(false);
            localStorage.setItem("loggedIn", false);
            console.log("Refresh token invalid.");
            return;
        }
        console.log(accessTokenData);
        setRefreshToken(accessTokenData.refreshToken);
        localStorage.setItem("refreshToken", accessTokenData.refreshToken);
        localStorage.setItem("accessToken", accessTokenData.accessToken);
        console.log("Access token received :)");

        setLoading({ ...loading, accessToken: false });
    };

    const fetchData = async () => {
        setLoading({ ...loading, data: true });
        let postsRes = await fetch("http://localhost:5000/posts", {
            method: "GET", // or 'PUT'
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        let postsData = await postsRes;
        if (postsData.status === 403) {
            console.log("403 - Dancing is forbidden");
            setErrorMessage("403 - Dancing is forbidden");
            setPosts([]);
            setLoading({ ...loading, data: false });
            return;
        }
        let posts = await postsData.json();
        console.log(posts);
        setPosts(posts);
        setErrorMessage(null);

        setLoading({ ...loading, data: false });
    };

    const logout = async () => {
        let logoutRes = await fetch("/api/auth/logout");
        let logoutData = await logoutRes.json();
        console.log(logoutData);
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("refreshToken", "");
        localStorage.setItem("accessToken", "");
        localStorage.setItem("idToken", "");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("loggedIn"));
        setCoach(JSON.parse(localStorage.getItem("coach")));
    }, []);

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
                <h1 style={{ textAlign: "center" }}>
                    {coach ? `Welcome, ${coach.first_name}!` : "Welcome!"}
                </h1>
                {coach ? (
                    <Link href="/surveys">
                        <a style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                Complete Another Survey
                            </Button>
                        </a>
                    </Link>
                ) : (
                    <Link href="/coaches/signup/consent">
                        <a style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                Click Me
                            </Button>
                        </a>
                    </Link>
                )}
            </Box>
            <Box sx={{ my: 4 }}>
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
            </Box>
        </Container>
    );
}
