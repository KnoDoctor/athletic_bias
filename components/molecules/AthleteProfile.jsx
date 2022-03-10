import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const AthleteProfileCard = ({ athletePhoto, athleteName, athletePosition }) => {
    return (
        <Grid container my={3}>
            <Grid item xs={4}>
                <Avatar
                    alt="Remy Sharp"
                    src={athletePhoto}
                    sx={{ width: 128, height: 128 }}
                />
            </Grid>
            <Grid
                item
                style={{
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <h1 style={{ margin: 0 }}>{athleteName}</h1>
                <h3 style={{ margin: 0 }}>{athletePosition}</h3>
            </Grid>
        </Grid>
    );
};

export default AthleteProfileCard;
