import React from 'react';

function Footer() {
  return (
    <>
        {/* Footer*/}
        <footer className="border-top">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
                <ul className="list-inline text-center">
                <li className="list-inline-item">
                    {/* <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a> */}
                </li>
                <li className="list-inline-item">
                    {/* <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a> */}
                </li>
                <li className="list-inline-item">
                    {/* <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a> */}
                </li>
                </ul>
                <div className="small text-center text-muted fst-italic">Lisa Miller Piano Studio 2025</div>
            </div>
            </div>
        </div>
        </footer>

    </>
  )
}

export default Footer