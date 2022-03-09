import React from "react";

import SurveyResponseRadio from "../n_cells/SurveyResponseRadio";

import Link from "../../src/Link";
import Button from "../../components/atoms/Button";

const SurveryResponseForm = ({ athleteProfileIndex, handleNextClick }) => {
    return (
        <>
            <SurveyResponseRadio
                title="Likelihood to recruit?"
                label="How likely would you be to recruit this athlete?"
                options={[
                    { label: "Would not recruit", value: 1 },
                    { label: "Not likely to recruit", value: 2 },
                    { label: "Likely to recruit", value: 3 },
                    { label: "Would recruit", value: 4 },
                ]}
            />
            <SurveyResponseRadio
                title="Likelihood to succeed?"
                label="How likely is it that this athlete will be successful?"
                options={[
                    { label: "Will not succeed", value: 1 },
                    { label: "Not likely to succeed", value: 2 },
                    { label: "Likely to succeed", value: 3 },
                    { label: "Will succeed", value: 4 },
                ]}
            />
            {athleteProfileIndex < 2 ? (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleNextClick}
                >
                    Next Athlete
                </Button>
            ) : (
                <Link href="/">
                    <Button variant="contained" color="primary" size="small">
                        Complete Survey
                    </Button>
                </Link>
            )}
        </>
    );
};

export default SurveryResponseForm;
