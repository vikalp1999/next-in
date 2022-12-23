import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Icon,
  Input,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { BiSmile } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import io from 'socket.io-client'

const endpoint = 'https://next-in-back-end.onrender.com/'
let arr = []
const loginedUser = {
  "currentChatroom": "63a41c2a3a5b8ea5ea5d91f8",
  "_id": "63a439ee63b0fe2e5e5fc64a",
  "name": "user9",
  "email": "user9@gmail.com",
  "password": "1234",
  "mainTask": [],
  "soloTask": []
}

const Chat = () => {
  let socket = io.connect(endpoint)
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [msgs, changeMsgs] = useState(arr)
  

  const handleSend = () => {
    socket.emit('newMsg', {
      msg:message,
      sender:loginedUser._id,
      chat:loginedUser.currentChatroom
    })
    console.log('message sent')
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  socket.emit('setup', loginedUser.currentChatroom)
  
  useEffect(()=>{
    socket.off("newMessage").on("newMessage", (msg)=>{
      arr.push(msg)
      changeMsgs([...arr])
    })
  }, [])

  useEffect(()=>{
    console.log(msgs)
  }, [msgs])
  return (
    <>
      <Button
        onClick={handleClick}
        display={isActive ? "none" : "flex"}
        position="fixed"
        top={"85vh"}
        left="93vw"
        w="65px"
        bg={"#2F80ED"}
        height={"65px"}
        borderRadius="40px"
        color="white"
        _hover={{ bg: "#F5B544" }}
      >
        <Icon
          as={BsChatText}
          color="white"
          cursor="pointer"
          bg={"transparent"}
          w="100%"
          h="100%"
          borderRadius="40px"
        />
      </Button>
      <Flex
        display={isActive ? "flex" : "none"}
        w={{base:"100vw",md:"60vw", lg:"25vw"}}
        position={"fixed"}
        top="0px"
        left="75vw"
        height={"100vh"}
        fontFamily="Poppins"
      >
        <Card
          w="100%"
          sx={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
          borderTopLeftRadius="20px"
          // w="30vw" position={"relative"} top="0px" left="70vw"
        >
          <CardHeader
            display={"flex"}
            bg={"#2F80ED"}
            borderTopLeftRadius="20px"
            sx={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            justifyContent="space-between"
            flexDirection={"row"}
          >
            <Heading
              size={{ base: "xs", lg: "sm", xl: "md" }}
              fontFamily="Poppins"
            >
              Vikalp's Workspace
            </Heading>
            <Button
              onClick={handleClick}
              bg={"transparent"}
              w="20px"
              height={"20px"}
              borderRadius="40px"
              _hover={{ bg: "transparent" }}
            >
              <Icon
                as={GrFormClose}
                cursor="pointer"
                bg={"transparent"}
                w="40px"
                h="40px"
                color="#4F5E7B"
              />
            </Button>
          </CardHeader>

          <CardBody
            display={"flex"}
            flexDirection={"column"}
            gap="20px"
            bg="#F7F7F7"
            justifyContent={"flex-end"}
          >
            {msgs.map(ele=><ChatBubble data={ele}/>)}  
          </CardBody>
          <CardFooter
            sx={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            p="5px 20px"
          >
            <Flex flexDirection={"column"} w="100%">
              {/* <Flex><Menu>Options</Menu></Flex> */}
              {/* <Divider/> */}
              <Flex
                flexDirection="row"
                alignItems={"center"}
                w="100%"
                gap="20px"
                m="10px 0px"
              >
                <Icon
                  as={BiSmile}
                  w="25px"
                  height={"25px"}
                  color="#4F5E7B"
                  cursor="pointer"
                />
                <Input
                  placeholder="Write a message..."
                  flexGrow={1}
                  borderRadius="10px"
                  onChange={handleChange}
                />
                <Icon
                  as={ImAttachment}
                  w="25px"
                  height={"25px"}
                  color="#4F5E7B"
                  cursor="pointer"
                />
                <Button
                  onClick={handleSend}
                  bg={"transparent"}
                  w="20px"
                  height={"20px"}
                  borderRadius="40px"
                  _hover={{ bg: "transparent" }}
                >
                  <Icon
                    as={RiSendPlaneFill}
                    w="45px"
                    height={"45px"}
                    bg={"#2F80ED"}
                    borderRadius="25px"
                    p="10px"
                    color="white"
                    cursor="pointer"
                  />
                </Button>
              </Flex>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
};

export default Chat;
