import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignINRequest, fetchSchoolSignINRequest, fetcStudentSignINRequest } from "../../../../../redux/modules/auth/actions";
import Loader from "../../../../../components/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card
} from "@mui/material";
import "../../style.scss";
import plus from "../../../../../assets/plus.png";
import heart from "../../../../../assets/heart.png";
import steth from "../../../../../assets/steth.png";
import ellipse from "../../../../../assets/ellipseVector.png";
import logo from "../../../../../assets/pegasus-logo.svg"
import { PEGASUS_ADMIN, SCHOOL, STUDENT } from '../../../../../utils/globalConstants'
import DialogBox from "../../../../../components/DialogBox";
import { decrypt } from "../../../../../utils/encryptDecrypt";
import { Link } from "react-router-dom";

export interface LogInFormData {
  email: string;
  password: string;
  schoolId?: string;
}

const LogInPage: React.FC = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [roleId, setRoleId] = useState()
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    redirect: false
  });

  const [formData, setFormData] = useState<LogInFormData>({
    email: "",
    password: "",
    schoolId: ""
  });

  const { signIn, schoolLoginReducer, studentLoginReducer } = useSelector((state: any) => {
    let { schoolLoginReducer, studentLoginReducer, login: signIn } = state
    return {
      schoolLoginReducer,
      studentLoginReducer,
      signIn
    }
  });

  useEffect(() => {
    if (signIn || schoolLoginReducer?.signIn || studentLoginReducer?.signIn) {
      let message;
      let showMessage = false;
      let redirect = false;
      if (signIn?.error?.message && atob(searchParams.get('type') as any) === PEGASUS_ADMIN) {
        showMessage = true
        message = signIn?.error?.message
        delete signIn.error
      } else if (signIn?.signIn?.success) {
        showMessage = true;
        redirect = true;
        message = signIn?.signIn?.message
        delete signIn.signIn
      }
      else if (schoolLoginReducer?.error?.message && atob(searchParams.get('type') as any) === SCHOOL) {
        showMessage = true
        message = schoolLoginReducer?.error?.message
        delete schoolLoginReducer.error
      } else if (schoolLoginReducer?.signIn?.success) {
        showMessage = true;
        redirect = true;
        message = schoolLoginReducer?.signIn?.message
        delete schoolLoginReducer.signIn
      }
      else if (studentLoginReducer?.error?.message && atob(searchParams.get('type') as any) === STUDENT) {

        showMessage = true
        message = studentLoginReducer?.error?.message
        delete studentLoginReducer.error
      } else if (studentLoginReducer?.signIn?.success) {
        showMessage = true;
        redirect = true;
        message = studentLoginReducer?.signIn?.message
        delete studentLoginReducer.signIn
      }
      if (showMessage) {
        setShowAlert({ show: true, title: message, redirect })
      }
      if (showMessage) {
        setShowAlert({ show: true, title: message, redirect })
      }
    }
  }, [navigate, signIn, schoolLoginReducer, studentLoginReducer])

  const handleLogin = () => {
    if (atob(searchParams.get('type') as any) === PEGASUS_ADMIN) {
      dispatch(fetchSignINRequest(formData));
    }
    else if (atob(searchParams.get('type') as any) === SCHOOL) {
      dispatch(fetchSchoolSignINRequest(formData));
    }
    else if (atob(searchParams.get('type') as any) === STUDENT) {
      dispatch(fetcStudentSignINRequest(formData));
    }
  };

  const handleChangeNavigate = () => {
    const item = localStorage.getItem("item");
    let payload
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      payload = JSON.parse(window.atob(parts[1]));
    }
    if (showAlert.redirect && payload.roleId === 2) {
      navigate("/myAssignment")
    }
    else if (showAlert.redirect) {
      navigate("/dashboard");
      setShowAlert({ show: false, title: "", redirect: false })
    }
    else {
      setShowAlert({ show: false, title: "", redirect: false })
    }
  }
  return (
    <Box className="loginBox">
      {signIn.loading && <Loader open={signIn.loading} />}
      <Card variant="outlined" className="LoginContainer">
        <img src={heart} alt="Heart" className="plusIcon" />
        <img src={plus} alt="Heart" className="heartIcon" />
        <img src={steth} alt="Heart" className="stethIcon" />
        <img src={ellipse} alt="Heart" className="ellipseIcon" />
        <Box className="LoginHeaderContainer">
          <img src={logo} alt="logo" style={{
            width: "230px",
            height: "90px",
            marginBottom: "30px"
          }} />
          <Typography variant="h4" fontWeight={1000}>
            Login
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome back! Please enter your details to continue.
          </Typography>
        </Box>
        {
          (atob(searchParams.get('type') as any) === PEGASUS_ADMIN || atob(searchParams.get('type') as any) === STUDENT)
            ?
            <Box className="LoginInputContainer">
              <Box className="LoginInputs">
                <Typography marginBottom={2} fontWeight={800}>
                  Email ID
                </Typography>
                <TextField
                  onChange={(newValue) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      email: newValue.target.value,
                    }))}
                  label="Enter Email ID"
                  value={formData.email}
                  fullWidth
                />
              </Box>
              <Box className="LoginInputs">
                <Typography marginBottom={2} fontWeight={800}>
                  Password
                </Typography>
                <TextField label="Enter Password" type="password" fullWidth value={formData.password}
                  onChange={(newValue) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      password: newValue.target.value,
                    }))} />
              </Box>
            </Box>
            : atob(searchParams.get('type') as any) === SCHOOL ?
              <Box className="LoginInputContainer">
                <Box className="LoginInputs">
                  <Typography marginBottom={2} fontWeight={800}>
                    School ID
                  </Typography>
                  <TextField
                    onChange={(newValue) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        schoolId: newValue.target.value,
                      }))}
                    label="Enter School ID"
                    value={formData.schoolId}
                    fullWidth
                  />
                </Box>
                <Box className="LoginInputs">
                  <Typography marginBottom={2} fontWeight={800}>
                    Email ID
                  </Typography>
                  <TextField
                    onChange={(newValue) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        email: newValue.target.value,
                      }))}
                    label="Enter Email ID"
                    value={formData.email}
                    fullWidth
                  />
                </Box>
                <Box className="LoginInputs">
                  <Typography marginBottom={2} fontWeight={800}>
                    Password
                  </Typography>
                  <TextField label="Enter Password" type="password" fullWidth value={formData.password}
                    onChange={(newValue) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        password: newValue.target.value,
                      }))} />
                </Box>
              </Box> : null
        }

        <Box className="LoginActionContainer" marginBottom={2}>
          <Button
            onClick={handleLogin}
            variant="contained"
            className="LoginButton"
          >
            Login
          </Button>
        </Box>
        <Box className="btmRow">
          <Typography>
            Don't have an account?{" "}
            <a href="" className="anchorText">
              Signup
            </a>
          </Typography>
          <Typography>
            <Link to={`/forgot-password?type=${searchParams.get('type')}`} className="anchorText">
              Forgot password
            </Link>
          </Typography>
        </Box>
      </Card>
      <DialogBox openDialog={showAlert.show} handleSubmit={() => handleChangeNavigate()} title={showAlert.title} buttonText="Ok" />
    </Box>
  );
};

export default LogInPage;