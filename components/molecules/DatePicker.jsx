import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function BasicDatePicker({ value, setValue }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date of Birth"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        style={{ width: "100%", margin: "1rem 0 0" }}
                        {...params}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
