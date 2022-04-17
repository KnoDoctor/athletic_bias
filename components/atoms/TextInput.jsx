import React from "react";
import MUIInputLabel from "@mui/material/InputLabel";
import MUIOutlinedInput from "@mui/material/OutlinedInput";
import MUIFormControl from "@mui/material/FormControl";

const TextInput = ({
    id,
    type,
    label,
    value,
    onChange,
    endAdornment,
    inputRef,
}) => {
    return (
        <MUIFormControl style={{ margin: "1rem 0 0", width: "100%" }}>
            <MUIInputLabel>{label}</MUIInputLabel>
            <MUIOutlinedInput
                inputRef={inputRef}
                id={id}
                type={type}
                label={label}
                value={value}
                onChange={onChange}
                endAdornment={endAdornment}
                onWheel={
                    type === "number" ? (event) => event.target.blur() : null
                }
            />
        </MUIFormControl>
    );
};

export default TextInput;

{
    /* <OutlinedInput
            placeholder="Some String"
            inputRef=autocompleteRef
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          /> */
}
