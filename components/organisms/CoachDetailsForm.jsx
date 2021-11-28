import { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";
import BasicDatePicker from "../molecules/DatePicker";
import BasicSelect from "../molecules/Select";

import PlacesAutocomplete from "../molecules/PlacesAutocomplete";

export default function CoachDetailsForm({ coachId }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [educationLevel, setEducationLevel] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [cityOfBirth, setCityOfBirth] = useState(null);
    const [cityOfResidence, setCityOfResidence] = useState(null);

    function handleContinueClick(e) {
        e.preventDefault();
        updateCoach();
    }

    const updateCoach = async () => {
        setLoading(true);
        let updateCoachRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/coaches/${coachId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    education_level: educationLevel,
                    date_of_birth: dateOfBirth,
                }),
            }
        );
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
                    textAlign: "center",
                }}
            >
                <h2>Perceptions on Athlete Development</h2>
                <p>{coachId}</p>
                <BasicDatePicker
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
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
                >
                    Next
                </Button>
            </Box>
        </Card>
    );
}
