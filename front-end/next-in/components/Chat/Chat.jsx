import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Box,
  Text,
  StackDivider,
  ButtonGroup,
  Button,
  InputGroup,
  Icon,
  Menu,
  Input,
  Divider,
  Avatar,
  useDisclosure,
  Drawer,
} from "@chakra-ui/react";
import { BiSmile } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import io from 'socket.io-client'

const endpoint = "http://localhost:8080/"
// 'https://next-in-back-end.onrender.com/'
let arr = []

const Chat = () => {
  let socket = io.connect(endpoint)
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [msgs, changeMsgs] = useState(arr)

  const loginedUser = {
    "currentChatroom": "63a41c2a3a5b8ea5ea5d91f8",
    "_id": "63a439ee63b0fe2e5e5fc64a",
    "name": "user9",
    "email": "user9@gmail.com",
    "password": "1234",
    "mainTask": [],
    "soloTask": []
  }

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
      console.log(msg,"from backend")
      arr.push(msg)
      changeMsgs(arr)
    })
  }, [])
  console.log(msgs)
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
            <Flex className="SelfMsgContainer" alignItems="flex-end" gap="10px">
              <Card
                bg="#2F80ED"
                borderRadius={"20px 20px 0px 20px"}
                flexGrow={1}
                color="white"
              >
                {/* <CardHeader p="20px 20px 0px 20px" fontWeight={"600"} color="">Name</CardHeader> */}
                <CardBody
                  p="20px 20px 0px 20px"
                  fontSize={{ base: "0.8em", md: "0.6em", xl: "0.8em" }}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Officia obcaecati mollitia a fugiat quidem explicabo, nam
                  rerum. Sit, debitis esse velit reiciendis natus maiores ab
                  nam, dolor nemo quasi explicabo.
                </CardBody>
                <CardFooter
                  p="20px 20px 10px 0"
                  justifyContent={"flex-end"}
                  fontSize="0.7em"
                  pt="0px"
                >
                  4:06 pm
                </CardFooter>
              </Card>
              <Avatar size={{ base: "md", md: "sm", xl: "md" }} />
            </Flex>
            <Flex
              className="OthersMsgContainer"
              alignItems="flex-end"
              gap="10px"
              flexDirection={"row-reverse"}
            >
              <Card
                color="#1B1A57"
                borderRadius={"20px 20px 20px 0px"}
                flexGrow={1}
                bg="#E8F1FB"
              >
                <CardHeader
                  p="20px 20px 0px 20px"
                  fontWeight={"600"}
                  fontSize={{ base: "0.5em", md: "0.7em", xl: "0.9em" }}
                  color="#F5B544"
                >
                  Sender's Name
                </CardHeader>
                <CardBody
                  p="0px 20px 0px 20px"
                  fontSize={{ base: "0.8em", md: "0.6em", xl: "0.8em" }}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing nam rerum.
                  Sit, debitis esse velit reiciendis natus maiores ab nam, dolor
                  nemo quasi explicabo.
                </CardBody>
                <CardFooter
                  p="20px 20px 10px 0"
                  justifyContent={"flex-end"}
                  fontSize={{ base: "0.7em", md: "0.5em", xl: "0.7em" }}
                  pt="0px"
                >
                  4:06 pm
                </CardFooter>
              </Card>
              <Avatar size={{ base: "md", md: "sm", xl: "md" }} />
            </Flex>
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
