import { NavLink } from "react-router-dom";

export function Header(){
  return(
    <div className="flex items-center gap-5 py-2 bg-indigo-200">
      <img src="" alt="" />
      <nav className="flex items-center gap-5">
        <NavLink to={"/"}>Tickes</NavLink>
      </nav>
    </div>
  )
}