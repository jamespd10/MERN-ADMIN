import Swal from 'sweetalert2';

const ErrorAlert = (message: string) => {

    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
}

export default ErrorAlert;