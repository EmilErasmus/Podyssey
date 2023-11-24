import '../styles/Header.css'
import SearchBar from './SearchBar.jsx'

export default function Header() {
    return (
        <header className="hero">
            <img src="../images/netflix.png" className="hero--photo" />
            <h1 className="hero--header">Notflix</h1>
            <SearchBar />
        </header>
    )
}