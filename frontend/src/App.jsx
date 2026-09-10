import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import RegisterStudent from "./pages/RegisterStudent";
import StudentList from "./pages/StudentList";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";
import Departments from "./pages/Departments";
import Courses from "./pages/Courses";
import Registration from "./pages/Registration";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/registrations" element={<Registration />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;