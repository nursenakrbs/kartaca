import { configureStore } from '@reduxjs/toolkit'
import countryReducer from "./countrySelection";
export default configureStore({
    reducer: {
        country: countryReducer
    }
})