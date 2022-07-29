import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold text-red-800">
        <Link to="/posts">Posts</Link>
      </h1>
      <Outlet />
    </div>
  );
}
