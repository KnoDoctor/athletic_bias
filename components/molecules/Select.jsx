import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ label, value, setValue, options }) {
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
                style={{ textAlign: "left" }}
            >
                {options ? (
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.name}
                        </MenuItem>
                    ))
                ) : (
                    <></>
                )}
            </Select>
        </FormControl>
    );
}
