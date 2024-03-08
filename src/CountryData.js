import {useEffect, useState} from "react";
import axios from "axios";

function CountryData() {
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        async function fetchData(){

            const options = {
                method: 'GET',
                url: 'https://covid-19-statistics.p.rapidapi.com/reports',
                params: {iso: 'CHN'},
                headers: {
                    'X-RapidAPI-Key': 'e89894b2acmshc15052f2b109899p1a4510jsn73da842c586b',
                    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setPosts(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData().then(r => {});

    }, []);
    return (
        <div className="dataBody">
            <h1>Covid19 Information of</h1>
        </div>
    );
}

export default CountryData;
