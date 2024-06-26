import React, { useState,useContext } from 'react'
import moment from 'moment';
import { userloggedIn } from '../Context/Context'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ReplyComp from './ReplyComp';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CommentsComp({comment,ind,getProduct,Product}){
    // console.log(comment);
    const { userlogged,setuserLogged,userData,setuserData,getLoggedin,url,commentAdmin } = useContext(userloggedIn);
    const [showReplyInput,setshowReplyInput] = useState(false);
    const [reply,setreply] = useState('');
    const [replyLoading,setreplyLoading] = useState(false);
    const [openreplySuccess,setopenreplySuccess] = useState(false);
    const [openreplyError,setopenreplyError] = useState(false);

    const postreply = async ()=>{
      if(reply.length<5){
        setopenreplyError(true);
        setTimeout(() => {
          setopenreplyError(false);
        }, 5000);
        return;
      }
      setreplyLoading(true);
      const res2 = await fetch(`${url}postreply`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          product_Id: Product._id,
          comment_Id: comment._id,
          email: userData.email,
          username: userData.username,
          reply: reply,
        })
      });
      const data = await res2.json();
      setreplyLoading(false);
      if(data.msg==='success'){
        setopenreplySuccess(true);
        getProduct();
        setreply('');
        setshowReplyInput(false);
        setTimeout(() => {
          setopenreplySuccess(false);
        }, 3000);
      }
    }
    
    const [deleteCommentSuccess,setdeleteCommentSuccess] = useState(false);
    const deleteComment = async ()=>{
      const res = await fetch(`${url}deleteComment`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          product_Id: Product._id,
          comment_Id: comment._id,
        })
      });
      const data = await res.json();
      if(data.msg==='success'){
        getProduct();
        setdeleteCommentSuccess(true);
        setTimeout(() => {
          setdeleteCommentSuccess(false);
        }, 3000);
      }
    }
    
  return (
    <>
        <Snackbar open={deleteCommentSuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Comment Deleted successfully!
            </Alert>
        </Snackbar>
        <Snackbar open={openreplySuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Reply submitted successfully!
            </Alert>
        </Snackbar>
        <Snackbar open={openreplyError} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="warning" sx={{ width: '100%' }}>
                Please enter at least 5 characters!
            </Alert>
        </Snackbar>
        <div className="single-car-info-post-list">
          {/* <div className="car-info-post-list-icon">
            <a href="#">
              <i className="fal fa-reply-alt-lines" />
            </a>
          </div> */}
          <div className="car-info-post-list-text" >
            { userData.email === commentAdmin &&
              <svg xmlns="http://www.w3.org/2000/svg" onClick={deleteComment} className='comment-cross' height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
            }
            <p>{comment.message.content}</p>
            <span>by {comment.message.sender.name} {moment(comment.message.date).fromNow()}</span>
            <div className="reply-con">
              <div className="reply-title" >All Replies</div>
              { Product.userEmail === userData.email || userData.email === commentAdmin ? <>
                { showReplyInput?<>
                  <div className="reply-input-con">
                    <textarea
                      name
                      id
                      cols={20}
                      rows={4}
                      type='text'
                      value={reply}
                      onChange={(e)=>{setreply(e.target.value)}}
                      style={{width:'100%',padding:'7px'}}
                    />
                    <div className='reply-submit-con'>
                      <button className='reply-submit-btn' onClick={postreply} disabled={replyLoading} >{replyLoading?'Submitting':'Submit'}</button>
                    </div>
                  </div>
                  </>:<></>
                }
                <div className="reply-text" onClick={()=>{setshowReplyInput(!showReplyInput)}} > {showReplyInput?'Cancel':'Reply'} </div>
                </>:<></>
              }
            </div>
          </div>
          { comment.reply.length > 0 ? <>
            {comment.reply.map((val, ind) => {
                return (
                  <>
                    <ReplyComp val={val} ind={ind} getProduct={getProduct} comment={comment} Product={Product} />
                  </>
                );
              })
              }
            </>:<></>
          }
        </div>
    </>
  )
}

export default CommentsComp
