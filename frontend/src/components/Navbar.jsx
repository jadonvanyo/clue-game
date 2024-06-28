import '../styles/Navbar.css'
import Toggle from './Toggle'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = ({ isChecked, handleChange }) => {
    const { user } = useContext(AuthContext);

    return (
        <nav>
            <a href="/" className="brand">Clue</a>

            <div className='navbar-right-side'>
                {user ?
                    <>
                        <a href="/joingame" className='navbar-link'>Join Game</a>
                        <a href="/logout" className='navbar-link'>Logout</a>
                    </> :
                    <>
                        <a href="/register" className='navbar-link'>Register</a>
                        <a href="/login" className='navbar-link'>Login</a>
                    </>
                }
                <Toggle isChecked={isChecked} handleChange={handleChange} />
            </div>
        </nav>
    );
}

export default Navbar;