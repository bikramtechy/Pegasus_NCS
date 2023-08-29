import StudentTableList from "./components/StudentTableList";
import StudentForm from "./components/StudentsForm";
import ShowHideTabData from "../../utils/showHideTabData";
import { useSelector } from "react-redux";

export default function Students() {
  let { checkEmail } = useSelector((state: any) => {
    let { checkEmail } = state;
    return { checkEmail }
  })
  const clearErrorMessage = () => {
    if (checkEmail?.data?.message !== "") {
      checkEmail.data = checkEmail.initialState.data;
    }
  }
  return (
    <>
      <ShowHideTabData
        ListData={StudentTableList}
        TabFormData={StudentForm}
        modalType={true}
        height={"100%"}
        width={"50%"}
        showdialogbox={false}
        clearErrorMessage={clearErrorMessage}
      />
    </>
  );
}
