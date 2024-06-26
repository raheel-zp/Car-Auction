import React from 'react'
import './Admin.css'
import EnquiryBox from './EnquiryBox'
function SellingEquiries({allSellerQueries,Enquiries,setEnquiries}) {

    React.useEffect(()=>{
        allSellerQueries();
    },[])
  return (
    <div className='flex_wrap' >
        {
            Enquiries.map((val,ind)=>{
                return(<>
                    <EnquiryBox val={val} allSellerQueries={allSellerQueries} ind={ind} />
                </>)
            })
        }
    </div>
  )
}

export default SellingEquiries