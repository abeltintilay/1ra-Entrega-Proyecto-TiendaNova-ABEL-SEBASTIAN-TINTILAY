import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
    >
      <Header />
            <main 
                  style={{ flex: 1 }}>
                    {/*  sacamos el {children} */}  
                  <Outlet />
            </main>
      <Footer />
    </div>
  );
}
export default Layout;