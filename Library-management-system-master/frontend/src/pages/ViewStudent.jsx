import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/admin/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Student Data:", res.data); // Log the data for debugging
        setStudent(res.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-primary mt-3">Loading student details...</p>
      </div>
    );
  if (!student)
    return (
      <div className="alert alert-danger text-center mt-5">
        <strong>Error:</strong> No student found.
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-gradient text-white text-center p-4">
          <h3 className="mb-0">Student Profile</h3>
        </div>
        <div className="card-body p-5">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="bg-info p-4 rounded-circle mb-3">
                <i className="fas fa-user-graduate fa-4x text-white"></i>
              </div>
              <h5 className="text-info"><strong><u>Student Details:</u></strong>
</h5>

            </div>
            <div className="col-md-8">
              <div className="mb-4">
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Name:</strong> {student.name}
                  </li> <li className="list-group-item">
                    <strong>Email:</strong> {student.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Regd No:</strong> {student.regdNo}
                  </li>
                  <li className="list-group-item">
                    <strong>Department:</strong> {student.department}
                  </li>
                  <li className="list-group-item">
                    <strong>Borrowed Books:</strong>
                    {student.borrowedBooks && student.borrowedBooks.length > 0 ? (
                      <ul className="list-unstyled mt-2">
                        {student.borrowedBooks.map((book) => (
                          <li key={book._id} className="text-info">
                            {book.bookId.title} by {book.bookId.author}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-danger">No borrowed books</span>
                    )}
                  </li>
                </ul>
              </div>
              <div className="d-flex justify-content-between">
                {/* <button
                  className="btn btn-outline-success px-4 py-2"
                  onClick={() => window.history.back()}
                >
                  <i className="fas fa-arrow-left"></i> Back to List
                </button>
                <button
                  className="btn btn-danger px-4 py-2"
                  onClick={() => alert("Feature coming soon...")}
                >
                  <i className="fas fa-trash-alt"></i> Delete Student
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-center bg-light py-3">
          <small className="text-muted">Last updated on: {new Date(student.updatedAt).toLocaleDateString()}</small>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
