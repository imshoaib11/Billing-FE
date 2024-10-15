import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'



function TopBar() {
    const user = sessionStorage.getItem('userName')
   
    const navigate = useNavigate()
    // console.log(user)
    
    const handleLogout = () => {
        sessionStorage.removeItem('userName')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        navigate('/login')
    }

    const dashBoard = () => {
      navigate('/bills')
    }

  return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" onClick={()=>dashBoard()}>Prince</a>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
    </ul>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i className="fa-solid fa-bars" style={{color: "#f5f5f5;"}}></i></span>
    </button> */}
    
    
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

     { user ? (<Dropdown >
                <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic" style={{float:'right'}} expand="lg">
                <i className="fa-regular fa-user fa-sm" style={{color: "#63E6BE"}}></i>    
                            { user}
                </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>handleLogout()}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                ) : 
                        
                (<>
                <li className="nav-item">
                <a className="nav-link" href="/signup">Register</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
                </li>
            </>)} 
      </ul>
    </div>
</nav>
  
  </>

  
}

export default TopBar