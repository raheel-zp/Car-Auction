import React from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <>
      {/* footer-area-start */}
      <div className="footer-area">
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
                          <li><a href="/">Live Auctions</a></li>
                          {/* <li><a href="/">Deal Now</a></li> */}
                          <li><a href="/">Coming Soon</a></li>
                          <li><a href="/">Recently Sold</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="single-footer-wedget">
                      <div className="wedget-title">
                        <h3>Sell</h3>
                      </div>
                      <div className="wedget-item">
                        <ul>
                          <li><a href="/sell-with-us">Sell My Car</a></li>
                          {/* <li><NavLink to='/shipping' onClick={()=>{window.scrollTo(0, 0)}}>Shipping</NavLink></li> */}
                          {/* <li><NavLink to='/managed-services' onClick={()=>{window.scrollTo(0, 0)}} >Managed Service</NavLink></li> */}
                        </ul>
                      </div>
                    </div>
                    {/* <div className="single-footer-wedget">
                      <div className="wedget-title">
                        <h3>News &amp; Events</h3>
                      </div>
                      <div className="wedget-item">
                        <ul>
                          <li><a href="/aricles">Articles</a></li>
                          <li><a href="/articles">Podcasts</a></li>
                          <li><a href="/events">Events</a></li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="single-footer-wedget">
                      <div className="wedget-title">
                        <h3>About</h3>
                      </div>
                      <div className="wedget-item">
                        <ul>
                          <li><a href="/login">Our Journey</a></li>
                          <li><a href="/login">Careers</a></li>
                          <li><NavLink to='/press-cutting' onClick={()=>{window.scrollTo(0, 0)}} >Press Cuttings</NavLink></li>
                        </ul>
                      </div>
                    </div> */}
                    <div className="single-footer-wedget">
                      <div className="wedget-title">
                        <h3>Support</h3>
                      </div>
                      <div className="wedget-item">
                        <ul>
                          <li><NavLink to='/faqs' onClick={()=>{window.scrollTo(0, 0)}} >Help &amp; FAQs</NavLink></li>
                          <li><a href="/sell-with-us">Contact Us</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="single-footer-wedget" >
                      <div className="wedget-title">
                        <h3>Legal</h3>
                      </div>
                      <div className="wedget-item">
                        <ul>
                          {/* <li><NavLink to='/faqs' href="/faqs" onClick={()=>{window.scrollTo(0, 0)}}>Imprint</NavLink></li> */}
                          <li><NavLink to='/privacy-policy' onClick={()=>{window.scrollTo(0, 0)}}>Privacy Policy</NavLink></li>
                          <li><NavLink to='/terms-and-conditions' onClick={()=>{window.scrollTo(0, 0)}}>Terms &amp; Conditions</NavLink></li>
                          {/* <li><NavLink to='/posting-rules' onClick={()=>{window.scrollTo(0, 0)}}>Posting Rules</NavLink></li> */}
                          <li><NavLink to='/cookie-policy' onClick={()=>{window.scrollTo(0, 0)}}>Cookie Policy</NavLink></li>
                          <li><NavLink to='/our-vision' onClick={()=>{window.scrollTo(0, 0)}}>Our Vision</NavLink></li>
                          {/* <l target='_blank'i><a href="/why-us">Why Choose Us?</a></l> */}
                          <li><NavLink to='/sell-with-us' onClick={()=>{window.scrollTo(0, 0)}}>Why Choose Us?</NavLink></li>
                          {/* <li><a href="/about-us">About Us?</a></li> */}
                          <li><NavLink to='/about' onClick={()=>{window.scrollTo(0, 0)}}>About Us?</NavLink></li>
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
                            <option value={1}>Coming Soon</option>
                            {/* <option value={2}>Another option</option>
                            <option value={3} disabled>A disabled option</option>
                            <option value={4}>Potato</option> */}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-copy" style={{display:'flex',justifyContent:'center'}} >
                    <div className="copy">
                      <p>Auto Auctions © Copyright 2023</p>
                    </div>
                    {/* <div className="footer-reate">
                      <h3>Excellent</h3>
                      <div className="ster">
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="fas fa-star" /></a>
                        <a href="#"><i className="far fa-star" /></a>
                      </div>
                      <p>614 reviews</p>
                    </div> */}
                    <div className="footer-socail">
                      <a href="https://youtube.com/@AutoAuctionsco?si=B-o65d8-lW8zzF7A" target='_blank'><i className="fab fa-youtube" /></a>
                      <a href="https://instagram.com/autoauctionsuk?igshid=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr" target='_blank'><i className="fab fa-instagram" /></a>
                      <a href="https://www.facebook.com/profile.php?id=61550920554035" target='_blank'><i className="fab fa-facebook-f" /></a>
                      <a href="https://twitter.com/autoauctionsco" target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill='#003949' viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                      </a>
                      {/* <a href="#"><i className="fab fa-instagram" /></a>
                      <a href="#"><i className="fab fa-linkedin-in" /></a>
                      <a href="#"><i className="fab fa-pinterest-p" /></a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* footer-area-end */}
          {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
    {/* <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/Popper.js"></script>
    <script src="assets/js/owl.carousel.min.js"></script>
    <script src="assets/js/jquery.counterup.min.js"></script>
    <script>
        jQuery(document).ready(function ($) {
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        });
    </script>
    <script src="assets/js/jquery.waypoints.min.js"></script>
    <script src="assets/js/slick.min.js"></script>
    <script src="assets/js/jquery.nice-select.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
        $('.partner__active').slick({
            centerPadding: '0px',
            slidesToShow: 4,
            dots: true,
            prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    </script>
    <script>
        var waypoint = new Waypoint({
            element: document.getElementById('waypoint'),
            handler: function (direction) {
                console.log('Scrolled to waypoint!')
            }
        })
    </script> */}
         
    </>
  )
}

export default Footer
