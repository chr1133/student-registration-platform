import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import RegisterStudent from "./pages/RegisterStudent";
import StudentList from "./pages/StudentList";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />
      </Routes>
    </Layout>
  );
}

export default App;