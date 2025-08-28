// HistoryPage.js
import React, { useState, useEffect } from 'react';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // You'll need to set up your Auth0-protected fetch call here
                const response = await fetch('https://vercel-backend-gamma-swart.vercel.app/history/show-history');
                if (response.ok) {
                    const data = await response.json();
                    setHistory(data);
                } else {
                    console.error('Failed to fetch history');
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='boxcontainer'>
            

            <h2>Code Review History</h2>

            
            {history.length > 0 ? (
                history.map((entry) => (
                    <div className='card' key={entry._id}>
                        <h3>Code Submitted</h3>
                        <pre>{entry.code}</pre>
                        <h3>AI Review</h3>
                        <pre>{entry.review}</pre>
                        <small>Date: {new Date(entry.timestamp).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p>No history found.</p>
            )}

            
        </div>
    );
};

export default HistoryPage;