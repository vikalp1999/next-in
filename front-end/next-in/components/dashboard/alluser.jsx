import React, { useEffect, useRef, useState } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import {
    FiMenu,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { teamAction } from '../../redux/user/user.action';
import { useRouter } from 'next/router';
import axios from 'axios';

const LinkItems = [];
var role = "";
var teamId = "";
var code = "";
var teamName=""

export default function AllUser({ children }) {
    const dispatch = useDispatch()
    const { isRegistered, isAuth, userData } = useSelector(store => store.auth);
    const { teamData } = useSelector(store => store.team);
    console.log("teamData", teamData)
    // console.log("🚀 ~ file: alluser.jsx:37 ~ AllUser ~ isRegistered", userData)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()

    if (!!teamData.chatroom) {
        if (!!teamData.chatroom.members && LinkItems.length == 0) {
            console.log("helo")
            teamId = teamData.chatroom.roomLead._id;
            role = teamData.chatroom.roomLead.role;
            code = teamData.chatroom._id
            teamName = teamData.chatroom.name
            LinkItems.push(...teamData.chatroom.members);
        }
    }

    useEffect(() => {
        getTeam()
    }, [])


    const getTeam = async () => {
        if (!isAuth) {
            router.push("/auth")
        }
        else {
            dispatch(teamAction(userData.user.currentChatroom))
        }
    }

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose: onClosed, ...rest }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [task, setTask] = useState({
        title: "",
        deadline: ""
    });

    // console.log("check1", LinkItems)
    // console.log("check2", teamId)
    // console.log("check3", role)

    const taskData = useRef({
        assigner: "",
        assignee: "",
        chatroom: ""
    });

    const handleTask = (assignee, chatroom) => {
        if (role == "admin") {
            console.log(taskData)
            console.log(teamId, assignee, chatroom)
            taskData.current.assigner = teamId;
            taskData.current.assignee = assignee;
            taskData.current.chatroom = chatroom;
            console.log(taskData)
            onOpen()
        }
        else {
            return;
        }
    }


    const ChangeTask = (event) => {
        const { name, value } = event.target;
        setTask({
            ...task,
            [name]: value
        })
    }

    const AddTask = async () => {
        // console.log(task)
        // console.log(taskData)
        const cred = { ...task, ...taskData.current }
        // console.log(cred)
        let res = await axios.post("http://localhost:8080/task/addtask", cred)
        let data = await res.data;
        console.log("final", data)
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assign Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input name='title' onChange={ChangeTask} placeholder='Title' />
                            <FormLabel>DeadLine</FormLabel>
                            <Input type="date" name='deadline' onChange={ChangeTask} placeholder='Deadline' />
                        </FormControl>

                        <Button onClick={AddTask} colorScheme='blue' mt={3}>
                            Create Task
                        </Button>
                    </ModalBody>

                </ModalContent>
            </Modal>

            <Box
                bg={useColorModeValue('white', 'gray.900')}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                w={{ base: 'full', md: 60 }}
                pos="fixed"
                h="full"
                {...rest}>
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
                        {teamName}<br />
                        <Box fontSize="sm">{(role == "admin" ? code : "")}</Box>
                    </Text>
                    <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClosed} />
                </Flex>
                {LinkItems.map((link) => (
                    <NavItem onClick={() => { handleTask(link._id, link.currentChatroom) }} key={link.name} icon={link.icon}>
                        {link.name}
                    </NavItem>
                ))}
            </Box>
        </>
    );
};

const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>
        </Flex>
    );
};