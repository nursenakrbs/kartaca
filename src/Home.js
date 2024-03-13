import './App.css';
import React, {useCallback} from "react";
import WorldMap from "react-svg-worldmap";
import { useState } from "react";
import  { CountryContext } from "react-svg-worldmap";
import {countrySelection} from "./countrySelection";
import Form from 'react-bootstrap/Form';
import {useDispatch, useSelector} from "react-redux";

function Home () {
    const dispatch = useDispatch();
    const arrayDataItems= useSelector(state=>state.country.countries);
    const [state, setState] = useState({
        cName: "Select Country",
        val: "",
    });

    //const store = configureStore();
    const [zoom, setZoom] = useState(0);
    const clickAction = useCallback(
        ({ countryCode, countryName }: CountryContext) => {
            dispatch(countrySelection({
                    countryName: countryName,
                    countryCode: countryCode
            }));
            setState({
                cName: countryName,
                val: countryCode,
            });
            //setArrayDataItems(store.getState().countries);
            //console.log(store.getState());
        },
        [dispatch],
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
            <div id="clickedList">
                <h4>Clicked Countries:</h4>
                {arrayDataItems.map(
                    (selected) =>
                        selected.countryName ==='' ? <p></p> : <p>{selected.countryName + " (" + selected.countryCode + ")"}</p>
                )}
            </div>
        </>
    );
}

export default Home;
