import React from 'react'
import { useState } from 'react';
import ConsBox from './ConsBox'

function ConsignmentPage({Consignment,getAllConsignments}) {

    React.useEffect(()=>{
        getAllConsignments();
    },[])
  return (
    <>
        <div className='flex_wrap' style={{position:'relative'}} >
            {
                Consignment.map((val,ind)=>{
                    return(<>
                        <ConsBox val={val} ind={ind} />
                    </>)
                })
            }
        </div>
    </>
  )
}

export default ConsignmentPage
