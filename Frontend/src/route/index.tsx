import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtactiveRoute from "./protactiveRoute";
import LogInForm from "../pages/Auth/LogIn/components/LogInForm";
import SignUpForm from "../pages/Auth/SignUp/components/SignUpForm";
import Home from "../pages/Home";
import Main from "../pages/Maintenance/components/Main";
import Layout from "./layout";
import PatientDemographic from "../pages/Patient/Demographic";
import Diagnosis from "../pages/Patient/Diagnosis/components/diagnosis";
import PaitentDocumnets from "../pages/Patient/Document"
import PatientAllergie from "../pages/Patient/Allergies";
import PatientFamilyHistory from "../pages/Patient/FamilyHistory";
import Patient from "../pages/Patient/Patient";
import PatientInformation from "../pages/Patient/PatientInformation";
import Dashboard from "../pages/DashBoard/components/DashBoard"
import Vitals from "../pages/Patient/Vital";
import Students from "../pages/Students";
import SocialHistory from "../pages/Patient/SocialHistory";
import School from "../pages/Schools";
import CustomForm from "../pages/CustomForm";
import StudentAssesment from "../pages/Settings/AssesmentTool/index"
import StudentAssessmentGroup from "../pages/Settings/AssesmentGroup/index"
import StudentAssignment from "../pages/Assignment/index"
import MyAssignment from "../pages/StudentView/StudentAssignment/index"
import MyAssignmentDetail from "../pages/StudentView/StudentAssignment/component/AssignmentDetail"
import StartAssignment from "../pages/StudentView/StudentAssignment/component/StartAssignment"
import ForgotPassword from '../pages/Auth/ForgotPassword/components/ForgotPasswordForm'
import ResetPassword from "../pages/Auth/ResetPassword/components/ResetPasswordForm";
import QuickGuide from "../pages/QuickGuide";
import { decrypt } from "../utils/encryptDecrypt";

function Routing() {
  const [roleId, setRoleId] = useState();
  useEffect(() => {
    const item = localStorage.getItem("item");
    if (localStorage.getItem("item")) {
       const token = JSON.parse(decrypt(item))
       const parts = token.token.split('.');
       const payload = JSON.parse(window.atob(parts[1]));
       setRoleId(payload.roleId);
    }
 }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/maintenance" element={<Main />} />
          <Route path="*" element={<><h1>404 page</h1></>} />
        </Route>
        <Route path="/auth/signup" element={<SignUpForm />}></Route>
        <Route path="/auth/login" element={<LogInForm />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:email/:user_id/:role_id/:token" element={<ResetPassword />}></Route>
        <Route path="/" element={<ProtactiveRoute />}>
          <Route element={<Layout layoutName="doctorDashboard" />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/patients" element={<Patient />}></Route>
            <Route path="/patientInformation/:cardId" element={<PatientInformation />}></Route>
            <Route path="/patients" element={<Layout layoutName="patientTab" />}>
              <Route path="demographic" element={<PatientDemographic />}></Route>
              <Route path="allergies" element={<PatientAllergie />}></Route>
              <Route path="diagnosis" element={<Diagnosis />}></Route>
              <Route path="family-history" element={<PatientFamilyHistory />}></Route>
              <Route path="documents" element={<PaitentDocumnets />}></Route>
              <Route path="vitals" element={<Vitals />}></Route>
              <Route path="social-history" element={<SocialHistory />}></Route>
            </Route>
            <Route path="students" element={<Students />}></Route>
            {Number(roleId) !== 3 && <Route path="schools" element={<School />}></Route>}
            <Route path="studentsAssessment" element={<StudentAssesment />}></Route>
            <Route path="studentsAssessmentGroup" element={<StudentAssessmentGroup />}></Route>
            <Route path="studentAssignment" element={<StudentAssignment />}></Route>
            <Route path="myAssignment" element={<MyAssignment />}></Route>
            <Route path="myAssignmentDetail/:id" element={<MyAssignmentDetail />}></Route>
            <Route path="startAssignment/:id" element={<StartAssignment />}></Route>
            <Route path="quickguide" element={<QuickGuide />}></Route>
            <Route path="createForm" element={<CustomForm />}></Route>
            <Route path="startAssignment/:assignmentId/:patientid" element={<StartAssignment />}></Route>

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
