import React, { useContext } from "react";
import "../styles/react-select-search.css";
import { UserContext } from "../MyContext";

import SelectSearch from "react-select-search";

export default function Filter() {
  const state = useContext(UserContext);
  const { allFilters, filteredInfos, setFilteredInfos, nbJobs } = state;

  const options = {
    locations: [{ name: "All", value: "" }],
    departments: [{ name: "All", value: "" }],
    jobTypes: [{ name: "All", value: "" }],
  };

  allFilters.locations.forEach((l) => options.locations.push({ name: l, value: l }));
  allFilters.departments.forEach((d) => options.departments.push({ name: d, value: d }));
  allFilters.jobTypes.forEach((t) => options.jobTypes.push({ name: t, value: t }));

  const locationChange = (value) => {
    setFilteredInfos({ ...filteredInfos, location: value });
  };
  const departmentChange = (value) => {
    setFilteredInfos({ ...filteredInfos, department: value });
  };
  const typeChange = (value) => {
    setFilteredInfos({ ...filteredInfos, jobType: value });
  };

  return (
    <div>
      <div className="filter">
        <div className="select">
          <p className="selectTitle">Location :</p>

          <SelectSearch
            onChange={(value) => locationChange(value)}
            options={options.locations}
            search
            name="location"
            placeholder="Select location"
          />
        </div>
        <div className="select">
          <p className="selectTitle">Department :</p>

          <SelectSearch
            onChange={(value) => departmentChange(value)}
            options={options.departments}
            search
            name="department"
            placeholder="Select department"
          />
        </div>
        <div className="select">
          <p className="selectTitle">Type :</p>

          <SelectSearch
            onChange={(value) => typeChange(value)}
            options={options.jobTypes}
            search
            name="type"
            placeholder="Select type"
          />
        </div>
      </div>
      <h2 className="nbJob">Job posts found : {nbJobs}</h2>
    </div>
  );
}
