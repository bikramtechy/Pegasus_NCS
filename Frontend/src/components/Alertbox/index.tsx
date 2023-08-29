import Alert, { AlertColor } from '@mui/material/Alert';
type props = {
    handleClose: () => void;
    title: string,
    severity: AlertColor
  };

const AlertBox = ({ handleClose, title ,severity }: props) => {
  return (
    <Alert onClose={handleClose} severity={severity}>{title}</Alert>
  );
}

export default AlertBox;
