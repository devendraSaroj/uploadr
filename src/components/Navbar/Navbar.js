import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="nav">
            <div className="logo">
            <Link to="/uploadr"><li>Uploadr</li></Link>
            </div>
            <div className="nav__items">
                <Link to="/albums">
                    <li>Albums</li>
                </Link>
            </div>
        </div>
    )
}
