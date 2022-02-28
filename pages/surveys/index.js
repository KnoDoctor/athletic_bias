import React from "react";

import { Container, Box } from "@mui/material";

import Survey from "../../components/species/Survey";

const index = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Survey />
            </Box>
        </Container>
    );
};

export default index;
