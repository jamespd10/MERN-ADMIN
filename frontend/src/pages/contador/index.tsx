import React, { useState, useEffect, } from 'react';

const Contador: React.FC = (props: any) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = props.title;
    });
    return (
        <div className="container my-4">
            <h1>{props.title}</h1>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header text-center text-light bg-dark"><h5>Sobre nosotros</h5></div>
                        <div className="card-body text-center bg-danger display-6 text-light">
                            <p>Danger count: <br /> {count}</p>
                        </div>
                        <div className="card-footer text-center text-light bg-dark">
                            <button className="btn btn-primary mx-2" onClick={() => setCount(count + 1)}>
                                Aumentar
                            </button>
                            <button className="btn btn-danger mx-2" onClick={() => setCount(count - 1)}>
                                Disminuir
                            </button>
                            <button className="btn btn-secondary mx-2" onClick={() => setCount(0)}>
                                Reiniciar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contador;