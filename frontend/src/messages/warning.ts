import Swal from 'sweetalert2';

const WarningAlert = (message: string) => {

    return Swal.fire({
        icon: 'warning',
        title: 'Atencion!',
        text: message,
    });
}

export default WarningAlert;