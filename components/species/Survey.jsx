import React from "react";
import Image from "next/image";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";

import Link from "../../src/Link";
import Button from "../../components/atoms/Button";
import AthleteOverview from "../n_cells/AthleteOverview";
import LikelihoodToRecruitRadio from "../n_cells/LikelihoodToRecruitRadio";

const Survey = () => {
    return (
        <Card elevation={5}>
            {/* <div
                style={{ width: "100%", height: "25vh", position: "relative" }}
            >
                <Image
                    src="/images/hero-images/soccer-player.jpg"
                    alt="me"
                    layout="fill"
                    objectFit="cover"
                />
            </div> */}
            <Box
                style={{
                    width: "90%",
                    margin: "1rem auto",
                }}
            >
                <Grid container my={3}>
                    <Grid item xs={4}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/images/profile-pictures/soccer-player-1.jpg"
                            sx={{ width: 128, height: 128 }}
                        />
                    </Grid>
                    <Grid item>
                        <h2 style={{ margin: 0 }}>Jimmy Athlete</h2>
                        <h4 style={{ margin: 0 }}>Forward</h4>
                    </Grid>
                </Grid>
                <AthleteOverview />
                <Box>
                    <h3>Biography</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident aspernatur itaque ipsam iste ullam rem cum,
                        quibusdam vero aut maiores doloribus quod nemo modi
                        alias temporibus perspiciatis officiis incidunt quasi!
                    </p>
                    <p>
                        Jimmy was born into a family of football players and
                        from an early age demonstrated a natural talent for the
                        sport. His father coached the local sport team to back
                        to back championships and his mother was the first women
                        to play football on Mars.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident aspernatur itaque ipsam iste ullam rem cum,
                        quibusdam vero aut maiores doloribus quod nemo modi
                        alias temporibus perspiciatis officiis incidunt quasi!
                    </p>
                </Box>
                <Box>
                    <h3>Likelihood to recruit?</h3>
                    <LikelihoodToRecruitRadio />
                    <h3>Likelihood to succeed?</h3>
                    <LikelihoodToRecruitRadio />
                </Box>
                <Link href="/">
                    <a style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Submit
                        </Button>
                    </a>
                </Link>
            </Box>
        </Card>
    );
};

export default Survey;
