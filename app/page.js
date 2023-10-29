// TODO Add more filters!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO change readme
// TODO Deploy
// TODO clean css
// TODO move nav
// TODO change images

"use client";
import swapi from "../lib/swapi";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import IDCard from "../components/IDCard";
import styles from "./page.module.css";

export default function Home() {
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
      prevState = mergedData.filter(
        (obj) =>
          obj.name.includes(input) ||
          obj.gender.includes(input) ||
          obj.created.includes(input)
      );
      return [...prevState];
    });
  }

  function handleInputChange(event) {
    const input = event.target.value;
    filterCards(input);
  }
  //------------------Dynamic-Elements------------------------------------------------------------------
  const cards = filteredData.map((obj, index) => (
    <IDCard obj={obj} key={index} />
  ));
  //------------------JSX-------------------------------------------------------------------------------
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navLogoCont}>
          <img
            className={styles.navLogo}
            src="/resistance-logo.png"
            alt="resistance-logo"
          ></img>
          <h1 className={styles.navTitle}>Resistance ID Database</h1>
        </div>
        <div className={styles.navInputCont}>
          <label className={styles.navInputLabel}>Filter:</label>
          <input
            className={styles.navInput}
            type="text"
            onChange={handleInputChange}
            placeholder="Filter IDs under a certain ID, name, planet, etc..."
          ></input>
        </div>
      </nav>
      <div className="genericCont">
        {loadingDataState ? (
          <div className={styles.appLoadingCont}>
            <img
              className={styles.appLoadingLogo}
              src="/resistance-logo.png"
              alt="resistance-logo"
            ></img>
          </div>
        ) : (
          <>{cards}</>
        )}
      </div>
    </div>
  );
}
