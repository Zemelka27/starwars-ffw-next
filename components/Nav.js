import Image from "next/image";
import styles from "./Nav.module.css";

export default function Nav(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navLogoCont}>
        <Image
          className={styles.navLogo}
          src="/resistance-logo.png"
          alt="resistance-logo"
          width={50}
          height={50}
        />
        <h1 className={styles.navTitle}>Resistance ID Database</h1>
      </div>
      <div className={styles.navInputCont}>
        <label className={styles.navInputLabel}>Filter:</label>
        <input
          className={styles.navInput}
          type="text"
          onChange={props.handleInputChange}
          placeholder="Filter under ID number, name or planet..."
        ></input>
      </div>
    </nav>
  );
}
