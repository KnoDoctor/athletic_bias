import * as React from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ChipSelection = ({ label, value, setValue, options }) => {
    const handleClick = (clickedValue) => {
        let newValue = [...value];

        if (newValue.indexOf(clickedValue) != -1) {
            return setValue(
                newValue.filter((selections) => selections != clickedValue)
            );
        }

        newValue.push(clickedValue);
        return setValue(newValue);
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
                    <Chip
                        key={option.value}
                        label={option.name}
                        onClick={() => handleClick(option.value)}
                        color="primary"
                        variant={
                            value.indexOf(option.value) != -1
                                ? "filled"
                                : "outlined"
                        }
                    />
                ))}
            </Stack>
        </FormControl>
    );
};

export default ChipSelection;
