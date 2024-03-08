import './App.css';
import {useCallback} from "react";
import WorldMap from "react-svg-worldmap";
import { useState } from "react";
import  { CountryContext } from "react-svg-worldmap";
function Home () {
    const [state, setState] = useState({
        cName: "Select Country",
        val: "",
    });

    const clickAction = useCallback(
        ({ countryCode, countryName }: CountryContext) => {
            setState({
                cName: countryName,
                val: countryCode,
            });
        },
        [],
    );
    const stylingFunction = ({
                                 countryCode,
                                 color,
                             }: CountryContext) => {

        return {
            fill: countryCode === state.val ? "#ABBDFF" : color,
            fillOpacity: countryCode === state.val ? 1 : 0,
            stroke: "gray",
            strokeWidth: 1,
            strokeOpacity: 1,
            cursor: "pointer"
        };
    };
    const hrefFunction = ({ countryName }: CountryContext) => ({
        href: `./${encodeURIComponent(countryName)}`,
        target: "_blank",
    });



    return (
        <>
            <WorldMap
                title="Choose a country from the map to view the Covid19 rates"
                data={[]}
                onClickFunction={clickAction}
                styleFunction={stylingFunction}
                size={Math.min(window.innerHeight, window.innerWidth) }
                hrefFunction={hrefFunction}
            />
            <ul>
                <li>Country: {state.cName}</li>
                <li>Country Code: {state.val}</li>
            </ul>
        </>
    );
}

export default Home;
