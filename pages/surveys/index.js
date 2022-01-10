import React from "react";
import Link from "../../src/Link";
import Button from "../../components/atoms/Button";

const index = () => {
    return (
        <div>
            <>Surveys</>
            <Link href="/">
                <a style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" size="small">
                        Home
                    </Button>
                </a>
            </Link>
        </div>
    );
};

export default index;
