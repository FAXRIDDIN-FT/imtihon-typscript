import { NavLink } from "react-router-dom"

const Header = () => {
  const handleTheme = () => {
    document.body.classList.toggle("dark")
  }
  return (
    <div>
      <h2>Header</h2>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/movies"}>Movies</NavLink>
      <button onClick={handleTheme}>Dark mode</button>
    </div>
  )
}

export default Header