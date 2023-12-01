import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; 

const Profile = () => {
    const [memberData, setMemberData] = useState(null);
    const [movieHistory, setMovieHistory] = useState([]);
    const { auth } = useAuth(); 
    
    console.log("In Profile");
    console.log(auth);
    const id = auth.id; // Adjust according to your auth object structure

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                // Fetch member details
                const response = await fetch(`/member/${id}/profile`);
                const memberData = await response.json();
                setMemberData(memberData);

                // Fetch movie history
                const historyResponse = await fetch(`/member/${id}/movie-history`);
                const historyData = await historyResponse.json();
                setMovieHistory(historyData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMemberData();
    }, [id]);

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {memberData ? (
                <>
                    <ul className="profile-details">
                        <li><strong>First Name:</strong> {memberData.firstName}</li>
                        <li><strong>Last Name:</strong> {memberData.lastName}</li>
                        <li><strong>Email:</strong> {memberData.email}</li>
                        <li><strong>Phone:</strong> {memberData.phone}</li>
                        <li><strong>Username:</strong> {memberData.username}</li>
                        <li><strong>Role:</strong> {memberData.role}</li>
                        <li><strong>Rewards:</strong> {memberData.rewards}</li>
                    </ul>
    
                    <h2>Past 30 Days Movie History</h2>
                    <ul className="movie-history-list">
                        {movieHistory.length > 0 ? (
                            movieHistory.map((movie, index) => (
                                <li key={index}>{movie}</li>
                            ))
                        ) : (
                            <li>No recent movie history available.</li>
                        )}
                    </ul>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
    
};

export default Profile;

