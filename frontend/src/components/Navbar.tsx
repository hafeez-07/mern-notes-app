const Navbar = () => {
  return (
    <div className="   bg-gray-950 text-white py-2 px-5 ">
      <div className="max-w-5xl flex justify-between items-center mx-auto">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <div className="destructive-button">
          Logout
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
