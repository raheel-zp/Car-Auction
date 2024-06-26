import React from "react";
import "./CookiePolicy.css";
function WhyUs() {
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
            WHY CHOOSE US?
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
          <div className="cp_2_header">WHY CHOOSE US?</div>
          <div className="cp_2_para">
            Why Us?
            <ul>
                <li>
                    The Truly Free Service: At Auto Auctions, we take pride in being the only truly free 
                    service available for selling your car. We believe that you deserve to keep every 
                    penny of your hard-earned money when selling your vehicle. With us, you can list 
                    and sell your car without any upfront fees or hidden costs.
                </li>
                <li>
                    Professional Photography and Marketing: We go the extra mile to ensure that your 
                    car stands out in the online marketplace. Our dedicated team of professionals will 
                    photograph and market your car with expertise, showcasing its best features and 
                    capturing the attention of potential buyers. This service comes at no cost to you, 
                    giving your car the exposure it deserves and maximising its value.
                </li>
                <li>
                    Get the Best Value: Selling a car is not just about finding a buyer; it's about getting 
                    the best value for your vehicle. At Auto Auctions, we understand this importance 
                    and work tirelessly to ensure that you receive the highest possible return. Our 
                    extensive network of passionate car enthusiasts and collectors ensures that your 
                    car reaches the right audience, increasing the chances of receiving competitive bids 
                    and maximising your profit.
                </li>
                <li>
                    Say Goodbye to Lowball Offers: Tired of receiving lowball offers from corporations 
                    or wasting time with haggling and negotiations? With Auto Auctions, you can put an 
                    end to these frustrations. Our platform empowers you to set your own reserve price, 
                    giving you control over the minimum amount you're willing to accept for your car. 
                    You no longer have to settle for less than your car's true value.
                </li>
                <li>
                    Time-Saving Convenience: Selling a car through traditional methods can be time consuming and exhausting. 
                    <br />
                    From arranging meetings and test drives to dealing with 
                    paperwork and negotiations, it can be a draining process. With Auto Auctions, you 
                    can save valuable time and energy. Our streamlined online auction platform allows 
                    you to reach a wide audience of potential buyers with ease, eliminating the need for 
                    tedious in-person interactions and minimising the hassle.
                </li>
                <li>
                    Experience the Difference: Choose Auto Auctions as your preferred online auction platform 
                    for selling cars and automobilia. We offer a truly free service, professional photography 
                    and marketing, and a commitment to getting you the best value for your vehicle. Say 
                    goodbye to lowball offers and wasted time. Join us and discover a convenient and 
                    rewarding way to sell your car.
                </li>
            </ul>
                Sell with confidence, sell with Auto Auctions.
          </div>

        </div>
      </div>
    </>
  );
}
export default WhyUs;
