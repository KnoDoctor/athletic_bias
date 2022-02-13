import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import Button from "../atoms/Button";
import BasicSelect from "../molecules/Select";
import RadioButtons from "../molecules/RadioButtons";
import Slider from "../molecules/Slider";

import PlacesAutocomplete from "../molecules/PlacesAutocomplete";
import ChipSelection from "../molecules/ChipSelection";

export default function CoachPreferencesForm({ coachId }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [sportsOptions, setSportsOptions] = useState(null);
    const [sportPreferences, setSportPreferences] = useState(null);
    const [selectedSport, setSelectedSport] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [hardWorkPreference, setHardWorkPreference] = useState(null);
    const [naturalPreference, setNaturalPreference] = useState(null);
    const [talentPreference, setTalentPreference] = useState(null);
    // const [genderIdentity, setGenderIdentity] = useState(null);
    // const [dateOfBirth, setDateOfBirth] = useState(null);
    // const [cityOfBirth, setCityOfBirth] = useState(null);
    // const [cityOfResidence, setCityOfResidence] = useState(null);

    function handleContinueClick(e) {
        e.preventDefault();
        updateCoach();
    }

    const getSportsOptions = async () => {
        let sportsRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/sports`
        );

        let sports = await sportsRes.json();

        let sportsOptions = sports.data.map((sport) => {
            return {
                name: sport.name,
                value: sport.sport_id,
            };
        });

        setSportsOptions(sportsOptions);
    };

    const getSportPreferences = async () => {
        if (!selectedSport) return;
        let preferencesRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/preferences/sport/${selectedSport}`
        );

        let preferences = await preferencesRes.json();

        let preferencesOptions = preferences.data.map((preference) => {
            return {
                name: preference.name,
                value: preference.preference_id,
            };
        });

        setSportPreferences(preferencesOptions);
    };

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
                    city_of_birth: cityOfBirth.description,
                    city_of_residence: cityOfResidence.description,
                    gender_identity: genderIdentity,
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

    useEffect(() => {
        getSportsOptions();
    }, []);

    useEffect(() => {
        getSportPreferences();
    }, [selectedSport]);

    useEffect(() => {
        setHardWorkPreference(50 - sliderValue);
        setNaturalPreference(50 + sliderValue);
    }, [sliderValue]);

    console.log(sportPreferences);
    console.log(hardWorkPreference);
    console.log(naturalPreference);

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
                <BasicSelect
                    label="What is your primary sport of expertise?"
                    value={selectedSport}
                    setValue={setSelectedSport}
                    options={sportsOptions}
                />
                {sportPreferences ? (
                    <>
                        <ChipSelection
                            label={`Please select the characteristics that an athlete in your sport of expertise needs to have to be sucessful.`}
                            options={sportPreferences}
                        />
                        <Slider
                            label={`If you had to choose between selecting a player that was known to be a 'naturally talented' athlete or known to be a 'hard worker', what would be your preference?`}
                            value={sliderValue}
                            setValue={setSliderValue}
                        />
                    </>
                ) : (
                    <></>
                )}
                {/* <RadioButtons
                    label={`If you had to choose between selecting a player that was known to be a 'naturally talented' athlete or known to be a 'hard worker', what would be your preference?`}
                    value={talentPreference}
                    setValue={setTalentPreference}
                    options={[
                        { name: "Hard Work", value: "Hard Work" },
                        { name: "Natural Talent", value: "Natural Talent" },
                    ]}
                /> */}
                <Button
                    variant="contained"
                    color={"primary"}
                    onClick={handleContinueClick}
                    loadingSettings={{
                        loading,
                    }}
                >
                    Complete Your Profile
                </Button>
            </Box>
        </Card>
    );
}
