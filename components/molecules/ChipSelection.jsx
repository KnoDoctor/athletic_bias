import * as React from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ChipSelection = ({ label, options }) => {
    const handleClick = () => {
        console.info("You clicked the Chip.");
    };

    return (
        <FormControl sx={{ marginTop: "1rem", width: "100%" }}>
            <FormLabel sx={{ textAlign: "left" }}>{label}</FormLabel>
            <Stack
                direction="row"
                spacing={1}
                sx={{ marginTop: "1.333rem", justifyContent: "center" }}
            >
                {options.map((option) => (
                    <Chip label={option.name} onClick={handleClick} />
                ))}
            </Stack>
        </FormControl>
    );
};

export default ChipSelection;
