import React from 'react';

function Header() {
  return (
    <>
    {/* Page Header*/}
    <header className="masthead" style={{backgroundImage: 'url("assets/img/home-bg.jpg")'}}>
    <div className="container position-relative px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
            <div className="site-heading">
            <h1>Lisa Miller Piano Studio</h1>
            <span className="subheading">Welcome to your studio home base! </span>
            <p>Check here for scheduling purposes, recital info, and links to resources you will use throughout the year.</p>
            </div>
        </div>
        </div>
    </div>
    </header>

    </>
  )
}

export default Header
