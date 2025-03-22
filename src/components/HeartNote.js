import React from 'react'
import { Link } from 'react-router-dom'

function HeartNote() {
    const isLoggedIn = localStorage.getItem('token');
    return (
        <div className="bs-example">
            <div className="bg-light clearfix">
                <button className="btn custom-btn" disabled={!isLoggedIn}>
                    {isLoggedIn ?
                    <Link className="custom-link note align-center" aria-current="page" to="/open">Open Your Hearts</Link>: "Please Login to create your Hearts" }</button>
            </div>
        </div>
    )
}

export default HeartNote;
