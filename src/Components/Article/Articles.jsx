import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ArticleCategory from './ArticleCategory';
import { userloggedIn } from '../Context/Context';
import { Helmet } from 'react-helmet';

function Articles() {
  const [Articles,setArticles] = React.useState([]);
  const [Cars,setCars] = React.useState([]);
  const [EventsHighlights,setEventsHighlights] = React.useState([]);
  const [ChrisHaris,setChrisHaris] = React.useState([]);
  const [Watches,setWatches] = React.useState([]);
  const [MarketUpdates,setMarketUpdates] = React.useState([]);
  const [articlesLoading,setarticlesLoading] = React.useState(false);
  const [emptyArticle,setemptyArticle] = React.useState(false);
  const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
  
  const allArticles = async ()=>{
      setarticlesLoading(true);
      const res = await fetch(`${url}allArticles`,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
        "authToken": localStorage.getItem("authToken"),
      }
      });
      const data = await res.json();
      if(data.msg === 'success'){
        //   console.log(data.data);
        setArticles(data.data);
        // setCars(data.data.filter((article) => article.category === 'Cars'));
        setEventsHighlights(data.data.filter((article) => article.category === 'Event Highlights'));
        // setChrisHaris(data.data.filter((article) => article.category === 'Chris Haris'));
        // setWatches(data.data.filter((article) => article.category === 'Watches'));
        setMarketUpdates(data.data.filter((article) => article.category === 'Market Updates'));
      }
      setarticlesLoading(false);
  }
    // allArticles();
  React.useEffect(()=>{
    allArticles();
  },[]);

    return (
      <>
      <Helmet>
        <title>Car auctions UK: stay up to date and learn how to maximise profits!</title>
        <meta
          name='description'
          content='Looking for professional advice on car auctions news? Look no further! 
          Our experts discuss the latest trends and updates in the industry.'
        />
        <link rel='canonical' href='/products-comingsoon' />
      </Helmet>
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

        { Articles.length > 0 &&
          <div className="artical-hero-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <NavLink to={`/articles/${Articles[0].title.split(' ').join('-')}`} target="_blank" >
                    <div className="artical-hero-fl">
                      <div className="artical-hero-text">
                        <h3 style={{textTransform:"uppercase"}} >{Articles[0].title}</h3>
                        <span>{Articles[0].by}</span>
                        <span>{new Date(Articles[0].date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="artical-hero-img">
                        <img style={{width:'100%'}} src={Articles[0].images[0]} alt="" />
                      </div>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="artical-menu" id='article-main' >
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All Articles</button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Cars</button>
            </li> */}
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Events Highlights</button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab2" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact2" aria-selected="false">Chris Harris</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab3" data-bs-toggle="pill" data-bs-target="#pills-contact3" type="button" role="tab" aria-controls="pills-contact3" aria-selected="false">Watches</button>
            </li> */}
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab4" data-bs-toggle="pill" data-bs-target="#pills-contact4" type="button" role="tab" aria-controls="pills-contact4" aria-selected="false">Market Update</button>
            </li>
          </ul>
        </div>
        { articlesLoading &&
          <div style={{height:'30rem'}} className='flex'>
            <div class="loader-5-colored center" ><span></span></div>
          </div>
        }
        { Articles.length === 0 && 
            <div className="flex_wrap" style={{position:'relative',height:'40rem',display: "flex",justifyContent: "center",alignItems: "center",zIndex:'-1'}}>
                {/* <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/93121"></iframe> */}
                <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/134394"></iframe>
            </div>
        }
        { !articlesLoading &&
        <div className="artical-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="artical-fl">
                  <div className="artical-tab">
                    <div className="tab-content" id="pills-tabContent">

                      <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <ArticleCategory Articles={Articles} />
                      </div>
                      
                      {/* <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <ArticleCategory Articles={Cars} />
                      </div> */}

                      <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <ArticleCategory Articles={EventsHighlights} />
                      </div>

                      {/* <div className="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact-tab2">
                        <ArticleCategory Articles={ChrisHaris} />
                      </div>

                      <div className="tab-pane fade" id="pills-contact3" role="tabpanel" aria-labelledby="pills-contact-tab3">
                        <ArticleCategory Articles={Watches} />
                      </div> */}

                      <div className="tab-pane fade" id="pills-contact4" role="tabpanel" aria-labelledby="pills-contact-tab4">
                        <ArticleCategory Articles={MarketUpdates} />
                      </div>

                    </div>                                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </>
  );
}

export default Articles
