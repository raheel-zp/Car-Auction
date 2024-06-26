import React, { useState,useContext } from "react";
import {useEffect} from 'react';
import { userloggedIn } from '../../Context/Context';

function SavedComp({val}) {
const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const [Product,setProduct] = useState({});
    const getSavedProductsByID = async ()=>{
        const res = await fetch(`${url}getSavedProductsByID/${val}`,{
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type":"application/json",
              "authToken": localStorage.getItem("authToken"),
            }
        });
        const data = await res.json();
        console.log(data.data);
        if(data.msg==='success'){
            setProduct(data.data);
        }
    }
    useEffect(()=>{
        getSavedProductsByID();
    },[])

  return (
    <>
      { Product &&        
        <div className="bids__car__single">
            <div className="bids__car__img">
              <img src={Product.thumbnail} alt="" />
            </div>
            <div className="bids__car__content">
              <h5>
                {Product.title}
              </h5>
              <p>
                {Product.summary}                
              </p>
            </div>
            <div className="bids__Car_status">
              {/* <div className="bids__car__single__status">
                <p>Status</p>
                <span>Sold</span>
              </div> */}
              {/* <div className="bids__car__single__status">
                <p>Status</p>
                <span>Sold</span>
              </div>
              <div className="bids__car__single__status">
                <p>Status</p>
                <span>Sold</span>
              </div>
              <div className="bids__car__single__status">
                <p>Status</p>
                <span>Sold</span>
              </div> */}
            </div>
        </div>
      }
    </>
  );
}

export default SavedComp;
