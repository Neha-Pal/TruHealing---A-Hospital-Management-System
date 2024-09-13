import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import docImg from "../Images/doc.png";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Dashboard.css";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/Appointment/get",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log("Error occurred", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/Appointment/delete/${appointmentId}`, {
        withCredentials: true,
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      toast.success("Appointment deleted successfully");
    } catch (error) {
      toast.error("Error deleting appointment");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard_page">
      <div className="banner_dash">
        <div className="firstBox">
        <img src={docImg} alt="Doctor Image" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{user?.firstName} {user?.lastName}</h5>
            </div>
            <p>Welcome to the Admin panel.</p>
          </div>
        </div>
        <div className="banner_dash">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date ? appointment.appointment_date.substring(0, 16) : "N/A"}</td>

                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                    <td>
                        <button onClick={() => handleDeleteAppointment(appointment._id)}>
                          Delete
                        </button>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Appointments Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
