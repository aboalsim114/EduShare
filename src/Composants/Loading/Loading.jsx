import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading(props) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <ReactLoading type={"spin"} color={"orange"} height={100} width={100} />
            <h3 className="mt-3 text-orange" style={{ fontFamily: "sans-serif" }}>{props.message}</h3>
        </div>
    );
}
