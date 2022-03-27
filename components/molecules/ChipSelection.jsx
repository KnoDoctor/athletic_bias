import * as React from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const ChipSelection = ({ label, value, setValue, options }) => {
    const handleClick = (clickedValue) => {
        let newValue = [...value];

        if (newValue.indexOf(clickedValue) != -1) {
            return setValue(
                newValue.filter((selections) => selections != clickedValue)
            );
        }

        if (newValue.length > 2) return;

        newValue.push(clickedValue);
        return setValue(newValue);
    };

    return (
        <FormControl sx={{ marginTop: "1rem", width: "100%" }}>
            <FormLabel sx={{ textAlign: "left" }}>{label}</FormLabel>
            {/* <Stack
                direction="row"
                spacing={1}
                sx={{ marginTop: "1.333rem", justifyContent: "center" }}
            > */}
            <Grid
                container
                style={{ justifyContent: "center", margin: "1rem 0 0" }}
            >
                {options
                    .sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    })
                    .map((option) => (
                        <Grid item key={option.value}>
                            <Chip
                                // key={option.value}
                                sx={{ margin: "0.2rem" }}
                                label={option.name}
                                onClick={() => handleClick(option.value)}
                                color="primary"
                                variant={
                                    value.indexOf(option.value) != -1
                                        ? "filled"
                                        : "outlined"
                                }
                            />
                        </Grid>
                    ))}
            </Grid>
            {/* </Stack> */}
        </FormControl>
    );
};

export default ChipSelection;
