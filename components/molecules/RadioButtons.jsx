import React from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

const RadioButtons = ({ label, value, setValue, options }) => {
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl sx={{ marginTop: "1rem", width: "100%" }}>
            <FormLabel sx={{ textAlign: "left" }}>{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        label={option.name}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtons;
