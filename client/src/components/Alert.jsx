
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Alert(props) {
  useEffect(() => {
    if (props.alert) {
      Swal.fire({
        position: "top",
        icon: props.alert.ty, // Use 'ty' if provided, else default to 'success'
        title: props.alert.msg,
        showConfirmButton: false,
        timer: 2000
      });
    }
  }, [props.alert]); // Trigger effect when props.alert changes

  return null; // No need to render anything
}
