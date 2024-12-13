import { Link } from 'react-router-dom'
import './styles.css'

export const Navbar = () => {
    return (
        <>
            <nav className="custom-nav-bar">
                <Link 
                    className="custom-nav-bar-brand" 
                    to="/"
                >
                    Podcaster
                </Link>
            </nav>
            <hr className="custom-nav-bar-line" />
        </>
    )
}
