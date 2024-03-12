import './App.css';
import Home from "./Home";
import { Routes, Route } from "react-router-dom"
import CountryData from "./CountryData";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/details/:countryName" element={ <CountryData/>} />
            </Routes>
        </div>
    );
}

export default App;
