import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const style = {
    width: "100%",
    bgcolor: "background.paper",
};

export default function AthleteStats({ stats }) {
    const calcColor = (stat) => {
        let groupMeanVariance = (stat.value - stat.mean).toFixed(2);

        if (stat.negativeBeatsMean && groupMeanVariance <= 0) {
            return "green";
        }
        if (stat.negativeBeatsMean && groupMeanVariance > 0) {
            return "red";
        }
        if (groupMeanVariance >= 0) {
            return "green";
        }
        if (groupMeanVariance < 0) {
            return "red";
        }
    };

    return (
        <List sx={style} aria-label="mailbox folders">
            <h3>Athlete Stats</h3>
            <ListItem button>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ margin: 0, fontWeight: "600" }}>Drill</p>
                    </Grid>
                    <Grid item xs={3}>
                        <p style={{ margin: 0, fontWeight: "600" }}>Value</p>
                    </Grid>
                    <Grid item xs={3}>
                        <p style={{ margin: 0, fontWeight: "600" }}>
                            Group Variance
                        </p>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            {stats ? (
                stats.map((stat, i, arr) => (
                    <>
                        <ListItem button>
                            <Grid container>
                                <Grid item xs={6}>
                                    <p style={{ margin: 0 }}>{stat.name}</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <p style={{ margin: 0 }}>
                                        {stat.value} {stat.units}
                                    </p>
                                </Grid>
                                <Grid item xs={3}>
                                    <p
                                        style={{
                                            margin: 0,
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: calcColor(stat),
                                            }}
                                        >
                                            {(stat.value - stat.mean).toFixed(
                                                2
                                            ) < 0
                                                ? ""
                                                : "+"}
                                            {(stat.value - stat.mean).toFixed(
                                                2
                                            )}{" "}
                                            {stat.units}
                                        </span>
                                        {/* <em style={{ fontSize: "14px" }}>
                                            ({stat.mean})
                                        </em> */}
                                    </p>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                    </>
                ))
            ) : (
                <></>
            )}
        </List>
    );
}
