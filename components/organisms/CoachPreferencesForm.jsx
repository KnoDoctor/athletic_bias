import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import Button from "../atoms/Button";
import BasicSelect from "../molecules/Select";
import RadioButtons from "../molecules/RadioButtons";
import Slider from "../molecules/Slider";
import ChipSelection from "../molecules/ChipSelection";

export default function CoachPreferencesForm({ coachId }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [sportsOptions, setSportsOptions] = useState(null);
    const [selectedSport, setSelectedSport] = useState("");
    const [sportPreferences, setSportPreferences] = useState(null);
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [sliderValue, setSliderValue] = useState(0);
    const [hardWorkPreference, setHardWorkPreference] = useState(null);
    const [naturalPreference, setNaturalPreference] = useState(null);
    const [talentPreference, setTalentPreference] = useState(null);

    function handleContinueClick(e) {
        e.preventDefault();
        updateCoach();
    }

    const getSportsOptions = async () => {
        let sportsRes = await fetch(`/api/sports`);

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
            `/api/preferences/sport/${selectedSport}`
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
        let updateCoachRes = await fetch(`/api/coaches/${coachId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sport_id: selectedSport,
                hard_work_pref: hardWorkPreference,
                natural_pref: naturalPreference,
                preferences: selectedPreferences.map((preference) => ({
                    preference_id: preference,
                })),
            }),
        });
        let updateCoachData = await updateCoachRes.json();

        if (!updateCoachData.success) {
            setLoading(false);
            console.log(updateCoachData);
            return;
        }
        localStorage.setItem("coach", JSON.stringify(updateCoachData.data));
        setLoading(false);
        router.push("/");
    };

    useEffect(() => {
        getSportsOptions();
    }, []);

    useEffect(() => {
        getSportPreferences();
        setSelectedPreferences([]);
    }, [selectedSport]);

    useEffect(() => {
        setHardWorkPreference(50 - sliderValue);
        setNaturalPreference(50 + sliderValue);
    }, [sliderValue]);

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
                            label={`In your opinion, what are the 3 most important attributes of talent in your sport?`}
                            value={selectedPreferences}
                            setValue={setSelectedPreferences}
                            options={sportPreferences}
                        />
                        <Slider
                            label={`If you had to choose between selecting a player that was known to be a 'natural' or a 'striver/hard worker', what would be your preference?`}
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
