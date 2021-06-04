import React from "react";
import Jobs from "../components/Jobs";

export default function Departments({ department }) {
  const { title, postings } = department;
  return (
    <div className="department">
      <h1 className="departmentTitle">{title}</h1>
      {postings.map((job, i) => (
        <Jobs key={i} job={job} />
      ))}
    </div>
  );
}
