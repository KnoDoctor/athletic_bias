import React, { useState } from "react";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";

import LoginForm from "../components/organisms/LoginForm";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Login() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <LoginForm />
                <Copyright />
            </Box>
        </Container>
    );
}
