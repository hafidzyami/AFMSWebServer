import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            AFMS
          </a>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active px-3" aria-current="page" href="/">
                Prakiraan Cuaca
              </a>
              <a className="nav-link active px-3" href="http://34.101.235.1:8080/dashboard/ddb116e0-7d20-11ee-a02e-a72213eb9bb7?publicId=6c24fc20-7d21-11ee-a02e-a72213eb9bb7">
                Soil Moisture Monitoring
              </a>
              <a className="nav-link active px-3" href="/pestmonitor">
                Pests Monitoring
              </a>
              <a className="nav-link active px-3" href="/servoledmonitor">
                Servo and LED Monitoring
              </a>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar