import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchData } from "./Actions";
import { ProjectContext } from "./Charts";

const GanttChart = (props) => {
  const { data, dispatch } = useContext(ProjectContext);
  const { projects, loading } = data;

  console.log("projects", projects);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  // const [projects, setProjects] = useState([]);
  // const projectsObject = {
  //   projects: [
  //     {
  //       name: "Projet React 1",
  //       planned_start_date: 1619022930,
  //       planned_end_date: 1619072930,
  //       id: 1,
  //     },
  //     {
  //       name: "Projet React 2",
  //       planned_start_date: 1619032930,
  //       planned_end_date: 1619092930,
  //       id: 2,
  //     },
  //     {
  //       name: "Projet HTML Master",
  //       planned_start_date: 1619002930,
  //       planned_end_date: 1619172930,
  //       sub_projects: [
  //         {
  //           name: "Sous projet 1",
  //           planned_start_date: 1619002930,
  //           planned_end_date: 1619172930,
  //           id: 4,
  //         },
  //         {
  //           name: "Sous projet 2",
  //           planned_start_date: 1619002930,
  //           planned_end_date: 1619172930,
  //           id: 5,
  //         },
  //       ],
  //       id: 3,
  //     },
  //     {
  //       name: "Projet 1st step",
  //       planned_start_date: 1619022930,
  //       planned_end_date: 1619072930,
  //       id: 6,
  //       parent_project: null,
  //     },
  //     {
  //       id: 7,
  //       name: "Projet 2nd step",
  //       planned_start_date: 1619072930,
  //       planned_end_date: 1619082930,
  //       parent_project: 6,
  //     },
  //     {
  //       id: 8,
  //       name: "Projet 3nd step",
  //       planned_start_date: 1619089930,
  //       planned_end_date: 1619102930,
  //       parent_project: 7,
  //     },
  //   ],
  // };

  /*useEffect(() => {
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

    projectsObject.projects.forEach((obj) => {
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
    setProjects(array);
  }, []);*/

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="Gantt"
      loader={<div>Loading Chart</div>}
      data={projects}
      options={{
        gantt: {
          criticalPathEnabled: true,
          arrow: {
            angle: 100,
            width: 5,
            color: "green",
            radius: 0,
          },
        },
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default GanttChart;
