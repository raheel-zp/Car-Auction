import React from 'react'
import slugify from 'slugify';
import { NavLink } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ArticleNavCom from './ArticleNavCom';
import ArticleTwo from './ArticleTwo';

function ArticleCategory({Articles}) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Function to handle page change
  const handlePageChange = (event, page) => {
    // window.scrollTo(0,428);
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    // Replace 'article-1' with the id of the target div
    const targetDiv = document.getElementById('article-main');
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate index of the first article to display on the current page
  const startIndex = (currentPage - 1) * 8;

  // Calculate index of the last article to display on the current page
  const endIndex = startIndex + 8;

  // Extract the portion of the array to display on the current page
  const displayedArticles = Articles.slice(startIndex, endIndex);
  return (
    <>
        {/* 2 articles line 2 */}
      <div className="artical-top-fl">
          { displayedArticles.length > 0 &&
            <ArticleTwo displayedArticles={displayedArticles} index={0} />
          }
          { displayedArticles.length > 1 &&
            <ArticleTwo displayedArticles={displayedArticles} index={1} />
          }
      </div>
        <Stack spacing={1}>
          <div className="artical-blog-fl">
          { 
            displayedArticles.slice(2).map((val,ind)=>{
              return(<>
                <div className="single-artical-blog">
                    {/* 6 Articles Page */}
                    <ArticleNavCom val={val}/>
                </div>
              </>)
            })
          }
        </div>
        </Stack>
        <div className="blog-navigation">
          <Pagination
            count={Math.ceil(Articles.length / 8)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            size='large'
          />
        </div>
    </>
  )
}

export default ArticleCategory
