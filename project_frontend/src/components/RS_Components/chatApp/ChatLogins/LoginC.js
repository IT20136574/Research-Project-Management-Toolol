import { useToast } from '@chakra-ui/react';
import React, {useState} from 'react';
import axios from 'axios';

import { FormControl, FormLabel, VStack ,Input, InputGroup, InputRightElement, Button, Show } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';


const LoginC = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history =useHistory();
    const handleClick = () => setShow(!show);


    const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8070/api/user/loginC",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");
      window.location = "/chats";
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };


  return (
    <VStack spacing="5px" color='black'>

      <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='Enter Your Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}  
          />
      </FormControl>

      <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input
            type={show? "text":"password"}
            placeholder='Enter Your Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}  
          />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {Show ? "Show" : "Hide"}
                </Button>
            </InputRightElement>
          </InputGroup>
          
      </FormControl>

      

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
      

  </VStack>
  );
  
  
};

export default LoginC