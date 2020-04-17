import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";


function Landing() {
    return (
        <div>
        
            <NavLink exact className="link" to="/signup">
            Signup
            </NavLink>
            <NavLink exact className="link" to="/signin">
            Signin
            </NavLink>
            <NavLink exact className="link" to="/clients">
            Clients
            </NavLink>

        </div>
    )
}

export default Landing
