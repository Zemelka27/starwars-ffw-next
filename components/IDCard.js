import Image from "next/image";
import styles from "./IDCard.module.css";

export default function IDCard({ obj }) {
  //------------------Dynamic-Elements------------------------------------------------------------------
  const mergedVehicles = [...obj.starshipObjects, ...obj.vehicleObjects];

  const mergedVehicleElements = mergedVehicles.map((starship, index) => (
    <div className={styles.liGroup} key={index}>
      <div>
        <label className={styles.labelNormal}>Manufacturer:</label>
        <li className={styles.liNormal}>{starship.manufacturer}</li>
      </div>
      <div>
        <label className={styles.labelNormal}>Make:</label>
        <li className={styles.liNormal}>{starship.name}</li>
      </div>
      <div>
        <label className={styles.labelNormal}>Model:</label>
        <li className={styles.liNormal}>{starship.model}</li>
      </div>
    </div>
  ));
  //------------------JSX-------------------------------------------------------------------------------
  return (
    <div className={styles.card}>
      <div className={styles.cardHeaderCont}>
        <div className={styles.cardHeaderSub}>
          <img
            className={styles.cardLogo}
            src="/resistance-logo.png"
            alt="card-logo"
          ></img>
          <div>Resistance ID Card</div>
        </div>
        <div>ID: {obj.created}</div>
      </div>
      <div className={styles.cardSubCont}>
        <div>
          <label className={styles.labelTitle}>Basic Data:</label>
          <ul className={styles.ulNormal}>
            <label className={styles.labelNormal}>Name:</label>
            <li className={styles.liNormal}>{obj.name}</li>
            <div className={styles.liGroup}>
              <div>
                <label className={styles.labelNormal}>Birth Year:</label>
                <li className={styles.liNormal}>{obj.birth_year}</li>
              </div>
              <div>
                <label className={styles.labelNormal}>Gender:</label>
                <li className={styles.liNormal}>{obj.gender}</li>
              </div>
            </div>
            <div className={styles.liGroup}>
              <div>
                <label className={styles.labelNormal}>Hair Color:</label>
                <li className={styles.liNormal}>{obj.hair_color}</li>
              </div>
              <div>
                <label className={styles.labelNormal}>Eye Color:</label>
                <li className={styles.liNormal}>{obj.eye_color}</li>
              </div>
              <div>
                <label className={styles.labelNormal}>Skin Color:</label>
                <li className={styles.liNormal}>{obj.skin_color}</li>
              </div>
            </div>
            <div className={styles.liGroup}>
              <div>
                <label className={styles.labelNormal}>Height:</label>
                <li className={styles.liNormal}>{obj.height} cm</li>
              </div>
              <div>
                <label className={styles.labelNormal}>Mass:</label>
                <li className={styles.liNormal}>{obj.mass} kg</li>
              </div>
            </div>
          </ul>
          <label className={styles.labelTitle}>Birth Planet Data:</label>
          {obj.planet.name ? (
            <ul className={styles.ulNormal}>
              <div className={styles.liGroup}>
                <div>
                  <label className={styles.labelNormal}>Name:</label>
                  <li className={styles.liNormal}>{obj.planet.name}</li>
                </div>
              </div>
              <div className={styles.liGroup}>
                <div>
                  <label className={styles.labelNormal}>Rotation Period:</label>
                  <li className={styles.liNormal}>
                    {obj.planet.rotation_period} hours
                  </li>
                </div>
                <div>
                  <label className={styles.labelNormal}>Orbital Period:</label>
                  <li className={styles.liNormal}>
                    {obj.planet.orbital_period} days
                  </li>
                </div>
                <div>
                  <label className={styles.labelNormal}>Diameter:</label>
                  <li className={styles.liNormal}>{obj.planet.diameter} km</li>
                </div>
                <div>
                  <label className={styles.labelNormal}>Gravity:</label>
                  <li className={styles.liNormal}>{obj.planet.gravity}</li>
                </div>
              </div>
              <div className={styles.liGroup}>
                <div>
                  <label className={styles.labelNormal}>Climate:</label>
                  <li className={styles.liNormal}>{obj.planet.climate}</li>
                </div>
                <div>
                  <label className={styles.labelNormal}>Terrain:</label>
                  <li className={styles.liNormal}>{obj.planet.terrain}</li>
                </div>
                <div>
                  <label className={styles.labelNormal}>Surface Water:</label>
                  <li className={styles.liNormal}>
                    {obj.planet.surface_water}
                  </li>
                </div>
              </div>
              <label className={styles.labelNormal}>Population:</label>
              <li className={styles.liNormal}>
                {new Intl.NumberFormat().format(obj.planet.population)}
              </li>
            </ul>
          ) : (
            <ul className={styles.ulNormal}>
              <li className={styles.liNormal}>Unknown</li>
            </ul>
          )}
          <label className={styles.labelTitle}>Associated Vehicle Data:</label>
          <ul className={styles.ulNormal}>
            {mergedVehicleElements[0] ? (
              mergedVehicleElements
            ) : (
              <li className={styles.liNormal}>Unknown</li>
            )}
          </ul>
        </div>
        <div className={styles.cardImageCont}>
          <img
            className={styles.profilePic}
            src="/profile-picture-dummy.jpg"
            alt="profile-pic"
          ></img>
        </div>
      </div>
    </div>
  );
}
