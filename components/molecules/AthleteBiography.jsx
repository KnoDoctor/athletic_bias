import React from "react";

import Box from "@mui/material/Box";

const AthleteBiography = ({ biography1, biography2, bias }) => {
    return (
        <Box>
            <h3>Biography</h3>
            <p>{biography1}</p>
            <p style={{ marginBottom: 0 }}>{bias}</p>
        </Box>
    );
};

export default AthleteBiography;
