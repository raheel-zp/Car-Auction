import React,{useState,useContext} from 'react'
import moment from 'moment';
import { userloggedIn } from '../Context/Context'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ReplyComp({val,ind,getProduct,comment,Product}) {
    const { userlogged,setuserLogged,userData,setuserData,getLoggedin,url,commentAdmin } = useContext(userloggedIn);
    const [deleteReplySuccess,setdeleteReplySuccess] = useState(false);
    
    const deleteReply = async ()=>{
      const res = await fetch(`${url}deleteReply`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          product_Id: Product._id,
          comment_Id: comment._id,
          reply_Id: val._id,
        })
      });
      const data = await res.json();
      if(data.msg==='success'){
        getProduct();
        setdeleteReplySuccess(true);
        setTimeout(() => {
          setdeleteReplySuccess(false);
        }, 3000);
      }
    }
  return (
    <>
        <Snackbar open={deleteReplySuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Reply Deleted successfully!
            </Alert>
        </Snackbar>
        <div
          className="car-info-post-list-text"
          style={{ margin: '10px 0 10px 50px' }}
          key={ind}
        >
          <p>{val.content}</p>
          <span>by {val.sender.name} {moment(val.date).fromNow()}</span>
            { userData.email === commentAdmin &&
                <svg xmlns="http://www.w3.org/2000/svg" onClick={deleteReply} className='comment-cross' height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
            }
        </div>
    </>
  )
}

export default ReplyComp
