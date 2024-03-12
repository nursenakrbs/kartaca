import './App.css';
import React, {useCallback} from "react";
import WorldMap from "react-svg-worldmap";
import { useState } from "react";
import  { CountryContext } from "react-svg-worldmap";
import {configureStore} from "@reduxjs/toolkit";
import countrySelection from "./countrySelection";
import Form from 'react-bootstrap/Form';

function Home () {
    const [state, setState] = useState({
        cName: "Select Country",
        val: "",
    });
    const store = configureStore({reducer: countrySelection});
    const [zoom, setZoom] = useState(0);
    const clickAction = useCallback(
        ({ countryCode, countryName }: CountryContext) => {
            store.dispatch({
                type: 'countrySelected',
                countryName: countryName,
                countryCode: countryCode
            });
            setState({
                cName: countryName,
                val: countryCode,
            });
        },
        [store],
    );
    const stylingFunction = ({countryCode, color}: CountryContext) => {
        return {
            fill: countryCode === state.val ? "#ABBDFF" : color,
            fillOpacity: 0.2 ,
            stroke: "black",
            strokeWidth: 1,
            strokeOpacity: 0,
            cursor: "pointer"
        };
    };
    const hrefFunction = ({ countryName }: CountryContext) => ({
        href: `./details/${encodeURIComponent(countryName)}`,
        target: "_blank",
    });
    function zoomSetting() {
        const val = document.getElementById("range").value;
        setZoom((val-50)*10);
    }
    return (
        <>
            <h1>Covid19 Information Worldwide</h1>
            <Form.Label>-</Form.Label>
            <Form.Range id = "range" onChange={zoomSetting}/>
            <Form.Label>+</Form.Label>
            <WorldMap
                title="Choose a country from the map to view the Covid19 rates"
                data={[]}
                onClickFunction={clickAction}
                styleFunction={stylingFunction}
                size={Math.min(window.innerHeight, window.innerWidth) + zoom}
                hrefFunction={hrefFunction}
                class = "map"
                role = "worldMap"
            />
            <p>Country: {state.cName}</p>
            <p>Country Code: {state.val}</p>
        </>
    );
}

export default Home;
