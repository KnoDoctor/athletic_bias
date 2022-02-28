import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function LikelihoodToRecruitRadio() {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
                How likely would you be to recruit this athlete?
            </FormLabel>
            <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel
                    label="Would not recruit"
                    control={<Radio />}
                    value="1"
                />
                <FormControlLabel
                    label="Not likely to recruit"
                    control={<Radio />}
                    value="2"
                />
                <FormControlLabel
                    label="Likely to recruit"
                    control={<Radio />}
                    value="3"
                />
                <FormControlLabel
                    label="Would recruit"
                    control={<Radio />}
                    value="4"
                />
            </RadioGroup>
        </FormControl>
    );
}
