import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            <h2>Home</h2>
            <p>Welcome, {user.username}!</p>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default Home;