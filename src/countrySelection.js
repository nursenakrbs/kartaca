import { configureStore } from '@reduxjs/toolkit'
const defaultState = {
    countryName: "",
    countryCode: ""
}
function countrySelection (state=defaultState, action) {
    if(action.type==='countrySelected')
        return {
            countryName: action.countryName,
            countryCode: action.countryCode
        }
}
export default countrySelection;

