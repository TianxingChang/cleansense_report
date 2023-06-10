import { NavLink, Outlet } from "react-router-dom";
import "../styles/RootLayout.css";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1> Hi</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="card">Card</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
