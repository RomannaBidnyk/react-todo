import styles from "./NavMenu.module.css";
import { Link } from "react-router-dom";

function NavMenu() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/todo" className={styles.navLink}>
              Todo List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavMenu;
