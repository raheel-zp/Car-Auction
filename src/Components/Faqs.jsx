import React from 'react'

function Faqs() {
  return (
        <div>
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
            {/* header-area-start */}
            {/* <div className="header-area">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="header-fl">
                        <div className="site-logo">
                        <a href="index.html"><img src="assets/img/site-logo.png" alt="" /></a>
                        </div>
                        <div className="header-menu">
                        <ul>
                            <li><a href="/login">Buy</a></li>
                            <li><a href="/login">Sell</a></li>
                            <li><a href="/login">News</a></li>
                            <li><a href="/login">Events</a></li>
                            <li><a href="/login">About</a></li>
                        </ul>
                        <div className="header-btn">
                            <a href="/login">Register</a>
                            <a href="/login" className="login">Login</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div> */}
            {/* header-area-end */}
            {/*press-area*/}
            <div className="event-banner press-banner" style={{backgroundImage: 'url(assets/img/bg-faq.webp)',backgroundPosition: 'center 25%'}}>
                <div className="event-banner-text">
                <h3>AUTO AUCTIONS FAQS</h3>
                <img src="assets/img/ev-icon.png" alt="" />
                </div>
            </div>
            {/*press-area*/}
            {/*faq--area--start*/}
            <div className="faq__area">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="faq__wrap">
                        <div className="faq__main">
                        <div className="faq_flex">
                            <div className="nav faq__single" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">SELLING</button>
                            <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">BUYING</button>
                            {/* <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">USEFUL TIPS</button> */}
                            {/* <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">SUPPORT</button> */}
                            {/* <button className="faq-link" id="v-pills-settings-tabs" data-bs-toggle="pill" data-bs-target="#v-pills-settingss" type="button" role="tab" aria-controls="v-pills-settingss" aria-selected="false">Settings</button> */}
                            </div>
                            <div className="tab-content tab__body__wd" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <div className="faq__inner">
                                <div className="faq__inner__title">
                                    <h3>Top Rated Questions</h3>
                                </div>
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingOne">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <h5>How can I determine if you are interested in my offering?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>We have a passion for all kinds of cars, spanning various eras from classic vintage icons to modern era cars. To share details about your offering, click the "SELL" link located in the top menu.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingTwo">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <h5>What level of detail is required regarding the history, appearance, and mechanical condition of the auction lot?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>At Auto Auctions, our primary objective is to uphold the utmost accuracy in our listings. To achieve this, we request that you provide us with as much information as possible about the auction lot. It is essential to include not only the positive aspects but also any less desirable parts of its history or appearance. While Collecting Cars does conduct verification processes, such as HPI and MOT checks in the UK, it's important to understand that we cannot be held liable for any errors, misstatements, or omissions in the description of any Auction Lot. Thus, by furnishing us with comprehensive and transparent details, you contribute to a precise representation of your lot, enhancing its appeal to potential buyers.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingThree">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <h5>Is it possible to set a minimum selling price for the auction lot?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>Absolutely! As a seller, you have the option to request that your lot is auctioned with a reserve price. The reserve price is the minimum amount you are willing to accept for the lot. To ensure a realistic reserve value, the Auto Auctions team will work closely with you to reach an agreeable amount. Once the reserve is mutually agreed upon, you have the flexibility to reduce or withdraw it. We strive to maintain a fair and transparent auction process, and setting a reasonable reserve helps ensure the best possible outcome for both the seller and potential buyers.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingFour">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        <h5>What occurs after my auction lot is live?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                            <p>Once your auction lot is open for bidding, it becomes visible to all registered users on our platform. During this phase, potential buyers have the opportunity to ask questions about the lot by posting them in the comments section below the listing. Engaging with potential buyers in a timely manner provides clarity, and increases the likelihood of a successful auction outcome. So, stay attentive to the comments section and address any questions or concerns from interested bidders as soon as possible.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingFive">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                        <h5>What if someone posts a negative comment about my auction lot?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                            <p>If you come across a comment that you believe is inaccurate or unjustified, we urge you to get in touch with us. Our team of moderators is here to ensure fair and respectful interactions.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingSix">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                        <h5>Can I review and approve the auction listing before it goes live?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                            <p>Yes, absolutely! As a seller, you will have the opportunity to review and approve the auction listing before it is made public and open for bidding. It is crucial that you carefully assess the content and ensure that it provides an accurate description of the auction lot. By approving the listing, you take responsibility for its accuracy and help maintain the integrity of the auction process. If you have any concerns or need to make adjustments, please don't hesitate to communicate with our team, and we'll be happy to assist you.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingSeven">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                        <h5>Is it permissible to bid on my own auction lot?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                            <p>
                                                No, it is strictly prohibited for sellers to bid on their own auction lot or to have someone else bid on their behalf. Such practices are in direct violation of our policies. If we suspect that you or someone acting on your behalf has placed bids on your own Auction Lot, resulting in the lot not being sold to a genuine bidder, you will be held liable for covering all costs incurred by Auto Auctions due to the distortion of the auction results, along with breaching the Terms and Conditions.
                                                <br />
                                                In the event that it comes to light that you or someone on your behalf has engaged in "bid up" activities, we are obligated to disclose this information to the buyer. The buyer will then have the option to withdraw from the purchase without any financial repercussions. However, as the seller, you will be responsible for covering all costs incurred by Auto Auctions in such a scenario. Additionally, engaging in fraudulent bidding practices may lead to a permanent ban from using our platform, and you may also face legal consequences for committing acts of fraud or other criminal offenses.
                                                <br />
                                                At Auto Auctions, we prioritize fairness and integrity in our auction process. Bidding on your own auction lot undermines the trust we have established with our community of buyers and sellers, and it is essential that we maintain a level playing field for all participants.
                                            </p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingEight">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                        <h5>What occurs at the end of the auction if the auction lot gets sold?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseEight" className="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                            <p>When an auction lot successfully sells on our platform, a premium (as outlined in our fees section below) will be automatically deducted from the winning bidder's credit card. This premium represents the fee for utilizing our platform and is not a down payment for the auction lot itself. Subsequently, the seller and the buyer are digitally "introduced" to each other, facilitating the smooth completion of the transaction. The introduction allows both parties to connect and finalize the necessary steps to complete the purchase. Our aim is to provide a seamless and secure experience for both sellers and buyers throughout the entire auction process.</p>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingNine">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                                        <h5>What happens if there are no bids above my reserve price?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseNine" className="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                            If the auction lot fails to receive bids that surpass the reserve price, we have a provisional process in place. If the highest bid during the auction is within 10% of the reserve price, Auto Auctions may provisionally sell the auction lot to the highest bidder. The seller will be informed of the highest bid submitted during the auction. Subsequently, the seller will have a 24-hour window from the end of the auction to either accept or reject this bid. This timeframe can be extended if both parties agree.
                                            <br />
                                            In case there is no agreement to extend, and the seller does not notify the buyer of the acceptance of their final bid within 24 hours after the auction's end, it will be considered rejected. If the bid is accepted by the seller, we will facilitate communication between the buyer and seller to proceed with the sale of the auction lot.
                                            <br />
                                            It is important to note that Auto Auctions, at our discretion, may choose to cover the difference between the highest bid and the reserve if the highest bid falls short of meeting the reserve price. We aim to ensure a fair and satisfactory outcome for both buyers and sellers, even if the reserve price is not met during the auction.
                                        </div>
                                    </div>
                                    </div>                                   
                                    
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <div className="faq__inner">
                                <div className="faq__inner__title">
                                    <h3>Top Rated Questions</h3>
                                </div>
                                <div className="accordion accordion-flush" id="accordionFlushExample">                                                                        

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingOne">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                <h5>Can I contact the seller during the auction?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Absolutely! If you have any questions about the auction lot, you can post them as comments directly on the listing. The seller will have the opportunity to respond to your inquiries. This approach prevents duplicate questions from other bidders and ensures a smooth communication process.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingTwo">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                <h5>Can I inspect the auction lot in person during the auction?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Certainly! Buyers are welcome to request a viewing to see an auction lot in person. We encourage sellers to make auction lots available for viewings at convenient times. However, it's important to note that buyers and sellers must refrain from engaging in any activity aimed at completing or facilitating a transaction for the sale or purchase of an auction outside of our platform.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingThree">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                                <h5>How do I know whether the auction lot has a reserve price?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Unless being sold at 'No Reserve,' all auction lots come with a reserve price.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingFour">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                                <h5>Can other bidders 'snipe' at the end of an auction to outbid me?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Our platform has measures to prevent sniping. If a bid is received within the last two minutes of the auction, an extra two minutes will be automatically added to allow other bidders to respond. The auction will only end when there are no further bids within a two-minute window after the last bid.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingFive">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                                <h5>Can I withdraw a bid?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Once a bid has been placed, it cannot be withdrawn. If you are the successful buyer and fail to complete the purchase of an auction for any reason other than the seller's default, you will be obliged to pay the premium, as detailed in our fees section, based on your highest bid.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingSix">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                                <h5>What happens at the end of the auction if I have won the bidding?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Congratulations on winning the auction! When an auction lot successfully sells on our platform, a premium, as detailed in our fees section, will be automatically deducted from your credit card. This premium represents the fee for using the platform and is not a down payment for the auction lot. Afterward, you will be digitally introduced to the seller to facilitate the completion of the transaction. Please note that there are no refunds on the buyer's premium.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingSeven">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                                <h5>What happens if the auction lot has some defects that were not mentioned in the auction listing?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>Auto Auctions hosts auction listings, but the seller is responsible for confirming the accuracy of the listing. As a bidder, it is your responsibility to thoroughly satisfy yourself with the details and condition of the auction lot before placing a bid. The Consumer Rights Act 2015 applies to all sales by traders made to consumers, whether sold by an individual or a business. The Act ensures that goods purchased by a consumer must meet certain minimum standards, including being of satisfactory quality, as described, and fit for purpose. For more information on consumer rights in the United Kingdom, please visit the Citizens Advice website at <a href="www.citizensadvice.org.uk/consumer">www.citizensadvice.org.uk/consumer</a> .</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingEight">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                                <h5>Does the buyer's premium include transport or storage?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>The buyer's premium is solely a fee for using the platform. Auto Auctions is not responsible for the transport or storage of any auction lots, and any associated costs are the responsibility of the buyer.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingNine">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                                                <h5>What are the bid increments?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseNine" class="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>The bid increments after the opening bid are as follows:</p>
                                                <ul style={{listStyleType: 'disc',paddingLeft:'20px'}} >
                                                    <li>£100 increments up to £10,000</li>
                                                    <li>£250 increments from £10,000 to £50,000</li>
                                                    <li>£500 increments from £50,000 upwards</li>
                                                </ul>
                                                <p>These bid increments will apply when opting for absentee bidding.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="faq-item">
                                        <h2 class="faq-header" id="flush-headingTen">
                                            <button class="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                                                <h5>What do the different types of sellers mean?</h5>
                                                <span><i class="fas fa-caret-down"></i></span>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTen" class="accordion-collapse collapse" aria-labelledby="flush-headingTen" data-bs-parent="#accordionFlushExample">
                                            <div class="faq__body_tx">
                                                <p>We classify our sellers into two categories:</p>
                                                <ul style={{listStyleType: 'disc',paddingLeft:'20px'}} >
                                                    <li><strong>Trade Sellers:</strong> They act as businesses rather than individual consumers. The business may own the car or have the authority to manage the sale on behalf of the end consumer. As a trade seller, they must follow all government requirements and regulations and operate under the Consumer Rights Act 2015, ensuring that goods meet certain minimum standards. If you have purchased from a dealer, the sale item must be of "satisfactory quality," "as described," and "fit for purpose." For more information on your consumer rights, visit the Citizens Advice website at <a href="www.citizensadvice.org.uk/consumer">www.citizensadvice.org.uk/consumer</a>.</li>
                                                    <li><strong>Private Sellers:</strong> They are direct end consumers who personally own the car. If you win the auction, you will deal with the private seller directly to arrange a viewing and conclude the sale of the auction lot.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            {/* <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <div className="faq__inner">
                                <div className="faq__inner__title">
                                    <h3>Top Rated Questions</h3>
                                </div>
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingOne">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <h5>What premium would I pay when buying a number plate?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>It costs nothing to register with Collecting Cars.</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingTwo">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <h5>How much does it cost to register with Collecting Cars?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>It costs nothing to register with Collecting Cars.</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingThree">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <h5>What premium would I pay when buying a number plate?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>Buyers in the UK pay 7.2% including VAT (£300 minimum and £7,200 maximum), buyers in Australia pay 6% plus GST if applicable.</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                <div className="faq__inner">
                                <div className="faq__inner__title">
                                    <h3>Top Rated Questions</h3>
                                </div>
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingOne">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <h5>What premium would I pay when buying a number plate?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>It costs nothing to register with Collecting Cars.</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingTwo">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <h5>How much does it cost to register with Collecting Cars?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>It costs nothing to register with Collecting Cars.</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingThree">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <h5>What premium would I pay when buying a number plate?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>Buyers in the UK pay 7.2% including VAT (£300 minimum and £7,200 maximum), buyers in Australia pay 6% plus GST if applicable.</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-settingss" role="tabpanel" aria-labelledby="v-pills-settings-tabs">
                                <div className="faq__inner">
                                <div className="faq__inner__title">
                                    <h3>Top Rated Questions</h3>
                                </div>
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingOne">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <h5>What premium would I pay when buying a number plate?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>It costs nothing to register with Collecting Cars.</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingTwo">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        <h5>How much does it cost to register with Collecting Cars?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>It costs nothing to register with Collecting Cars.</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="faq-item">
                                    <h2 className="faq-header" id="flush-headingThree">
                                        <button className="faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        <h5>What premium would I pay when buying a number plate?</h5>
                                        <span><i className="fas fa-caret-down" /></span>
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="faq__body_tx">
                                        <p>Buyers in the UK pay 7.2% including VAT (£300 minimum and £7,200 maximum), buyers in Australia pay 6% plus GST if applicable.</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/*faq--area--end*/}
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
                            <li><a href="/login">Live Auctions</a></li>
                            <li><a href="/login">Deal Now</a></li>
                            <li><a href="/login">Coming Soon</a></li>
                            <li><a href="/login">Recently Sold</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="single-footer-wedget">
                        <div className="wedget-title">
                            <h3>Sell</h3>
                        </div>
                        <div className="wedget-item">
                            <ul>
                            <li><a href="/login">Sell with us</a></li>
                            <li><a href="/login">Shipping</a></li>
                            <li><a href="/login">Managed Service</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="single-footer-wedget">
                        <div className="wedget-title">
                            <h3>News &amp; Events</h3>
                        </div>
                        <div className="wedget-item">
                            <ul>
                            <li><a href="/login">Articles</a></li>
                            <li><a href="/login">Podcasts</a></li>
                            <li><a href="/login">Events</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="single-footer-wedget">
                        <div className="wedget-title">
                            <h3>About</h3>
                        </div>
                        <div className="wedget-item">
                            <ul>
                            <li><a href="/login">Our Journey</a></li>
                            <li><a href="/login">Careers</a></li>
                            <li><a href="/login">Press Cuttings</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="single-footer-wedget">
                        <div className="wedget-title">
                            <h3>Support</h3>
                        </div>
                        <div className="wedget-item">
                            <ul>
                            <li><a href="/login">Help &amp; FAQs</a></li>
                            <li><a href="/login">Contact Us</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="single-footer-wedget">
                        <div className="wedget-title">
                            <h3>Legal</h3>
                        </div>
                        <div className="wedget-item">
                            <ul>
                            <li><a href="/login">Imprint</a></li>
                            <li><a href="/login">Privacy Policy</a></li>
                            <li><a href="/login">Terms &amp; Conditions</a></li>
                            <li><a href="/login">Posting Rules</a></li>
                            <li><a href="/login">Cookie Policy</a></li>
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
                            <a href="/login"><i className="fas fa-star" /></a>
                            <a href="/login"><i className="fas fa-star" /></a>
                            <a href="/login"><i className="fas fa-star" /></a>
                            <a href="/login"><i className="fas fa-star" /></a>
                            <a href="/login"><i className="fas fa-star" /></a>
                        </div>
                        <p>614 reviews</p>
                        </div>
                        <div className="footer-socail">
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        <a href="/login"><i className="fab fa-instagram" /></a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div> */}
            {/* footer-area-end */}
            {/* jQuery first, then Popper.js, then Bootstrap JS */}
            <script src="assets/js/jquery.min.js"></script>
          <script src="assets/js/Popper.js"></script>
          <script src="assets/js/owl.carousel.min.js"></script>
          <script src="assets/js/jquery.nice-select.js"></script>
          <script src="assets/js/bootstrap.min.js"></script>
          <script src="assets/js/main.js"></script>
        </div>
  )
}

export default Faqs
