import React, { useState, useEffect } from "react";

import { Container, Box } from "@mui/material";

import Survey from "../../components/species/Survey";

const index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [athletes, setAthletes] = useState(null);

    const getAtheletesData = async () => {
        setIsLoading(true);
        let atheletesRes = await fetch(`/api/athletes`);
        let atheletesData = await atheletesRes.json();
        setAthletes(atheletesData.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getAtheletesData();
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Survey athletes={athletes} />
                )}
            </Box>
        </Container>
    );
};

export default index;
