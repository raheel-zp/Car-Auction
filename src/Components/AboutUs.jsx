import React from "react";
import "./CookiePolicy.css";

function AboutUs() {
  return (
    <>
      <div
        className="event-banner"
        style={{ backgroundImage: "url(assets/img/h1.png)", height: "200px" }}
      >
        <div className="event-banner-text">
          <h3
            style={{
              fontSize: "25px",
              lineHeight: "24px",
              textDecoration: "none",
              color: "white",
            }}
          >
            ABOUT US
          </h3>
          <img
            style={{ height: "4rem" }}
            src="/assets/img/ev-icon.png"
            alt=""
          />
        </div>
      </div>
      <div className="cp_main">
        <div className="cp_con2">
          <div className="cp_2_header">ABOUT US?</div>
          <div className="cp_2_para">
            Welcome to Auto Auctions, the premier online auction platform
            dedicated to cars and automobilia enthusiasts. We are passionate
            about connecting buyers and sellers from around the world in a
            seamless and exciting online marketplace.
            <br /> <br />
            At Auto Auctions, we understand the thrill and joy that comes with
            collecting, buying, and selling exceptional vehicles and automotive
            artifacts. That's why we've created a platform that caters
            specifically to the needs of this vibrant community, offering a
            secure and dynamic environment for enthusiasts to pursue their
            automotive passions.
            <br /> <br />
            Our mission is to provide a transparent and user-friendly auction
            experience, where buyers can discover a wide range of high-quality
            vehicles and rare automobilia, and sellers can reach a global
            audience of passionate collectors. Whether you're in search of a
            classic beauty, a modern marvel, or that elusive piece of
            automobilia to complete your collection, Auto Auctions is the place
            to be.
            <br /> <br />
            What sets us apart is our commitment to excellence in every aspect
            of our service. We prioritise the integrity of our platform,
            ensuring that all listings are thoroughly vetted and accurately
            represented. Our user-friendly interface makes it easy for buyers to
            navigate the auctions, place bids, and track their favourite items.
            For sellers, we offer a seamless process to showcase their prized
            possessions to a dedicated audience, maximising their reach and
            potential.
            <br /> <br />
            Behind Auto Auctions is a team of automotive enthusiasts who are
            passionate about providing an exceptional auction experience. We are
            dedicated to supporting our community and fostering a sense of
            camaraderie among fellow collectors. Our knowledgeable and
            responsive customer support team is always ready to assist you
            throughout your journey, ensuring that your experience with us is
            nothing short of outstanding.
            <br /> <br />
            Welcome to Auto Auctions - where automotive passions meet online
          </div>
        </div>
      </div>
      auctions.
    </>
  );
}

export default AboutUs;
