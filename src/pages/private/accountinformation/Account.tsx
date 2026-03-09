import Recents from "../../public/products/components/Recents";
import { Outlet, useParams } from "react-router-dom";

const Account = () => {
  const { section } = useParams<{ section?: string }>();


  return (
    <div>
      <nav className="bg-[#F5F5F5] p-4 border-b hidden md:block">
        <div className="mx-auto flex items-center">
          <div className="flex space-x-6 ml-[50px]">
            <button className="text-gray-500 hover:text-gray-700">
              Home
            </button>
            <img src="/arrow-right.svg" alt="arrow facing right" />
            <button className="text-gray-900 font-semibold first-letter:uppercase underline">
              {section}
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
      <div className="my-12 px-4 md:px-16 hidden md:block">
        <Recents />
      </div>
    </div>
  );
};

export default Account;
