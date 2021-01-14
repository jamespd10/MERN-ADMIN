import Swal from 'sweetalert2';

const SuccessAlert = (message: string) => {

    return Swal.fire({
        icon: 'success',
        title: 'Yeah!',
        text: message,
        showConfirmButton: false,
        timer: 2000
    });
}

export default SuccessAlert;