/**
 * Sets the unified file object to an empty object or a valid one
 * depending on the action
 * 
 * This represents the file that's uploaded by the user on the "mapping form".
 * If it's more than one, it gets merged
 * 
 * @returns {Array}
 */
const filteredFileReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FILTERED_FILE":
      return action.payload;
    case "UNSET_FILTERED_FILE":
      return {};
    default:
      return state;
  }
};

export default filteredFileReducer;
