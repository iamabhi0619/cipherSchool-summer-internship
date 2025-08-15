import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditStudent = () => {
  const { id } = useParams(); // Get the student ID from URL params
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    regdNo: "",
  });

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/admin/students/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudent(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          department: res.data.department,
          regdNo: res.data.regdNo,
        });
      } catch (error) {
        setError("Error fetching student data");
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/admin/students/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Student updated:", res.data);
      navigate(-1);  // Navigate back to the previous page after successful update
    } catch (error) {
      console.error("Error updating student:", error);
      setError("Error updating student");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-primary mt-3">Loading student details...</p>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">
        <strong>{error}</strong>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-gradient text-white text-center p-4">
          <h3 className="mb-0">Edit Student</h3>
        </div>
        <div className="card-body p-5">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
               <strong> <label htmlFor="name" className="form-label mb-2">
                  Name
                </label></strong>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter student name"
                />
              </div>
              <div className="col-md-6">
                 <strong> <label htmlFor="email" className="form-label mb-2">
                  Email
                </label> </strong> 
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter student email"
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
               <strong>   <label htmlFor="department" className="form-label mb-2">
                  Department
                </label> </strong> 
                <input
                  type="text"
                  id="department"
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="Enter department"
                />
              </div>
              <div className="col-md-6">
                 <strong> <label htmlFor="regdNo" className="form-label mb-2">
                  Registration Number
                </label> </strong> 
                <input
                  type="text"
                  id="regdNo"
                  name="regdNo"
                  className="form-control"
                  value={formData.regdNo}
                  onChange={handleChange}
                  required
                  placeholder="Enter registration number"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2"
              >
                <i className="fas fa-save"></i> Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 py-2"
                onClick={() => navigate(`/students/view/${id}`)}
              >
                <i className="fas fa-arrow-left"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
