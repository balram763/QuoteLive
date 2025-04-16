import React, { useState, useEffect, useRef } from "react";
import {FaTimes, FaImage, FaPaperPlane, FaArrowAltCircleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../hooks/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../assets/defaultimage.svg"
import { getSocketState, onlineUsers } from "../features/auth/authSlice";
import { IoMdChatbubbles } from "react-icons/io";


const Chat = () => {
  const [open, setOpen] = useState(false); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null)
  const [sendImage, setSendImage] = useState(null)
  const [loading, setLoading] = useState(true);
  const {user,onlineUser}= useSelector(state=>state.auth)
  const [chatUser,setChatUser] = useState([])


  const dispatch = useDispatch()

  const { id } = useParams();

  const socketState = getSocketState();



  const subscribeToMessage = () => {
    socketState.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }

  const unSubscribeToMessage = () => {
    socketState.off("newMessage");
  };
  

  const fetchChat = async() => {
    const response = await axiosInstance.get(`/api/chat/${id}`,{
      headers:{
        Authorization: `Bearer ${user?.token}`
      }
    })
    setMessages(response?.data)
    setLoading(false)
  }

  const fetchChatUser = async() => {
    const response = await axiosInstance.get(`/api/chat/users`,{
      headers:{
        Authorization: `Bearer ${user?.token}`
      }
    })
    setChatUser(response?.data)
    setLoading(false)
  }


  useEffect(() => {
    fetchChat()
    fetchChatUser()
    subscribeToMessage()
    dispatch(onlineUsers());
    return () => unSubscribeToMessage()

  }, [id,onlineUser]);

  const messagesEndRef = useRef(null);

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  const currentChat =chatUser.filter((users)=>users._id === id)



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSendImage(file)
      setImage(URL.createObjectURL(file));
    }
  };

  const formData = new FormData()


  const handleSendMessage = async(e) => {
    e.preventDefault()
    formData.append("text",newMessage)
    if(sendImage){
    formData.append("image",sendImage)
    }

    if (newMessage.trim() || image) {
    const response = await axiosInstance.post(`/api/chat/${id}`,formData,
      {
      headers:{
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      }
    })
      setMessages((prev) => [...prev, response.data.message]);
      setNewMessage("");
      setSendImage(null);
    }
  };



  return (
    <div className="bg-gradient-to-r relative bg-pink-200  dark:from-blue-900 dark:to-black h-[86vh] shadow-2xl border-2 shadow-black dark:shadow-white border-green-200 flex">
      {/* Sidebar (User List) */}

      <button
              onClick={() => setOpen(!open)}
              className="text-lg fixed z-10 left-4 border-2 dark:bg-blue-900 top-20.5 bg-transaprent p-1 border-green-200 text-gray-800 dark:text-white md:hidden"
            >
              {open ? <FaTimes/> : <FaArrowAltCircleRight />}
            </button>
      <div
        className={`${
          open ? "flex min-w-2/3 md:min-w-1/4" : "hidden"
        } md:w-1/4  bg-white  dark:bg-gray-800 p-4 shadow-lg h-full md:block`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl p-3 font-semibold flex text-gray-800 mt-4 m-auto dark:text-white"><p>Chat </p> <IoMdChatbubbles className="text-blue-700" /></div>
            
          </div>

          {/* User List */}
          <div>
            <ul className="space-y-2 text-gray-800 dark:text-white">

              {
                chatUser.map((users)=>( 
                  <Link to={`/chat/${users._id}`} key={users._id} >
                    
                  
                  <li onClick={(e)=>{setOpen(!open)}} className={`hover:bg-gray-200 p-2 rounded-md ${id === users._id ?  "bg-green-200 text-black": ""}`}>
                    <div className="flex relative">
                    <img className="h-5 w-5  mr-3 rounded-xl" src={users?.profilePic || defaultImage} alt="" />
                    {users?.username}
                    {onlineUser.includes(users._id) ? <div className="rounded-full h-2.5 w-2.5 absolute bottom-0 text-[10px] flex left-0 border-1 bg-green-600"><p className="ml-30 mt-1">online</p></div> : <div className="rounded-full h-2.5 w-2.5 absolute bottom-0 text-[10px] flex left-0 border-1 bg-gray-600"><p className="ml-30 mt-1">offline</p></div> }
                    </div></li>

                  </Link>
                    
                  )
                )
              }
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 p-4 ${open ? "opacity-0 md:opacity-100" :""}`}>
        <div className="h-full relative bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">

                    <h1 className="flex h-8 text-center rounded-lg  mb-1 justify-center align-top hover:bg-gray-200 p-1  bg-green-200 text-black">
                    <img className="h-5 w-5  mr-2 mt-1 rounded-xl" src={currentChat[0]?.profilePic || defaultImage} alt="" />
                    {currentChat[0]?.username}
                    </h1>

          <div className="h-[80%] overflow-y-auto space-y-4 mb-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-3/4 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.senderId === id ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-white ${
                      msg.senderId === id ? "bg-gray-500" : "bg-blue-500"
                    }`}
                  >
                    <p>{msg?.text}</p>
                    {msg?.image && (
                      <img
                        src={msg?.image}
                        alt="message-img"
                        className="mt-2 w-40 h-40 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Message Input */}
          <div className="absolute bottom-0 left-0 right-0 bg-white text-black p-1 rounded-lg shadow-lg z-10">
              <form >
            <div className="flex items-center space-x-2">
              

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border rounded-l-lg"
                placeholder="Type your message..."
              />
              <label className="p-2 cursor-pointer bg-blue-500 text-white rounded-full">
                <FaImage size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button type="submit"
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-full"
              >
                <FaPaperPlane size={20} />
              </button>
              
            </div>
              </form>
          </div>

          {/* Image Preview */}
          {image && (
            <div className="fixed bottom-21 md:left-2/5 left-1/3 transform -translate-x-1/2 p-4 bg-white shadow-xl rounded-lg">
              <h3 className="text-center font-semibold">Image Preview</h3>
              <img
                src={image}
                alt="preview"
                className="w-15 h-10 object-contain rounded-lg mt-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
