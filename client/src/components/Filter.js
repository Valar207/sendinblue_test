import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/react-select-search.css";
import { Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { UserContext } from "../MyContext";

import SelectSearch from "react-select-search";

export default function Filter() {
  //   const options = [
  //     { name: "Swedish", value: "sv" },
  //     { name: "English", value: "en" },
  //   ];

  const state = useContext(UserContext);
  console.log(state);

  const { allFilters, filteredInfos, setFilteredInfos, nbJobs } = state;

  const options = {
    locations: [{ name: "All", value: "" }],
    departments: [{ name: "All", value: "" }],
    jobTypes: [{ name: "All", value: "" }],
  };

  allFilters.locations.map((l) => options.locations.push({ name: l, value: l }));
  allFilters.departments.map((d) => options.departments.push({ name: d, value: d }));
  allFilters.jobTypes.map((t) => options.jobTypes.push({ name: t, value: t }));

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
