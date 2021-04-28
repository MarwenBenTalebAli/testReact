import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllProjects = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/project/get-all-projects`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
