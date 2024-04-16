import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

import {
    Box,
    Text,
    Input,
    IconButton,
    Button,
    Flex
} from "@chakra-ui/react";
//import { EditIcon, CheckIcon } from "@chakra-ui/react";

const Account = () => {
    const { loading, data, error } = useQuery(GET_ME);
    const [editMode, setEditMode] = useState({ username: false, email: false, password: false });
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '********'
    });

    // Populate form data initially
    useEffect(() => {
        if (data && data.me) {
            setFormData({
                username: data.me.username,
                email: data.me.email,
                password: '********'
            });
        }
    }, [data]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading your data!</Text>;
    
    return (
       <Box p={5}>
        <Text fontSize="2x1" mb="4">
            My Account
        </Text>
        <Flex direction="column" gap="20px">
            <Box>
                <Text fontWeight="bold">Username:</Text>
                <Input value={formData.username} isReadOnly />
            </Box>
            <Box>
                <Text fontWeight="bold">Email:</Text>
                <Input value={formData.email} isReadOnly />
            </Box>
            <Box>
                <Text fontWeight="bold">Password:</Text>
                <Input value={formData.password} isReadOnly/>
            </Box>
        </Flex>
       </Box> 
    );
};

export default Account;