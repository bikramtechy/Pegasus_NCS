import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card
} from "@mui/material";
// import "../../style.scss";
import plus from "../../../../../assets/plus.png";
import heart from "../../../../../assets/heart.png";
import steth from "../../../../../assets/steth.png";
import ellipse from "../../../../../assets/ellipseVector.png";
import logo from "../../../../../assets/pegasus-logo.svg"
import { Link } from "react-router-dom";
import { decrypt, encrypt } from "../../../../../utils/encryptDecrypt";
import { changePasswordRequest } from "../../../../../redux/modules/auth/actions";
import DialogBox from "../../../../../components/DialogBox";
var CryptoJS = require("crypto-js");
const ResetPassword: React.FC = () => {
    let params = useParams();
    let navigate = useNavigate();
    const { email, token, user_id, role_id } = params
    let dispatch = useDispatch();
    const { changePasswordReducer } = useSelector((state: any) => {
        let { changePasswordReducer } = state
        return {
            changePasswordReducer
        }
    });

    let [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        redirect: false
    });
    const [formData, setformData] = useState({
        password: "",
        confirm_password: "",
        error: null
    })
    useEffect(() => {
        if (changePasswordReducer?.signIn) {
            let message;
            let showMessage = false;
            let redirect = false;
            if (changePasswordReducer?.error?.message) {
                showMessage = true
                message = changePasswordReducer?.error?.message
                delete changePasswordReducer.error
            } else if (changePasswordReducer?.signIn?.success) {
                showMessage = true;
                redirect = true;
                message = changePasswordReducer?.signIn?.message
                delete changePasswordReducer.signIn
            }
            if (showMessage) {
                setShowAlert({ show: true, title: message, redirect })
                setformData((prev)=>({...prev , password : "", confirm_password : ""}))
            }
        }
    }, [changePasswordReducer])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangePassword = (e: any) => {
        e.preventDefault();
        let data = {
            email: email,
            password: formData?.password,
            confrm_password : formData.confirm_password,
            token: token,
            user_id: user_id,
            roleId: role_id
        }
        dispatch(changePasswordRequest(data))
    }

    return (
        <>
            <Box className="loginBox">
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
                        <Typography variant="h6" fontWeight={1000}>
                            Change password for {email !== undefined ? email : null}
                        </Typography>
                    </Box>
                    <Box className="LoginInputs">
                        <Typography marginBottom={2} fontWeight={800}>
                            Password
                        </Typography>
                        <TextField value={formData.password} onChange={handleChange} label="Enter Password" name="password" type="password" fullWidth
                        />
                    </Box>
                    <Box className="LoginInputs">
                        <Typography marginBottom={2} fontWeight={800}>
                            Confirm password
                        </Typography>
                        <TextField value={formData.confirm_password} onChange={handleChange} label="Enter Confirm password" name="confirm_password" type="password" fullWidth
                        />
                    </Box>
                    <Box className="LoginActionContainer" marginBottom={2}>
                        <Button
                            variant="contained"
                            className="LoginButton"
                            onClick={(e) => handleChangePassword(e)}
                        >
                            Change password
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
                            <Link to={`/auth/login?type=${btoa('admin')}`} className="anchorText">
                                Back to login
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </Box>
            <DialogBox openDialog={showAlert.show} handleSubmit={() => { showAlert.redirect && navigate("/"); setShowAlert({ show: false, title: "", redirect: false }) }} title={showAlert.title} buttonText="Ok" />
        </>

    );
};

export default ResetPassword;