import React, { useState } from "react";
import { useRouter } from "next/router";

import SurveyResponseRadio from "../n_cells/SurveyResponseRadio";

import Link from "../../src/Link";
import Button from "../atoms/Button";

const SurveyResponseForm = ({
    athleteProfileIndex,
    athletes,
    handleNextClick,
}) => {
    const [loading, setLoading] = useState(false);
    const [likelihoodToRecruit, setLikelihoodToRecruit] = useState(null);
    const [likelihoodToSucceed, setLikelihoodToSucceed] = useState(null);

    const router = useRouter();
    const resetRadioButtons = () => {
        setLikelihoodToRecruit(null);
        setLikelihoodToSucceed(null);
    };

    const submitResponse = async (returnHome) => {
        setLoading(true);
        let coach = JSON.parse(localStorage.getItem("coach"));

        let responseObject = {
            coach_id: coach.coach_id,
            athlete_id: athletes[athleteProfileIndex].athlete_id,
            likelihood_to_recruit: likelihoodToRecruit,
            likelihood_to_succeed: likelihoodToSucceed,
        };

        let createResponseRes = await fetch(`/api/responses/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(responseObject),
        });

        let createResponseData = await createResponseRes.json();

        if (!createResponseData.success) {
            setLoading(false);
            console.log(createResponseData);
            return;
        }

        let updatedCoach = await updateCoach(coach.coach_id);

        if (!updatedCoach.success) {
            setLoading(false);
            console.log(updatedCoach);
            return;
        }

        if (returnHome) return router.push("/");
        resetRadioButtons();
        handleNextClick();
        setLoading(false);
    };

    const updateCoach = async (coachId) => {
        let updateCoachRes = await fetch(`/api/coaches/${coachId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed_responses: athleteProfileIndex + 1,
            }),
        });

        let updateCoachData = await updateCoachRes.json();

        if (!updateCoachData.success) {
            return updateCoachData;
        }

        localStorage.setItem("coach", JSON.stringify(updateCoachData.data));

        return updateCoachData;
    };

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
                value={likelihoodToRecruit}
                setValue={setLikelihoodToRecruit}
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
                value={likelihoodToSucceed}
                setValue={setLikelihoodToSucceed}
            />
            {athleteProfileIndex < athletes.length - 1 ? (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        submitResponse();
                    }}
                    disabled={!likelihoodToRecruit || !likelihoodToSucceed}
                    loadingSettings={{
                        loading,
                    }}
                >
                    Next Athlete
                </Button>
            ) : (
                <Link href="/">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            submitResponse(true);
                        }}
                        disabled={!likelihoodToRecruit || !likelihoodToSucceed}
                    >
                        Complete Survey
                    </Button>
                </Link>
            )}
        </>
    );
};

export default SurveyResponseForm;
