// TODO add responsiveness !!!!!!!
// TODO check sizes

"use client";
import swapi from "../lib/swapi";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import IDCard from "../components/IDCard";
import Nav from "@/components/Nav";

export default function App() {
  //------------------States---------------------------------------------------------------------------
  const [mergedData, setMergedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loadingDataState, setLoadingDataState] = useState(true);
  //------------------Effects--------------------------------------------------------------------------
  useEffect(() => {
    fetchData();
  }, []);
  //------------------Functions-------------------------------------------------------------------------
  async function fetchData() {
    try {
      const firstPromise = axios.get(`${swapi}/people`);
      const secondPromise = axios.get(`${swapi}/planets`);
      const thirdPromise = axios.get(`${swapi}/starships`);
      const fourthPromise = axios.get(`${swapi}/vehicles`);

      const response = await Promise.all([
        firstPromise,
        secondPromise,
        thirdPromise,
        fourthPromise,
      ]);

      const characterData = response[0].data.results;
      const planetData = response[1].data.results;
      const starshipData = response[2].data.results;
      const vehicleData = response[3].data.results;

      addPlanetDataToMergedData(characterData, planetData);

      addStarshipDataToMergedData(characterData, starshipData);

      addVehicleDataToMergedData(characterData, vehicleData);

      setMergedData(characterData);

      setFilteredData(characterData);

      // console.log(characterData);

      setLoadingDataState(false);
    } catch (error) {
      alert("Try reloading the app, a server error occurred:", error);
      console.error("Try reloading the app, a server error occurred:", error);
    }
  }

  function addPlanetDataToMergedData(characterData, planetData) {
    for (let i = 0; i < characterData.length; i++) {
      characterData[i].planet = {};
      for (let f = 0; f < planetData.length; f++) {
        if (characterData[i].homeworld === planetData[f].url) {
          characterData[i].planet = planetData[f];
        }
      }
    }
  }

  function addStarshipDataToMergedData(characterData, starshipData) {
    for (let i = 0; i < characterData.length; i++) {
      characterData[i].starshipObjects = [];
      for (let f = 0; f < characterData[i].starships.length; f++) {
        for (let g = 0; g < starshipData.length; g++) {
          if (characterData[i].starships[f] === starshipData[g].url) {
            characterData[i].starshipObjects[f] = starshipData[g];
          }
        }
      }
    }
  }

  function addVehicleDataToMergedData(characterData, vehicleData) {
    for (let i = 0; i < characterData.length; i++) {
      characterData[i].vehicleObjects = [];
      for (let f = 0; f < characterData[i].starships.length; f++) {
        for (let g = 0; g < vehicleData.length; g++) {
          if (characterData[i].vehicles[f] === vehicleData[g].url) {
            characterData[i].vehicleObjects[f] = vehicleData[g];
          }
        }
      }
    }
  }

  function filterCards(input) {
    setFilteredData((prevState) => {
      console.log(prevState);
      prevState = mergedData.filter((obj) => {
        let planet = obj.planet.name ? obj.planet : { name: "unknown" };

        console.log(obj);
        return (
          obj.name.toLowerCase().includes(input) ||
          obj.gender.toLowerCase().includes(input) ||
          obj.created.toLowerCase().includes(input) ||
          planet.name.toLowerCase().includes(input)
        );
      });
      return [...prevState];
    });
  }

  function handleInputChange(event) {
    const input = event.target.value.toLowerCase();
    filterCards(input);
  }
  //------------------Dynamic-Elements------------------------------------------------------------------
  const cards = filteredData.map((obj, index) => (
    <IDCard obj={obj} key={index} />
  ));
  //------------------JSX-------------------------------------------------------------------------------
  return (
    <div>
      <Nav handleInputChange={handleInputChange} />
      <div className="genericCont">
        {loadingDataState ? (
          <Image
            className="appLoadingLogo"
            src="/resistance-logo.png"
            alt="resistance-logo"
            width={300}
            height={300}
          />
        ) : (
          <>{cards}</>
        )}
      </div>
    </div>
  );
}
