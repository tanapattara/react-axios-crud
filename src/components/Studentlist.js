import React, { useState, useEffect } from "react";
import StudentDataService from "../services/StudentService";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [Students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveStudent();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveStudent = () => {
    StudentDataService.getAll()
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveStudent();
    setCurrentStudent(null);
    setCurrentIndex(-1);
  };
  const setActiveStudent = (todo, index) => {
    setCurrentStudent(todo);
    setCurrentIndex(index);
  };
  const removeAllStudent = () => {
    StudentDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    StudentDataService.findByName(searchName)
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Student List</h4>

        <ul className="list-group">
          {Students &&
            Students.map((student, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveStudent(student, index)}
                key={index}
              >
                {student.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllStudent}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentStudent ? (
          <div>
            <h4>Student Detail</h4>
            <div>
              <label>
                <strong>StudentID:</strong>
              </label>{" "}
              {currentStudent.studentid}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentStudent.name}
            </div>

            <Link
              to={"/students/" + currentStudent.id}
              className="badge bg-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a list...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
