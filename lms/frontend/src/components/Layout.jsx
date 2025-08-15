import Navbar from "./Navbar";

const Layout = ({ children, user, setUser }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-100 flex flex-col">
    <Navbar user={user} setUser={setUser} />
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      {children}
    </main>
  </div>
);

export default Layout;
