import React from "react";

import AthleteProfile from "../molecules/AthleteProfile";
import AthleteDetails from "../molecules/AthleteDetails";
import AthleteBiography from "../molecules/AthleteBiography";
import AthleteStats from "../molecules/AthleteStats";

const SurveyAthleteOverview = ({ athlete }) => {
    let isControl = JSON.parse(localStorage.getItem("coach")).is_control;

    const athleteStatsArray = [
        {
            name: "Vertical Jump",
            value: parseFloat(athlete.rugby_stat.vertical_jump).toFixed(2),
            mean: parseFloat(
                athlete.rugby_stat.vertical_jump_group_mean
            ).toFixed(2),
            units: "cm",
            negativeBeatsMean: false,
        },
        {
            name: "Mid Thigh Pull",
            value: parseFloat(athlete.rugby_stat.mid_thigh_pull).toFixed(2),
            mean: parseFloat(
                athlete.rugby_stat.mid_thigh_pull_group_mean
            ).toFixed(2),
            units: "kg",
            negativeBeatsMean: false,
        },
        {
            name: "Relative Mid Thigh Pull",
            value: parseFloat(
                athlete.rugby_stat.relative_mid_thigh_pull
            ).toFixed(2),
            mean: parseFloat(
                athlete.rugby_stat.relative_mid_thigh_pull_group_mean
            ).toFixed(2),
            units: "",
            negativeBeatsMean: false,
        },
        {
            name: "10m Sprint Time",
            value: parseFloat(athlete.rugby_stat.ten_meter_sprint).toFixed(2),
            mean: parseFloat(
                athlete.rugby_stat.ten_meter_sprint_group_mean
            ).toFixed(2),
            units: "s",
            negativeBeatsMean: true,
        },
        {
            name: "505 Left",
            value: parseFloat(athlete.rugby_stat.five_o_five_left).toFixed(2),
            mean: parseFloat(
                athlete.rugby_stat.five_o_five_left_group_mean
            ).toFixed(2),
            units: "s",
            negativeBeatsMean: true,
        },
        {
            name: "505 Right",
            value: parseFloat(athlete.rugby_stat.five_o_five_right).toFixed(2),
            mean: parseFloat(
                athlete.rugby_stat.five_o_five_right_group_mean
            ).toFixed(2),
            units: "s",
            negativeBeatsMean: true,
        },
        {
            name: "Aggregate 505",
            value: parseFloat(athlete.rugby_stat.five_o_five_aggregate).toFixed(
                2
            ),
            mean: parseFloat(
                athlete.rugby_stat.five_o_five_aggregate_group_mean
            ).toFixed(2),
            units: "s",
            negativeBeatsMean: true,
        },
    ];

    return (
        <>
            <AthleteProfile
                athleteName={`${athlete.first_name} ${athlete.last_name}`}
                athletePhoto={athlete.photo_url}
                athletePosition={athlete.rugby_stat.position}
            />
            <AthleteDetails
                athleteAge={Math.floor(athlete.rugby_stat.age)}
                athleteHeight={athlete.rugby_stat.height}
                athleteSittingHeight={athlete.rugby_stat.sitting_height}
                athleteWeight={athlete.rugby_stat.weight}
            />
            <AthleteBiography
                biography1={athlete.biography_1}
                bias={isControl ? "" : athlete.bias.bias_statement}
                biography2={athlete.biography_2}
            />
            <AthleteStats stats={athleteStatsArray} />
        </>
    );
};

export default SurveyAthleteOverview;
