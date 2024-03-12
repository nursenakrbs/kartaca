import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Blocks} from "react-loader-spinner";
import {Alert, ListGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function CountryData() {
    const params = useParams();
    const [posts, setPosts] = useState(null);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [details, setDetails] = useState({});
    //const store = configureStore({reducer: countrySelection});

    useEffect( () => {
       //console.log(store.getState());
        if(params.countryName === "United States"){
            params.countryName = "US";
        } else if (params.countryName==="Democratic Republic of the Congo"){
            params.countryName = "Congo (Kinshasa)";
        }
        async function fetchData(){
            const options = {
                method: 'GET',
                url: 'https://covid-19-statistics.p.rapidapi.com/reports',
                params: {region_name: params.countryName},
                headers: {
                    'X-RapidAPI-Key': 'e89894b2acmshc15052f2b109899p1a4510jsn73da842c586b',
                    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options);
                setPosts(response.data);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }
        fetchData().then();
    }, [params]);
    useEffect(()=>{
        if (posts!=null){
            setLoading(false);
            if (posts.data.length === 0){
                setError("No information for this country!")
            } else {
                setError("");
                calculateSummary();
            }
        } else{
            setError("No information for this country!");
        }
        function calculateSummary () {
            let confirmed=0, deaths=0, recovered=0, region =[];
            const data = posts.data;
            for(let el of data){
                confirmed += el.confirmed;
                deaths += el.deaths;
                recovered += el.recovered;
                if(el.region.province!=="")
                    region.push(<option>{el.region.province}</option>);
            }

            setSummary( {
                "name": posts.data[0].region.name,
                "iso": posts.data[0].region.iso,
                "confirmed": confirmed,
                "deaths": deaths,
                "recovered": recovered,
                "lastUpdate": posts.data[0].last_update,
                "regions": region
            });
        }
    },[posts])
    const provinceSelected = (e) => {
        if(e.target.value === "Click to see details of a province"){
            setDetails({})
            document.getElementById("provinceDetails").style.display="none"
            return;
        }
        const data = posts.data;
        for(let el of data){
            if (el.region.province === e.target.value){
                setDetails(el);
                document.getElementById("provinceDetails").style.display="inline"
                break;
            }
        }
    }
     if(!loading){
         if(error !== ""){
             return (
                 <div className="dataBody">
                     <h1>Covid19 Information of {params.countryName}</h1>
                     <Alert key={"danger"} variant={"danger"} role="errorAlert">
                         {error}
                     </Alert>
                 </div>
             );
         }

        return (
            <div className="dataBody">
                <h1>Covid19 Information of {params.countryName} ({summary.iso})</h1>
                <div>
                <p>Last Update Date is {summary.lastUpdate}</p>
                <ListGroup role="totalData">
                    <ListGroup.Item action variant="success">
                        Total number of recovered patients: {summary.recovered}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="danger">
                        Total number of confirmed cases: {summary.confirmed}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="dark">
                        Total number of deaths: {summary.deaths}
                    </ListGroup.Item>
                </ListGroup>
                </div>
                <br/>
                <Form.Select id ="region" onChange={provinceSelected}>
                    <option>Click to see details of a province</option>
                    {summary.regions}
                </Form.Select>
                <div id="provinceDetails" >
                    <ListGroup role = "provinceDetails">
                        <ListGroup.Item action variant="success">
                            Number of recovered patients: {details.recovered}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="danger">
                            Number of confirmed cases: {details.confirmed}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="dark">
                            Number of deaths: {details.deaths}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        );
    } else {
        return (
            <div className="dataBody">
                <h1>Covid19 Information of {params.countryName}</h1>
                <Blocks
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                    role = "loader"
                />
                <p>Please wait for results to load...</p>
            </div>
        );
    }
}

export default CountryData;
