import logo from "./logo.svg";
import "./styles/App.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Departments from "./components/Departments";
import Filter from "./components/Filter";
import Header from "./components/Header";
import { UserContext } from "./MyContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [allInfos, setAllInfos] = useState([]);
  const [loaded, setLoaded] = useState(false); //if all data was fetch display everything

  //Arrays of all possible filters by location, departments and jobTypes
  const [allFilters, setAllFilters] = useState({
    locations: [],
    departments: [],
    jobTypes: [],
  });
  const [nbJobs, setNbJobs] = useState(0);
  var tmpLo = [];
  var tmpTypes = [];
  var tmpDep = [];
  var countJob = 0;

  const [filteredInfos, setFilteredInfos] = useState({
    location: "",
    department: "",
    jobType: "",
  });

  useEffect(() => {
    if (filteredInfos.location == "" && filteredInfos.department == "" && filteredInfos.jobType == "") {
      axios
        .get("/sendinblue")
        .then((res) => {
          //get all Locations, all Types and all departments for filtering
          res.data.map((el) => {
            if (el.title) tmpDep.push(el.title);
            el.postings.map((l) => {
              tmpLo.push(l.categories.location);
              tmpTypes.push(l.categories.commitment);
            });
          });
          tmpLo = tmpLo.filter((item, index) => tmpLo.indexOf(item) === index);
          tmpTypes = tmpTypes.filter((item, index) => tmpTypes.indexOf(item) === index).filter((x) => x !== undefined);

          setAllFilters({
            locations: tmpLo,
            departments: tmpDep,
            jobTypes: tmpTypes,
          });

          //number of job found
          res.data.map((el) => el.postings.map((j) => countJob++));
          setNbJobs(countJob);

          //All job infos before filtering
          setAllInfos(res.data);

          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`/filter`, {
          params: filteredInfos,
        })
        .then((res) => {
          //number of job found
          res.data.map((el) => el.postings.map((j) => countJob++));
          setNbJobs(countJob);
          //all jobs with filter
          setAllInfos(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filteredInfos]);

  if (loaded) {
    return (
      <div className="App">
        <UserContext.Provider value={{ allFilters, filteredInfos, setFilteredInfos, nbJobs }}>
          <Header />
          <Filter />
          {allInfos.map((department, i) => (
            <Departments key={i} department={department} />
          ))}
        </UserContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="containerSpinner">
        <Spinner className="spinner" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default App;
