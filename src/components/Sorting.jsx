import PropTypes from "prop-types";

function Sorting({ sortField, sortOrder, onSortChange }) {
  const value = `${sortField}-${sortOrder}`;

  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div>
      <label>Sort by:</label>
      <select value={value} onChange={handleChange}>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="completedAt-asc">Completed At (Oldest First)</option>
        <option value="completedAt-desc">Completed At (Newest First)</option>
      </select>
    </div>
  );
}

Sorting.propTypes = {
  sortField: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Sorting;
