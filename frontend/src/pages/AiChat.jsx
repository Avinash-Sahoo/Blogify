import ChatInterface from "../components/ChatInterface";
import NavComp from "../components/NavComp";
import axios from "axios"
import { handleError } from "../utilis/toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AiChat = () => {

  const navigate = useNavigate()

  const handleAI = ()=>{
    axios.get("http://localhost:3000/aichat",{
      headers:{
        "authentication" : localStorage.getItem("token")
      }
    }).then((response)=>{
      let {success} = response.data
      if(success === false){
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUser")
        navigate("/login")
      }
    })
    .catch((error)=>{
      return handleError("Something Went Wrong!")
    })
  }
  useEffect(()=>{
    handleAI()

  },[])
  return (
    <>
      <NavComp />
      <div>
        <ChatInterface />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AiChat;
