import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
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
                    <Grid
                        item
                        xs={6}
                        style={{ display: "flex", alignItems: "end" }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "600",
                            }}
                        >
                            Drill
                        </p>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", alignItems: "end" }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "600",
                            }}
                        >
                            Value
                        </p>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", alignItems: "end" }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "600",
                            }}
                        >
                            Compared to Group Average*
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
            <Grid container style={{ paddingTop: "1rem" }}>
                <Grid item xs={12}>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                        <em>
                            *{" "}
                            <span
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Green highlighting
                            </span>{" "}
                            indicates the athlete performed{" "}
                            <span
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                better
                            </span>{" "}
                            than the group average while{" "}
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                red highlighting
                            </span>{" "}
                            indicates the athlete performed{" "}
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                worse
                            </span>{" "}
                            than the group average.
                        </em>
                    </p>
                </Grid>
            </Grid>
        </List>
    );
}
