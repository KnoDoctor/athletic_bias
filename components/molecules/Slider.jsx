import { useState } from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import MUISlider from "@mui/material/Slider";

export default function Slider({ label, value, setValue, options }) {
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <FormControl sx={{ marginTop: "1rem", width: "100%" }}>
            <FormLabel sx={{ textAlign: "left" }}>{label}</FormLabel>
            <h4 style={{ marginBottom: 0 }}>
                Striver {50 - value}% | {50 + value}% Natural
            </h4>
            <MUISlider
                value={value}
                onChange={handleSliderChange}
                min={-50}
                max={50}
                // defaultValue={0}
                aria-label="Default"
                track={false}
                //    valueLabelDisplay="auto"
            />
        </FormControl>
    );
}
