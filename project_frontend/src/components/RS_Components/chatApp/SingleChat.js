import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast, Lottie } from '@chakra-ui/react';
import React from 'react'
import axios from 'axios';
import React, {useState , useEffect} from 'react';
import { getSender, getSenderFull } from '../../../config/ChatLogics';
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModel from '../miscellaneous/ProfileModel';
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
import "./CStyles.css"
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../RS_Components/chatApp/animation/typing.json';



const ENDPOINT = "http://localhost:8070";
var socket, selectedChatCompare;


const SingleChat = ( {fetchAgain, setFetchAgain} ) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

   const { selectedChat, setSelectedChat, user} = ChatState();
   const toast = useToast();


   const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
   
  

   const fetchMessages = async () => { 
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:8070/api/message/${selectedChat._id}`,
         config
      );
      
      

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
      
    } catch (error) { 
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  console.log(messages);



  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true)); 
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

  }, []); 


  
  useEffect(() => {
    fetchMessages();
  
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id 
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
                           //give notifications
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });



   const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8070/api/message", 
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        console.log(data);
        socket.emit("new message", data);
        
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };  

 


   
   const typingHandler = (e)=> {
     setNewMessage(e.target.value);

     if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
   };



  return (
    <>
    {selectedChat ? (
      <>  
          <Text
          fontSize={{base:"20px" , 'md':"30"}}
          pb={3}
          px={2}
          w="100%"
          fontFamily="Work sans"
          display="flex"
          justifyContent={{base:"space-between"}}
          alignItems="center"
          >
         <IconButton
        display={{base:"flex", md:"none"}}
        icon = {<ArrowBackIcon/>}
        onClick={() => setSelectedChat("")}
         />
                    {!selectedChat.isGroupChat ? (
                         <>
                            {getSender(user, selectedChat.users)}
                            <ProfileModel user={getSenderFull(user, selectedChat.users)}/>

                          </>
                    ):(
                      <>
                      {selectedChat.chatName.toUpperCase()}
                        <UpdateGroupChatModal
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                        fetchMessages={fetchMessages}
                        />
                      </>
                    )}
                </Text>
                <Box
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden" 
                >
                  {loading ? (
                    <Spinner
                    size="xl"
                    w={20}
                    h={20}
                    alignSelf="center"
                    margin="auto"
                    
                    />
                  ):(
                    <div className='messages' >
                        <ScrollableChat messages={messages} />
                    </div>
                  )}

                  <FormControl
                  onKeyDown={sendMessage}
                  id="first-name"
                  isRequired
                  mt={3}
                  >
                {isTyping ? (
                    <div>
                      <Lottie
                        options={defaultOptions}
                        // height={50}
                        width={70}
                        style={{ marginBottom: 10, marginLeft: 0 }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                      <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
                  </FormControl>
                </Box>
    
       </>
    ):(
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a User to start Chatting
          </Text>

        </Box>
    )

    }
    </>
  )
};

export default SingleChat;