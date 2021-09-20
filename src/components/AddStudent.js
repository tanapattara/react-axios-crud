import React, { useState } from "react";
import StudentDataService from "../services/StudentService";

const AddTodo = () => {
  const initialStudent = {
    id: null,
    studentid: "",
    name: "",
    major: "",
  };
  const [student, setStudent] = useState(initialStudent);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const saveStudent = () => {
    var data = {
      studentid: student.studentid,
      name: student.name,
      major: student.major,
    };

    StudentDataService.create(data)
      .then((response) => {
        setStudent({
          id: response.data.id,
          studentid: response.data.studentid,
          name: response.data.name,
          major: response.data.major,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newStudent = () => {
    setStudent(initialStudent);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newStudent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="studentid">StudentID</label>
            <input
              type="text"
              className="form-control"
              id="studentid"
              required
              value={student.studentid}
              onChange={handleInputChange}
              name="studentid"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={student.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <button onClick={saveStudent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
