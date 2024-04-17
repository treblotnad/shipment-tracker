import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import {
    Box,
    Text,
    Input,
    IconButton,
    Button,
    Flex
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

const Account = () => {
    const { loading, data, error } = useQuery(GET_ME);
    const [updateUser] = useMutation(UPDATE_USER);
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

    const handleEdit = (field) => {
        setEditMode(prev => ({ ...prev, [field]: true}));
    };

    const handleSave = async (field) => {
        setEditMode(prev => ({ ...prev, [field]: false }));
        try {
            await updateUser({
                variables: {
                    id: data.me._id,
                    username: formData.username,
                    email: formData.email,
                }
            });
            alert('Changes Saved Successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading your data!</Text>;
    
    return (
       <Box p={5}>
        <Text fontSize="25px" mb="4" marginBottom="40px">
            My Account
        </Text>
        {Object.keys(formData).map((key) => (
            <Flex key={key} align="center" mb="4">
                <Text w="150px" fontWeight="bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                {editMode[key] ? (
                    <Input
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        mr={2}
                    />
                ) : (
                    <Input backgroundColor="lightgrey" width="350px" mr={2} value={formData[key]} isReadOnly />
                )}
                <IconButton
                    aria-label={editMode[key] ? 'Save' : 'Edit'}
                    icon={editMode[key] ? <CheckIcon /> : <EditIcon />}
                    onClick={() => editMode[key] ? handleSave(key) : handleEdit(key)}
                />
            </Flex>
        ))}
       </Box> 
    );
};

export default Account;