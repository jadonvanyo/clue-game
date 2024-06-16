import React, { useEffect, useState } from 'react';
import getProtectedData from '../services/protectedService';

const ProtectedComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProtectedData();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching protected data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Protected Data</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default ProtectedComponent;