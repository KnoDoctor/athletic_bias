import React from "react";

import Box from "@mui/material/Box";

const AthleteBiography = ({ bio }) => {
    return (
        <Box>
            <h3>Biography</h3>
            {bio ? (
                bio.map((paragraph, i, arr) => (
                    <p style={i + 1 == arr.length ? { marginBottom: 0 } : null}>
                        {paragraph}
                    </p>
                ))
            ) : (
                <></>
            )}
        </Box>
    );
};

export default AthleteBiography;
