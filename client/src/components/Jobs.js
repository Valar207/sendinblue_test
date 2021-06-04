import React from "react";
import { GrLocation } from "react-icons/gr";

export default function Jobs({ job }) {
  return (
    <div className="jobCard">
      <div className="leftContainer">
        <p className="jobTitle">{job.text}</p>
        <p className="location">
          <GrLocation className="locationIcon" /> {job.categories.location}
        </p>
      </div>
      <p className="commitment">{job.categories.commitment}</p>

      <a className="apply" target="_blank" rel="noopener noreferrer" href={job.hostedUrl}>
        Apply
      </a>
    </div>
  );
}
