import './App.css';
import {Component} from "react";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";

function WorldMap() {
  return (
      <div>
          <ComposableMap>
              <Geographies geography="/features.json">
                  {({ geographies }) =>
                      geographies.map((geo) => (
                          <Geography key={geo.rsmKey} geography={geo} />
                      ))
                  }
              </Geographies>
          </ComposableMap>
      </div>
  );
}

function App() {
  return (
    <div className="App">
      <WorldMap/>
    </div>
  );
}

export default App;
