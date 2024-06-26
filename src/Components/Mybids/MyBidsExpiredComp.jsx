import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';

function MyBidsExpiredComp({product,userData}) {
    const [userbids,setuserbids] = useState([
        {
            price: 0,
        }
    ]);
    const [remainingTime, setRemainingTime] = useState('');
    const [remDays, setRemDays] = useState('');
    
    React.useEffect(()=>{
        let bids = product.bids.filter((bid) => bid.email === userData.email );
        setuserbids(bids);
        // console.log(userbids[0].price);
    },[])

    return (
    <>
        <div class="bids__car__single">
                <div class="bids__car__img">
                    <NavLink to={`/products/${product.title}`} target="_blank" >
                        <img src={product.thumbnail} alt="" />
                    </NavLink>
                </div>
            <div class="bids__car__content">
                <h5>{product.originalTitle}</h5>
                <p>{product.summary}</p>
            </div>
            <div class="bids__Car_status">
                <div class="bids__car__single__status">
                    <p>Highest Bid</p>
                    <span>£{ product.bids? product.bids[0].price:'-' }</span>
                </div>
                <div class="bids__car__single__status">
                    <p>My Highest Bid</p>
                    <span>£{userbids[0].price?userbids[0].price:'-'}</span>
                </div>
                <div class="bids__car__single__status">
                    <p>Time Left</p>
                    <span>{`00:00:00`}</span>
                </div>
                <div class="bids__car__single__status">
                    <p>Status</p>
                    <span>Ended</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyBidsExpiredComp
