import { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import Button from "../atoms/Button";
import TextField from "../atoms/TextInput";
import RadioButtons from "../molecules/RadioButtons";
import BasicSelect from "../molecules/Select";

import PlacesAutocomplete from "../molecules/PlacesAutocomplete";

export default function CoachDetailsForm({ coachId }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [yearsOfExperience, setYearsOfExperience] = useState(null);
    const [levelOfExperience, setLevelOfExperience] = useState(null);
    const [highestLevelCoached, setHighestLevelCoached] = useState(null);
    const [currentlyCoaching, setCurrentlyCoaching] = useState(null);
    const [lastAgeCoached, setLastAgeCoached] = useState(null);
    const [educationLevel, setEducationLevel] = useState(null);
    const [genderIdentity, setGenderIdentity] = useState(null);
    const [cityOfBirth, setCityOfBirth] = useState(null);
    const [cityOfResidence, setCityOfResidence] = useState(null);

    function handleContinueClick(e) {
        e.preventDefault();
        updateCoach();
    }

    function handleYearsOfExperienceChange(e) {
        setYearsOfExperience(parseInt(e.target.value));
    }

    function handleLastAgeCoachedChange(e) {
        setLastAgeCoached(parseInt(e.target.value));
    }

    const isDetailsFormIncomplete = () => {
        if (!yearsOfExperience) return true;
        if (!levelOfExperience) return true;
        // if (!highestLevelCoached) return true;
        if (currentlyCoaching === null) return true;
        if (!lastAgeCoached) return true;
        if (!educationLevel) return true;
        if (!genderIdentity) return true;
        if (!cityOfBirth) return true;
        if (!cityOfResidence) return true;

        return false;
    };

    const updateCoach = async () => {
        setLoading(true);
        let updateCoachRes = await fetch(`/api/coaches/${coachId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                level_of_experience: levelOfExperience,
                years_of_experience: yearsOfExperience,
                highest_level_coached: highestLevelCoached,
                currently_coaching: currentlyCoaching,
                last_age_coached: lastAgeCoached,
                education_level: educationLevel,
                city_of_birth: cityOfBirth.description,
                city_of_residence: cityOfResidence.description,
                gender_identity: genderIdentity,
                current_signup_step: "preferences",
            }),
        });
        let updateCoachData = await updateCoachRes.json();

        if (!updateCoachData.success) {
            setLoading(false);
            console.log(updateCoachData);
            return;
        }

        setLoading(false);
        router.push("/coaches/signup/preferences");
    };

    return (
        <Card elevation={5}>
            <Box
                style={{
                    width: "90%",
                    margin: "auto",
                }}
            >
                <h2 style={{ marginBottom: 0, textAlign: "center" }}>
                    Complete Your Profile
                </h2>
                <h4 style={{ marginTop: 0, textAlign: "center" }}>2 of 3</h4>
                {/* <p>{coachId}</p> */}
                <h3
                    style={{
                        marginBottom: 0,
                    }}
                >
                    Tell us a bit about your experience:
                </h3>
                <RadioButtons
                    label={`How would you rank your skill level as a coach/admin/scout?`}
                    value={levelOfExperience}
                    setValue={setLevelOfExperience}
                    options={[
                        { name: "Novice", value: "Novice" },
                        { name: "Competent", value: "Competent" },
                        { name: "Proficient", value: "Proficient" },
                        { name: "Expert", value: "Expert" },
                    ]}
                />
                <TextField
                    label="How many years of experience do you have?"
                    id="yearsOfExperience"
                    type={"number"}
                    value={yearsOfExperience}
                    onChange={handleYearsOfExperienceChange}
                />
                <BasicSelect
                    label="Are you currently in a coaching/admin/scouting position?"
                    value={currentlyCoaching}
                    setValue={setCurrentlyCoaching}
                    options={[
                        { name: "Yes", value: true },
                        { name: "No", value: false },
                    ]}
                />
                {/* <BasicSelect
                    label="Highest level of athlete you have coached?"
                    value={highestLevelCoached}
                    setValue={setHighestLevelCoached}
                    options={[
                        { name: "Local", value: "Local" },
                        { name: "Regional", value: "Regional" },
                        { name: "National", value: "National" },
                        { name: "International", value: "International" },
                    ]}
                /> */}
                <TextField
                    id="lastAgeCoached"
                    type={"number"}
                    value={lastAgeCoached}
                    label={
                        currentlyCoaching
                            ? "What age are the athletes you work with?"
                            : "What age were the athletes you worked with?"
                    }
                    onChange={handleLastAgeCoachedChange}
                />
                <h3
                    style={{
                        marginBottom: 0,
                    }}
                >
                    Tell us a bit about you:
                </h3>
                <BasicSelect
                    label="How do you identify?"
                    value={genderIdentity}
                    setValue={setGenderIdentity}
                    options={[
                        { name: "Male", value: "Male" },
                        { name: "Female", value: "Female" },
                        {
                            name: "Prefer Not To Say",
                            value: "Prefer Not To Say",
                        },
                    ]}
                />
                <BasicSelect
                    label="Highest level of education achieved?"
                    value={educationLevel}
                    setValue={setEducationLevel}
                    options={[
                        { name: "High School", value: "High School" },
                        { name: "Undergraduate", value: "Undergraduate" },
                        { name: "Graduate", value: "Graduate" },
                        { name: "Doctorate", value: "Doctorate" },
                    ]}
                />
                <PlacesAutocomplete
                    label="What city/ town did you grow up in?"
                    value={cityOfBirth}
                    setValue={setCityOfBirth}
                />
                <PlacesAutocomplete
                    label="What city/ town do you currently reside in?"
                    value={cityOfResidence}
                    setValue={setCityOfResidence}
                />

                <Button
                    variant="contained"
                    color={"primary"}
                    onClick={handleContinueClick}
                    loadingSettings={{
                        loading,
                    }}
                    disabled={isDetailsFormIncomplete()}
                >
                    Next
                </Button>
            </Box>
        </Card>
    );
}
