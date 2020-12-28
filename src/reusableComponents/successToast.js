import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function SuccessToast(msg){



   return (toast.success(msg,{
    position: "bottom-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,

    
  }));

  
}