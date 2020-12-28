import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToast(msg){



  return(toast.error(msg,{
    position: "bottom-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,

  }));

}