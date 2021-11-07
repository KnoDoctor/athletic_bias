import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import CoachSignup from "../../../components/species/CoachSignup";

export default function Index() {
    const router = useRouter();
    const [step, setStep] = useState(router.query.step);

    useEffect(() => {
        setStep(router.query.step);
    }, [router.query]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <CoachSignup step={step} />
            </Box>
        </Container>
    );
}
