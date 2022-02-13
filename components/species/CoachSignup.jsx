import React, { useState } from "react";
import CoachDetailsForm from "../organisms/CoachDetailsForm";
import CoachConsentForm from "../organisms/CoachConsentForm";
import CoachPreferencesForm from "../organisms/CoachPreferencesForm";

const CoachSignup = ({ step }) => {
    const [coachId, setCoachId] = useState(null);

    const signUpStepRouter = (step) => {
        console.log(step);
        switch (step) {
            case "consent":
                return <CoachConsentForm setCoachId={setCoachId} />;
            case "details":
                return <CoachDetailsForm coachId={coachId} />;
            case "preferences":
                return <CoachPreferencesForm coachId={coachId} />;

            default:
                return (
                    <div>
                        <h2>Uh Oh</h2>
                    </div>
                );
        }
    };
    return <div>{step ? signUpStepRouter(step) : "Loading"}</div>;
};

export default CoachSignup;
