import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import DialogBox from "../components/DialogBox";
import {authToken} from "../utils/commonUtil";

function ProtactiveRoute() {
  useEffect(() => {
    let token = authToken();
      if (token) {
        setValidUser(true)
      }else{
        setShowAlert(true)
      }
      setLoder(false)

    }, []);
  let navigate =  useNavigate()
  let [loader, setLoder] = useState(true);
  let [validUser, setValidUser] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  
  if (!loader && validUser) {
    return (
      <Outlet />
    );
  }
  else if(!validUser && !loader){
    return (
    <DialogBox openDialog={showAlert} handleSubmit={() => { setShowAlert(false); navigate("/auth/login")}} title="User not valid please login" buttonText="Ok" />
    );
  }
  return (
    <Loader open={loader} />
  );
}


export default ProtactiveRoute;





