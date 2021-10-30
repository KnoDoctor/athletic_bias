import React from "react";
import MUIButton from "@mui/lab/LoadingButton";

const Button = ({
    href,
    onClick,
    variant,
    color,
    size,
    disabled,
    loadingSettings,
    iconSettings,
    children,
}) => {
    return (
        <MUIButton
            style={{ margin: "1rem 0", width: "100%" }}
            href={href}
            onClick={onClick}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            {...loadingSettings}
            {...iconSettings}
        >
            {children}
        </MUIButton>
    );
};

export default Button;

////Props

// href={`#`}
// onClick={handleClick}
// variant="contained"
// color="primary"
// size="small"
// disabled={false}
// loadingSettings={{
//     loading,
//     loadingIndicator: "Loading...",
// }}
// iconSettings={{
//     startIcon: <SaveIcon />,
//     endIcon: <SendIcon />,
//     loadingPosition: "end",
// }}
