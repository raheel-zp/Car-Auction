import React from 'react'
import './CookiePolicy.css'
import { Helmet } from 'react-helmet'
function CookiePolicy() {
  return (
    <>
    <Helmet>
        <title>Innovative Approaches to Transform Car Auctions, Uncover the Remarkable Truth!</title>
        <meta
          name='description'
          content="Discover the remarkable strategies behind the revolutionary car auction industry and 
            uncover powerful secrets to dominating the market. Start your journey towards uncommon success today!"
        />
        <link rel='canonical' href='/cookie-policy' />
    </Helmet>
        <div className="event-banner" style={{backgroundImage: 'url(assets/img/bg-faq.webp)',backgroundPosition: 'center 25%',height:'300px'}}>
            <div className="event-banner-text">
                <h3 style={{fontSize:'25px',lineHeight:'24px',textDecoration:'none',color:'white'}} >COOKIE POLICY</h3>
                <img style={{height:'4rem'}} src="/assets/img/ev-icon.png" alt="" />
            </div>
        </div>    
        <div className="cp_main">
            <div className="cp_con2">
                <div className="cp_2_header">Cookie Policy</div>
                <div className="cp_2_para">
                This website utilizes cookies and similar internet tracking technologies, which are small files downloaded to your device to collect data while you browse our websites and mobile apps.
                </div>
                <div className="cp_2_header">HOW WE USE COOKIES</div>
                <div className="cp_2_para">
                We use the collected data to enhance your browsing experience and enable specific features.
                You have the option to prevent cookies from being stored by adjusting your browser settings. However, disabling cookies may also disable certain functionalities and features of this site. Therefore, we recommend keeping cookies enabled for optimal site performance.
                </div>
                <div className="cp_2_header">THE COOKIES WE SET</div>
                <div className="cp_2_para">
                We utilize essential cookies necessary for the operation of specific site features.
                <ul className="cp_list">
                    <li>
                    <div className="cp_2_sub_header">Login-related cookies</div>
                    <div className="cp_2_description">
                        When you log in, cookies are employed to recognize and identify you upon your return, eliminating the need to log in each time. These cookies are typically removed or cleared when you log out, ensuring that restricted features and areas are accessible only when logged in.
                    </div>
                    </li>
                    <li>
                    <div className="cp_2_sub_header">Forms-related cookies</div>
                    <div className="cp_2_description">
                        When you submit data through forms, such as contact pages or comment forms, cookies may be set to securely process those transactions.
                    </div>
                    </li>
                    <li>
                    <div className="cp_2_sub_header">Site preferences cookies</div>
                    <div className="cp_2_description">
                        To provide you with a personalized experience, we offer functionality that allows you to set your preferences for how the site operates when in use. In order to remember your preferences, we utilize cookies to recall this information whenever you interact with pages affected by your preferences.
                    </div>
                    </li>
                </ul>
                </div>
                <div className="cp_2_header">THIRD-PARTY COOKIES</div>
                <div className="cp_2_para">
                We also utilize third-party services that place cookies on your device.
                <ul className="cp_list">
                    <li>
                    <div className="cp_2_sub_header">Google Analytics</div>
                    <div className="cp_2_description">
                        Google Analytics is used to help us understand how you use the site and identify areas for improvement. These cookies may track metrics such as your site visit duration and the pages you access, enabling us to create engaging content continuously.
                    </div>
                    </li>
                    <li>
                    <div className="cp_2_sub_header">Stripe</div>
                    <div className="cp_2_description">
                        Stripe is utilized for processing card payments, and it also sets cookies on your device for payment processing and fraud detection purposes.
                    </div>
                    </li>
                    <li>
                    <div className="cp_2_sub_header">Sharethis.com</div>
                    <div className="cp_2_description">
                        We employ Sharethis.com to present buttons and plugins that enable you to connect with social networks. To enable their functionality, social media platforms like Facebook, Instagram, and Twitter may set cookies through our site, which may enhance your profile on their respective platforms or contribute to the data they hold, as outlined in their respective privacy policies.
                    </div>
                    </li>
                </ul>
                </div>
                <div className="cp_2_header">ADDITIONAL INFORMATION</div>
                <div className="cp_2_para">
                You can view and adjust your current cookie preferences in the Cookie Settings.
                If you require further information, please feel free to contact us.
                </div>
            </div>
        </div>    
    </>
  )
}
export default CookiePolicy