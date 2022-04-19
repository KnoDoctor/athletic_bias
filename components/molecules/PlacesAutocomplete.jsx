import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

export default function PlacesAutocomplete({ value, setValue, label }) {
    // const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`,
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(
                    request,
                    callback
                );
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch(
            {
                input: inputValue,
                types: ["(cities)"],
            },
            (results) => {
                if (active) {
                    let newOptions = [];

                    if (value) {
                        newOptions = [value];
                    }

                    if (results) {
                        newOptions = [...newOptions, ...results];
                    }

                    setOptions(newOptions);
                }
            }
        );

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Box style={{ margin: "1rem 0" }}>
            <Autocomplete
                id="google-map-demo"
                getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                //autoComplete
                noOptionsText={"Search for a city or town..."}
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label={label} fullWidth />
                )}
                renderOption={(props, option) => {
                    const matches =
                        option.structured_formatting
                            .main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [
                            match.offset,
                            match.offset + match.length,
                        ])
                    );

                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Box
                                        component={LocationOnIcon}
                                        sx={{ color: "text.secondary", mr: 2 }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight
                                                    ? 700
                                                    : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            option.structured_formatting
                                                .secondary_text
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </Box>
    );
}

// import React, { useState, useEffect, useRef } from "react";
// import { Input, TextField } from "@mui/material";

// import TextInput from "../atoms/TextInput";

// let autoComplete;

// const loadScript = (url, callback) => {
//     let script = document.createElement("script");
//     script.type = "text/javascript";

//     if (script.readyState) {
//         script.onreadystatechange = function () {
//             if (
//                 script.readyState === "loaded" ||
//                 script.readyState === "complete"
//             ) {
//                 script.onreadystatechange = null;
//                 callback();
//             }
//         };
//     } else {
//         script.onload = () => callback();
//     }

//     script.src = url;
//     document.getElementsByTagName("head")[0].appendChild(script);
// };

// function handleScriptLoad(updateQuery, autoCompleteRef) {
//     autoComplete = new window.google.maps.places.Autocomplete(
//         autoCompleteRef.current,
//         { types: ["(cities)"] }
//     );
//     autoComplete.setFields(["address_components", "formatted_address"]);
//     autoComplete.addListener("place_changed", () =>
//         handlePlaceSelect(updateQuery)
//     );
// }

// async function handlePlaceSelect(updateQuery) {
//     const addressObject = autoComplete.getPlace();
//     const query = addressObject.formatted_address;
//     updateQuery(query);
//     console.log(addressObject);
// }

// function PlacesAutocomplete() {
//     const [query, setQuery] = useState("");
//     const autoCompleteRef = useRef(null);

//     useEffect(() => {
//         loadScript(
//             `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`,
//             () => handleScriptLoad(setQuery, autoCompleteRef)
//         );
//     }, []);

//     return (
//         <div className="search-location-input">
//             <TextInput
//                 inputRef={autoCompleteRef}
//                 onChange={(event) => setQuery(event.target.value)}
//                 label="Enter a City"
//                 value={query}
//             />
//             {/* <input
//                 ref={autoCompleteRef}
//                 onChange={(event) => setQuery(event.target.value)}
//                 placeholder="Enter a City"
//                 value={query}
//             /> */}
//         </div>
//     );
// }

// export default PlacesAutocomplete;
