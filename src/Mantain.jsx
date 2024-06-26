import React from 'react'

function Mantain() {
  return (
    <>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Title Here</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="assets/css/all.min.css" rel="stylesheet" />
        <link href="assets/css/fontawesome.css" rel="stylesheet" />
        <link href="assets/css/owl.carousel.min.css" rel="stylesheet" />
        <link href="assets/css/nice-select.css" rel="stylesheet" />
        <link href="assets/css/default.css" rel="stylesheet" />
        <link href="assets/css/style.css" rel="stylesheet" />
        <link href="assets/css/responsive.css" rel="stylesheet" />
        {/* <div className="overlay" />
        <div className="offcanva">
            <div className="cross">
            <a href="#"><i className="fal fa-times" /></a>
            </div>
            <div className="offcanva--menu">
            <ul>
                <li><a href="#">Buy</a></li>
                <li><a href="#">Sell</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">About</a></li>
            </ul>
            </div>
        </div> */}
        {/* header-area-start */}
        {/* <div className="header-area">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="header-fl">
                    <div className="site-logo">
                    <a href="index.html"><img src="assets/img/site-logo.png" alt="" /></a>
                    </div>
                    <div className="bars">
                    <a href="#"><i className="fa fa-bars" aria-hidden="true" /></a>
                    </div>
                    <div className="header-menu">
                    <ul>
                        <li><a href="#">Buy</a></li>
                        <li><a href="#">Sell</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                    <div className="header-btn">
                        <a href="#">Register</a>
                        <a href="#" className="login">Login</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div> */}
        {/* header-area-end */}
        {/* login-area-start */}
        <div className="login-area" style={{display:"none"}} >
            {/* <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="login-box">
                    <div className="login-title">
                    <h3>welcome back</h3>
                    <p>Please sign in to your account.</p>
                    </div>
                    <div className="login-form">
                    <form action="#" method="post">
                        <div className="single-login-input">
                        <label htmlFor="#">Email Address</label>
                        <div className="single-input">
                            <input type="text" placeholder="Email address" />
                        </div>
                        </div>
                        <div className="single-login-input">
                        <label htmlFor="#">Password</label>
                        <div className="single-input">
                            <input type="password" placeholder="Password" name="password" autoComplete="current-password" required id="id_password" />
                            <a href="#"><i className="fas fa-eye-slash" id="togglePassword" /></a>
                        </div>
                        <div className="login-forget">
                            <a href="#">Forgot your Password?</a>
                        </div>
                        </div>
                        <div className="single-login-check">
                        <label className="containers">Keep me signed in
                            <input type="checkbox" />
                            <span className="checkmark" />
                        </label>
                        </div>
                        <div className="login-btn">
                        <button type="submit">login</button>
                        </div>
                        <div className="login-text">
                        <p>Don't have an account yet?</p>
                        </div>
                        <div className="login-last-reg">
                        <a href="#">Register Here</a>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div> */}
        </div>
        {/* login-area-end */}
        {/* footer-area-start */}
        {/* <div className="footer-area">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="footer-fl">
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>Buy</h3>
                    </div>
                    <div className="wedget-item">
                        <ul>
                        <li><a href="#">Live Auctions</a></li>
                        <li><a href="#">Deal Now</a></li>
                        <li><a href="#">Coming Soon</a></li>
                        <li><a href="#">Recently Sold</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>Sell</h3>
                    </div>
                    <div className="wedget-item">
                        <ul>
                        <li><a href="#">Sell with us</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Managed Service</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>News &amp; Events</h3>
                    </div>
                    <div className="wedget-item">
                        <ul>
                        <li><a href="#">Articles</a></li>
                        <li><a href="#">Podcasts</a></li>
                        <li><a href="#">Events</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>About</h3>
                    </div>
                    <div className="wedget-item">
                        <ul>
                        <li><a href="#">Our Journey</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press Cuttings</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>Support</h3>
                    </div>
                    <div className="wedget-item">
                        <ul>
                        <li><a href="#">Help &amp; FAQs</a></li>
                        <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>Legal</h3>
                    </div>
                    <div className="wedget-item">
                        <ul>
                        <li><a href="#">Imprint</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms &amp; Conditions</a></li>
                        <li><a href="#">Posting Rules</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="single-footer-wedget">
                    <div className="wedget-title">
                        <h3>Settings</h3>
                    </div>
                    <div className="wedget-item">
                        <div className="footer-select">
                        <select>
                            <option data-display="English (EN)">English (EN)</option>
                            <option value={1}>Some option</option>
                            <option value={2}>Another option</option>
                            <option value={3} disabled>A disabled option</option>
                            <option value={4}>Potato</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="footer-copy">
                    <div className="copy">
                    <p>autoauction © CopyRight 2023</p>
                    </div>
                    <div className="footer-reate">
                    <h3>Excellent</h3>
                    <div className="ster">
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="far fa-star" /></a>
                    </div>
                    <p>614 reviews</p>
                    </div>
                    <div className="footer-socail">
                    <a href="#"><i className="fab fa-youtube" /></a>
                    <a href="#"><i className="fab fa-instagram" /></a>
                    <a href="#"><i className="fab fa-facebook-f" /></a>
                    <a href="#"><i className="fab fa-twitter" /></a>
                    <a href="#"><i className="fab fa-instagram" /></a>
                    <a href="#"><i className="fab fa-linkedin-in" /></a>
                    <a href="#"><i className="fab fa-pinterest-p" /></a>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div> */}
        {/* footer-area-end */}
        {/* jQuery first, then Popper.js, then Bootstrap JS */}
        </>

  )
}

export default Mantain
