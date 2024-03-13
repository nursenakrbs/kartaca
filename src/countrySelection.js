import {createSlice} from "@reduxjs/toolkit";

const countrySlice = createSlice({
    name: "country",
    initialState:  {
            countries: [{
                countryName: "",
                countryCode: ""
            }]
    },
    reducers: {
        countrySelection: (state, action) => {
            if(!state.countries.includes(action.payload))
            state.countries.push(action.payload);
        }
    }
})

export const { countrySelection } = countrySlice.actions;

export default countrySlice.reducer;
