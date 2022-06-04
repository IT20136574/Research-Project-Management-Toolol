import React from 'react'
import { Box, Container , Text , Tabs , Tab , TabList , TabPanels , TabPanel} from '@chakra-ui/react'
import LoginC from "../../RS_Components/chatApp/ChatLogins/LoginC";
import SignupC from "../../RS_Components/chatApp/ChatLogins/SignupC";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

const ChatHome = () => {

    const history = useHistory();

useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) {
        history.push("/chats")
    };
}, [history]);

  return (
    <Container maxW="xl" centerContent>
        <Box d ='flex' justifyContent="center" p={3} bg ={"white"} w="100%" m ="40px 0 15px 0" borderRadius="lg" borderWidth="1px" >
            <Text fontSize="2xl" align="center" fontFamily="Work sans" color="red">
                Research Project Chat
            </Text>
        </Box>
        <Box bg ={"white"} w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px">
        <Tabs variant='soft-rounded'>
            <TabList mb="1em">
                <Tab width="50%">login</Tab>
                <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <LoginC/> 
                </TabPanel>
                <TabPanel>
                    <SignupC/> 
                </TabPanel>
            </TabPanels>
            </Tabs>

        </Box >
    </Container>
  )
};

export default ChatHome
