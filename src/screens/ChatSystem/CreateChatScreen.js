import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllUsersAPI } from "../../axios/user";
import { createChatAPI } from "../../axios/chat";

export const CreateChatScreen = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [potentialUsers, setPotentialUsers] = useState([]);
    
    const [chatname, setChatname] = useState('');
    const [chatrights, setChatrights] = useState('admins');
    const [chatusers, setChatusers] = useState('');
    const [isChatAdmin, setIsChatAdmin] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            const response = await getAllUsersAPI();
            setPotentialUsers(response.data.response.data.data.users);
        })();
    }, []);

    const handleUserChange = (userId) => {
        setIsChatAdmin(prevState => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };

    const checkUsers = () => {
        const usernames = chatusers.split(',').map(name => name.trim()).filter(name => name);

        const usersArray = usernames.map(username => {
            const userObj = potentialUsers.find(user => user.name === username);
            if (!userObj) {
                console.error(`User ${username} not found.`);
                return null;
            }

            return [
                userObj._id,
                !!isChatAdmin[username]
            ];
        }).filter(user => user !== null);
        
        return usersArray;
    };

    const handleCreateChat = async (e) => {
        e.preventDefault();

        if (!chatname) {
            setError('The chatname can not be left empty!');
            return;
        }
        if (!chatrights) {
            setError('The chatrights can not be left empty!');
            return;
        }
        const users = checkUsers();
        if (!users) {
            setError('The users can not be left empty!');
            return;
        }

        const response = await createChatAPI(chatname, users, chatrights);
        console.log(response);
    };

    return (
        <>
            <h1>Create Chat</h1>
            <form onSubmit={handleCreateChat}>
                <input type="text" placeholder="Chatname" value={chatname} onChange={(e) => setChatname(e.target.value)} /><br />
                <select value={chatrights} onChange={(e) => setChatrights(e.target.value)}>
                    <option value="admins">Admins</option>
                    <option value="everyone">Everyone</option>
                </select><br />
                <input type="text" placeholder="Chatusers (comma-separated usernames)" value={chatusers} onChange={(e) => setChatusers(e.target.value)} /><br />
                {chatusers.split(',').filter(user => user.trim()).map((user, index) => (
                    <div key={index}>
                        <label>
                            {user.trim()}:
                            <input 
                                type="checkbox" 
                                checked={!!isChatAdmin[user.trim()]} 
                                onChange={() => handleUserChange(user.trim())}
                            />
                            Admin
                        </label><br />
                    </div>
                ))}
                <input type="submit" value="Create" />
                {error && (<p>{error}</p>)}
            </form>
        </>
    );
};

