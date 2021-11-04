/*
THIS NEED TO BE CONSOLIDATED IN THE CONSENT
FORM ORGANISM THEN DELETED!!!!
*/

import { Container } from "@mui/material";
import { useState } from "react";

import Button from "../atoms/Button";

import ConsentForm from "../organisms/ConsentForm";
import FullScreenDialog from "../molecules/FullScreenDialog";
import CoachDetailsForm from "../organisms/CoachDetailsForm";

export default () => {
    const [open, setOpen] = useState(false);
    const [hasConsented, setHasConsented] = useState(false);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ConsentForm
                handleDialogClickOpen={handleDialogClickOpen}
                hasConsented={hasConsented}
            />
            <CoachDetailsForm />
            <FullScreenDialog
                open={open}
                handleDialogClickOpen={handleDialogClickOpen}
                handleDialogClose={handleDialogClose}
            >
                <Container>
                    <h1>Hello World</h1>
                    <p>
                        I consent to participate in Perceptions on Athlete
                        Development conducted by Kathryn Robinson. I have
                        understood the nature of this project and wish to
                        participate. I am not waiving any of my legal rights by
                        signing this form.
                    </p>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            handleDialogClose();
                            setHasConsented(true);
                        }}
                    >
                        I consent to participate
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDialogClose();
                            setHasConsented(false);
                        }}
                    >
                        I do not consent to participate
                    </Button>
                </Container>
            </FullScreenDialog>
        </>
    );
};
