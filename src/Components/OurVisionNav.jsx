import React from 'react'
import './OurVisionNav.css'

function OurVisionNav() {
  return (
    <>
      <div className="vision_header">
        <div className="vision_header_area">
            <div>OUR VISION</div>
            <p>
                At Auto Auctions, we're changing the game. Say goodbye to long, frustrating selling methods. We get it – dealerships and
                valuation sites taking a big chunk of your money? Not cool.
                <br /><br />
                Our vision is clear: We're here to make selling easy and profitable. You should get the most cash for your car,
                without sneaky fees. That's why we've built a platform that connects you directly with passionate buyers. 
                And guess what? We handle the marketing and pro photography, no extra cost.We'll capture its true value 
                through amazing photos and presentation. The result? You attract the right buyers and score the best value.
                <br /><br />
                You take control, no middlemen, no extra fees. We empower you to show off your 
                car's unique greatness and get the attention it deserves.
                <br /><br />
                Our vision is a fair and transparent online auction spot. We're here to redefine selling,
                making it rewarding, convenient, and super profitable.
                <br /><br />
                Ready to join us? Auto Auctions: where killer marketing, fair deals, and max returns come together.
                <br /><br />
                Let's unlock your car's full potential.
            </p>
        </div>
        <div className="vision_elem1_con v_con1_extra" >
            <div className="v_e1_left" style={{justifyContent:'center'}} >
                <div className='v_e1_width' >
                    <div className='c_e1_title' >DEALERSHIPS AND VALUATIONS SITES?</div>
                    <p className='c_e1_para' >
                        Disappointing lowball offers. They profit by purchasing your car at an overly low price.
                    </p>
                    <div className='c_e1_title' >LISTING YOUR CAR ONLINE?</div>
                    <p className='c_e1_para' >
                        Hagglers and time-wasters seeking bargains, not your car's true value.
                    </p>
                    <div className='c_e1_title' >FRUSTRATION & COMPROMISE</div>
                    <p className='c_e1_para' >
                        Frustrated? Thinking about dealerships or mass buyers? 
                        Settling for less than your car's worth? They profit, you lose.
                    </p>
                </div>
            </div>
            <div className="v_e1_right" style={{display:'flex',alignItems:'center'}} >
                <div className='v_e1_width' >
                    <img src="/assets/img/icon1.webp" alt="" />
                </div>
            </div>
        </div>
        <div className='c_e1_title2'>The Better Path: Our Way</div>
        <div className="vision_elem1_con">
            <div className="v_e1_left" style={{justifyContent: 'center'}} >
                <div className='v_e1_width' >
                    <img src="/assets/img/icon22.webp" alt="" />
                </div>                
            </div>
            <div className="v_e1_right">
                <div className='v_e1_width' >
                    <div className='c_e1_title' >PERSONALISED SERVICE</div>
                    <p className='c_e1_para' >
                        Unique needs, car details – we're here. Our team supports you, hassle-free.
                    </p>
                    <div className='c_e1_title' >PROFESSIONAL PHOTOGRAPHY</div>
                    <p className='c_e1_para' >
                        Pro photographers capture stunning car pics. Your collection to 
                        keep for free, they also power professional online marketing.
                    </p>
                    <div className='c_e1_title' >STRATEGIC & FAST AUCTION PROCESS</div>
                    <p className='c_e1_para' >
                        Together, we set a live auction date. We market your car with targeted ads for interested buyers. 
                        Your car shines for 7 days. Our network of enthusiasts bid, recognising true value.
                    </p>
                    <div className='c_e1_title' >BEST PRICE, NO COMPROMISES</div>
                    <p className='c_e1_para' >
                        Max Profits? That's our goal. Transparent auction, buyers compete, fair market value, 
                        max returns. You set your reserve.<br />
                        Farewell to low offers, endless haggling and dealers profiting off your car. 
                        Embrace the smooth, lucrative journey. Your car's value matters. <br />
                        Unlock your car's true worth.
                    </p>
                </div>
            </div>
        </div>
        {/* <div className="vision_elem1_con" >
            <div className="v_e1_left">
                <div className='v_e1_width' >
                    <div className='c_e1_title' >STRATEGIC & FAST AUCTION PROCESS</div>
                    <p className='c_e1_para' >
                        Together, we set a live auction date. We market your car with targeted ads for interested buyers. 
                        Your car shines for 7 days. Our network of enthusiasts bid, recognising true value.
                    </p>
                </div>              
            </div>
            <div className="v_e1_right">
                <div className='v_e1_width' >
                    <div className='c_e1_title' >BEST PRICE, NO COMPROMISES</div>
                    <p className='c_e1_para' >
                        Max Profits? That's our goal. Transparent auction, buyers compete, fair market value, 
                        max returns. You set your reserve.<br /> <br />
                        Farewell to low offers, endless haggling and dealers profiting off your car. 
                        Embrace the smooth, lucrative journey. Your car's value matters.<br /> <br />
                        Unlock your car's true worth.
                    </p>                    
                </div>
            </div>
        </div> */}
      </div>
      <div className="reating-last-btn" style={{background:'#01a3d2'}} >
          <div className="reating-last-btn-list">
            <ul>
              <li><a href="/sell-with-us">UNLOCK YOUR CARS VALUE <span className='bottom-banner-dots' >.</span> </a> </li>
              <li><a href="/sell-with-us">LIST FREE, SELL FAST <span className='bottom-banner-dots' >.</span> </a> </li>
              <li><a href="/sell-with-us">MAXIMISE PROFIT <span className='bottom-banner-dots' >.</span> </a> </li>
            </ul>
          </div>
          <a href="/sell-with-us">SELL MY CAR</a>
        </div>
    </>
  )
}

export default OurVisionNav
