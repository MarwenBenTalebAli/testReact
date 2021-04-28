import { getAllProjects } from "./FetchApi";
import * as actionTypes from "./actionTypes";

export const fetchData = async (dispatch) => {
  dispatch({ type: actionTypes.LOADING, payload: true });
  let responseData = await getAllProjects();
  setTimeout(() => {
    if (responseData && responseData.Projects) {
      dispatch({
        type: actionTypes.FETCH_PROJECTS_AND_CHANGE_STATE,
        payload: responseData.Projects,
      });
      dispatch({ type: actionTypes.LOADING, payload: false });
    }
  }, 1000);
};
