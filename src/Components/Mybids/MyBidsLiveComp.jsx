import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';

function MyBidsLiveComp({product,userData}) {
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
        console.log(userbids[0].price);
    },[])

    useEffect(() => {
        let countdownInterval;
      
        const calculateRemainingTime = () => {
          if (product && product.date && product.duration) {
            // const endTime = new Date(Product.date).getTime() + Product.duration * 24 * 60 * 60 * 1000;
            const endTime = new Date(product.endTime).getTime();
            countdownInterval = setInterval(() => {
              const currentTime = new Date().getTime();
              const remainingMilliseconds = Math.max(0, endTime - currentTime);
      
              const remainingSeconds = Math.floor((remainingMilliseconds / 1000) % 60);
              const remainingMinutes = Math.floor((remainingMilliseconds / 1000 / 60) % 60);
              const remainingHours = Math.floor((remainingMilliseconds / 1000 / 60 / 60) % 24);
              const remainingDays = Math.floor(remainingMilliseconds / 1000 / 60 / 60 / 24);
      
              const formattedRemainingTime = `${remainingHours
                .toString()
                .padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      
              setRemainingTime(formattedRemainingTime);
              setRemDays(remainingDays);
              if (remainingMilliseconds === 0) {
                clearInterval(countdownInterval);
              }
            }, 1000);
          }
        };
      
        calculateRemainingTime();
      
        return () => {
          clearInterval(countdownInterval);
        };
    }, [product]);
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
                    <span>{`${remDays}d ${remainingTime}`}</span>
                </div>
                <div class="bids__car__single__status">
                    <p>Sold</p>
                    <span>{product.sold? product.sold.status?'Yes':'No' : '-' }</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyBidsLiveComp
