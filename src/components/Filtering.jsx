import PropTypes from "prop-types";
import styles from "./Filtering.module.css";

function Filtering({ filter, setFilter }) {
    return (
      <div className={styles.filterContainer}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("todo")}
          className={`${styles.filterButton} ${filter === "todo" ? styles.active : ""}`}
        >
          Todo
        </button>
        <button
          onClick={() => setFilter("done")}
          className={`${styles.filterButton} ${filter === "done" ? styles.active : ""}`}
        >
          Done
        </button>
      </div>
    );
  }
  
  Filtering.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  };
  
  export default Filtering;