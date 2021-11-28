import Link from "next/link";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Button from "../components/atoms/Button";

export default function Index() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <h1 style={{ textAlign: "center" }}>Welcome!</h1>
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
            </Box>
        </Container>
    );
}
