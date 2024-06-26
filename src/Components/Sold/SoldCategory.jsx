import React from 'react'
import ProductNavComp from '../Auction/ProductNavComp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import ProductBuyNowComp from './ProductBuyNowComp';
// import ProductComingSoonComp from './ProductComingSoonComp';
import ProductSoldComp from './ProductSoldComp';
function SoldCategory({Products}) {
    console.log(Products);
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
    const displayedProducts = Products.slice(startIndex, endIndex);
  return (
    <>
        <Stack spacing={1}>
          <div className="blog-fl">
          { 
            displayedProducts.map((val,ind)=>{
              return(<>                    
                    <ProductSoldComp val={val}/>
              </>)
            })
          }
        </div>
        </Stack>
        { displayedProducts.length===0 && (
          <>
            <div className='flex' style={{height:'20rem',justifyContent:'center'}} >
              <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/93134"></iframe>
            </div>
          </>
        )
        }
        <div className="blog-navigation">
          <Pagination
            count={Math.ceil(Products.length / 8)}
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

export default SoldCategory
