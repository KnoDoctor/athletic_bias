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

export default function AthleteOverview() {
    return (
        <List sx={style} aria-label="mailbox folders">
            <Divider />
            <ListItem button>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>Club Name:</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>Tokyo Drifters</p>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            <ListItem button>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>Matches:</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>67</p>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            <ListItem button>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>Age:</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>18</p>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            <ListItem button>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>Height:</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>182 cm</p>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
            <ListItem button>
                <Grid container>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>Weight:</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p style={{ margin: 0 }}>78 kg</p>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </List>
    );
}
