import { Outlet } from "@remix-run/react";

export default function Blog() {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold text-red-800">Posts</h1>
      <Outlet />
    </div>
  );
}
