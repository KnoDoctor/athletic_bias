import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function Copyright() {
    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
                <MuiLink color="inherit" href="/">
                    Your Website
                </MuiLink>{" "}
                {new Date().getFullYear()}.
            </Typography>
        </Box>
    );
}
