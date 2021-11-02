import Consent from "../components/templates/Consent";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

import Copyright from "../src/Copyright";

export default function Index() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Consent />
                <Copyright />
            </Box>
        </Container>
    );
}
