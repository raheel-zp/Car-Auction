import React from 'react'
import { NavLink } from 'react-router-dom';

function ArticleTwo({displayedArticles,index}) {
    const title = displayedArticles[index].title;
    const formattedTitle = title.split(' ').join('-');
  return (
    <>
        <div className="artical-single-top">
            <NavLink to={`/articles/${formattedTitle}`} target="_blank" >
                <div className="artical-single-top-img">
                    <img style={{width:'100%'}} src={displayedArticles[index].images[0]} alt="" />
                </div>
                <div className="artical-single-top-text">
                    <h3 style={{maxHeight:"3.2rem",overflow:"hidden",textTransform:"uppercase"}} >{displayedArticles[index].title}</h3>
                    <p style={{maxHeight:"3rem",overflow:"hidden",color:'#212529'}}>{displayedArticles[index].para1} <br /> {displayedArticles[index].by} </p>
                    <span>{new Date(displayedArticles[index].date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </NavLink>
        </div>
    </>
  )
}

export default ArticleTwo
