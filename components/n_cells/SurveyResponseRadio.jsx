import * as React from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { convertToSlug } from "../../utils/helperFunctions";

export default function SurveyResponseRadio({
    title,
    label,
    options,
    value,
    setValue,
}) {
    return (
        <Box>
            <h3>{title}</h3>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                    {label}
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={`${convertToSlug(title)}-radio-buttons-group`}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            label={option.label}
                            control={<Radio />}
                            value={option.value}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
