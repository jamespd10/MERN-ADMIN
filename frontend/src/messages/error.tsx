import React from 'react';

const ErrorAlert: React.FC = (props: any) => {
    return (
        <div className="row justify-content-center">
            <div className="col-sm-5">
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className="text-center">
                        <span className="text-danger display-4">
                            <i className="las la-exclamation-triangle"></i>
                        </span><br />
                        {props.message}
                    </p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        </div>
    );
}

export default ErrorAlert;