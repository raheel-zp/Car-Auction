import React from 'react'
import { NavLink } from 'react-router-dom';

function ArticleNavCom({val}) {
    const title = val.title;
    const formattedTitle = title.split(' ').join('-');
  return (
    <>
     <NavLink to={`/articles/${formattedTitle}`} target="_blank" >
        <div className="artical-blog-img">
            <img style={{width:'100%'}} src={val.images[0]} alt="" />
        </div>
        <div className="artical-blog-text">
            <h3 style={{maxHeight:"2.5rem",overflow:"hidden",textTransform:"uppercase"}} > {val.title}</h3>
            <p style={{maxHeight:"2.5rem",overflow:"hidden"}} >{val.para1}</p>
            <span>{new Date(val.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
    </NavLink> 
    </>
  )
}

export default ArticleNavCom
