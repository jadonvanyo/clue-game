import '../styles/Navbar.css'
import Toggle from './Toggle'

// TODO: make navbar change based on user login
const Navbar = ({isChecked, handleChange}) => {
    return (
        <nav>
            <a href="/" className="brand">Clue</a>
            
            <div className='navbar-right-side'>
                <a href="/register" className='navbar-link'>Register</a>
                <a href="/login" className='navbar-link'>Login</a>
                <Toggle isChecked={isChecked} handleChange={handleChange} />
            </div>
        </nav>
    );
}

export default Navbar;