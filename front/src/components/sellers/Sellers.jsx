import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReview,createReview,getAllUsers,getReviews,getUsersDetail } from "../../redux/actions";
import Loader from "../loader/Loader";

export default function Sellers() {
  const dispatch = useDispatch();
  const usersDetail = useSelector((state) => state.userDetail);
  const users = useSelector((state) => state.users)
  
  let session = JSON.parse(localStorage.getItem("session"));
  const id = session[0].id;


  const [input, setInput] = useState({
    productId: "",
    sellerId: session[0].username,
    comment: "",
    score: 0,
  });

  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  
  useEffect(() => {
    dispatch(getUsersDetail(id));
    dispatch(getAllUsers())
  }, [dispatch]);

  function handlerSubmit(id,productId) {

    dispatch(createReview(id,{...input,productId: productId}))
    setInput({
      productId: "",
      sellerId: session[0].username,
      comment: "",
      score: 0,
    });
  }


  // Loading SetTimeOut
  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  if (loading === false) {
    changeState();
    return <Loader />;
  } else {
    if (usersDetail.length === 0) {
      dispatch(getUsersDetail(id));
      setLoading(false);
    }
  }
  
  
  function handlerSellerId(sellerId){
    console.log(users)

    const result = users.find((elm) => {
      return elm._id === sellerId
    })  

    const exist = result.reviews.map((elm) => {
      return elm.productId
    })
    
    return exist
  }
  


  return (
    <div>
  {usersDetail[0].purchases.map((elm) => (
    <div>
      <h5>USER: {elm.username}</h5>
      <img width="200px" src={elm.image} />
      <h5>PRODUCT: {elm.productId}</h5>
      {
        handlerSellerId(elm.sellerId).includes(elm.productId) === false?
        <form onSubmit={() => handlerSubmit(elm.sellerId,elm.productId)}>
        <label>
          Add Your Review:
        </label>
        <textarea onChange={(e) => handlerChange(e)} name="comment" cols="30" rows="10"></textarea>
        <label>
          Score:
        </label>
        <input type="number" name="score" onChange={(e) => handlerChange(e)} />
        <button type="submit">confirm</button>
      </form>:
      <div></div>
      }     
    </div>
    ))
      }
    </div>
  );
}
