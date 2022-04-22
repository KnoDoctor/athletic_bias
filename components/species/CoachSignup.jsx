import React, { useEffect, useState } from "react";
import CoachDetailsForm from "../organisms/CoachDetailsForm";
import CoachConsentForm from "../organisms/CoachConsentForm";
import CoachPreferencesForm from "../organisms/CoachPreferencesForm";

const CoachSignup = ({ step }) => {
    const [coachId, setCoachId] = useState(null);

    useEffect(() => {
        setCoachId(JSON.parse(localStorage.getItem("coach"))?.coach_id || null);
    }, []);

    const signUpStepRouter = (step) => {
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
