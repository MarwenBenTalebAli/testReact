import * as actionTypes from "./actionTypes";

export const projectState = {
  projects: [],
  loading: false,
};

export const projectReducer = (state = projectState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_AND_CHANGE_STATE:
      return fetchProjectsAndChangeState(state, action);
    case actionTypes.LOADING:
      return loading(state, action);
    default:
      return state;
  }
};

const loading = (state, action) => {
  return updateObject(state, {
    loading: action.payload,
  });
};

const fetchProjectsAndChangeState = (state, action) => {
  const array = newArray(action.payload);
  return updateObject(state, {
    projects: array,
  });
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const newArray = (payload) => {
  let array = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
  ];
  payload.forEach((obj) => {
    array.push([
      obj.id.toString(),
      obj.name,
      obj.name,
      timestampToDate(obj.planned_start_date),
      timestampToDate(obj.planned_end_date),
      daysToMilliseconds(
        durationDays(
          timestampToDate(obj.planned_start_date),
          timestampToDate(obj.planned_end_date)
        )
      ),
      100,
      obj.parent_project ? obj.parent_project.toString() : null,
    ]);
    if (obj.sub_projects) {
      obj.sub_projects.forEach((subObj) => {
        array.push([
          subObj.id.toString(),
          subObj.name,
          obj.name,
          timestampToDate(subObj.planned_start_date),
          timestampToDate(subObj.planned_end_date),
          daysToMilliseconds(
            durationDays(
              timestampToDate(subObj.planned_start_date),
              timestampToDate(subObj.planned_end_date)
            )
          ),
          100,
          subObj.parent_project
            ? subObj.parent_project.toString()
            : obj.id.toString(),
        ]);
      });
    }
  });
  return array;
};

const daysToMilliseconds = (days) => {
  return days * 24 * 60 * 60 * 1000;
};

const durationDays = (startDate, endDate) => {
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const timestampToDate = (timestamp) => {
  return new Date(timestamp * 1000);
};
