import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { userloggedIn } from '../Context/Context';
import { Helmet } from 'react-helmet';

function ArticleDetailPage(){
    const { title } = useParams();
    const [Article,setArticle] = React.useState('');
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    
    // console.log(title);
    const originalTitle = title.split('-').map(word => word.charAt(0) + word.slice(1)).join(' ');
    // console.log(originalTitle);
    window.scrollTo(0,0);
    const getArticleByTitle = async ()=>{
        const res = await fetch(`${url}getArticleByTitle/${originalTitle}`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
        }
        });
        const data = await res.json();
        if(data.msg === 'success'){
            setArticle(data.data);
        }
    }
    React.useEffect(()=>{
        getArticleByTitle();
    },[])

  return (
    <>
    { Article?(
        <div>
        <Helmet>
            <title> { Article.metaTitle? Article.metaTitle : Article.title } </title>
            <meta
              name='description'
              content={ Article.metaDescription? Article.metaDescription : Article.para1 }
            />
            <meta
              name='keywords'
              content={ Article.metaKeywords ? Article.metaKeywords : '' }
            />
            <link rel='canonical' href='/articles' />
        </Helmet>
            {/* <div className="artical-car-hero-area">
                <img src="assets/img/ad1.png" alt="" />
            </div> */}
            <div className="artical-ditail-area">
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <div className="artical-dif-fl">
                    <div className="artical-dif-top">
                        <h3>{new Date(Article?.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                        <a href="#"><i className="far fa-eye" />339</a>
                    </div>
                    <div className="artical-ditail">
                        <div className="artical-dif-title">
                        <h3 style={{textTransform:"uppercase"}} >{Article.title}</h3>
                        <span>{Article.by}</span>
                        </div>
                        <div className="artical-dif-text">
                            <p> <ReactMarkdown>{Article?.para1}</ReactMarkdown></p>
                            <a><img style={{width:"100%"}} src={Article.images[0]} alt="" /></a>
                            <p> <ReactMarkdown>{Article?.para2}</ReactMarkdown></p>
                            {/* <a href="#"><img style={{width:"100%"}} src={Article.images[1]} alt="" /></a> */}
                            <p> <ReactMarkdown>{Article?.para3}</ReactMarkdown></p>
                            {/* <a href="#"><img style={{width:"100%"}} src={Article.images[2]} alt="" /></a> */}
                            <p> <ReactMarkdown>{Article?.para4}</ReactMarkdown></p>
                            {/* <a href="#"><img style={{width:"100%"}} src={Article.images[3]} alt="" /></a> */}
                        </div>
                    </div>
                    {/* <div className="aritical-have">
                        <div className="artical-have-title">
                        <h3>Have your say!</h3>
                        </div>
                        <div className="artical-input">
                        <label htmlFor="#">Your comment</label>
                        <textarea name id cols={30} rows={10} defaultValue={""} />
                        <button type="submit">Login to comment</button>
                        </div>
                        <div className="artical-comments">
                        <div className="artical-comment-icon">
                            <a href="#"><i className="far fa-user" /></a>
                        </div>
                        <div className="artical-comm-text">
                            <h3>Markcoopers</h3>
                            <p>Hum only 2 you say........... E53 cabrio and Morgan Aero 8 Super sports. Eclectic mix, but work for me</p>
                            <span>22/02/2023 01:43</span>
                            <a href="#"><i className="far fa-comment-alt" />Reply</a>
                        </div>
                        </div>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>            
        ):(
            <></>
        )
    } 
    </>
  )
}

export default ArticleDetailPage
