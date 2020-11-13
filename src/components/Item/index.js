import { Outlet } from "react-router-dom";

const Item = () => {
  return (
    <div>
      <h1>Welcom TO Items Page</h1>
      <Outlet />
    </div>
  );
};

export default Item;
