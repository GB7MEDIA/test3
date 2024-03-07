import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { createObjectAPI } from "../../axios/object";

export const CreateObjectScreen = ({ isLoggedIn, isAdmin, currentUserId, currentUser }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        }
    }, [isAdmin, navigate]);
    
    const [objectname, setObjectname] = useState('');

    const [error, setError] = useState('');

    const handleCreateObject = async (e) => {
        e.preventDefault();

        if (!objectname) {
            setError('The object name can not be left empty!');
            return;
        }

        const response = await createObjectAPI(objectname);
        if (response) {
            navigate(`/objects/${response.data.data.createdObject.response._id}`);
        }
    };

    return (
        <>
            <h1>Create Objekt</h1>
            <form onSubmit={handleCreateObject}>
                <input type="text" placeholder="Objectname ..." value={objectname} onChange={(e) => setObjectname(e.target.value)} /><br />
                <input type="submit" value="Create" />
                {error && (<p>{error}</p>)}
            </form>
        </>
    );
};
