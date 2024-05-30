import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="sticky py-2 backdrop-blur-md bg-opacity-30 mb-12 md:mb-18 bg-white z-50">
      <div className="container mx-auto">
        <div className="flex px-4 items-center justify-between relative">
          <Link href="/" className="inline-block text-lg font-bold">
            <Image
              src="/assets/logo.png"
              className="w-20 h-20"
              width={100}
              height={30}
              alt="logo"
            />
          </Link>
          <ul className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden xl:flex lg:w-auto lg:space-x-12">
            <li>
              <Link
                href="/"
                className="inline-block text-md text-gray-700 hover:text-orange-300 font-semibold"
              >
                How it Works
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="inline-block text-md text-gray-700 hover:text-orange-300 font-semibold"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="inline-block text-md text-gray-700 hover:text-orange-300 font-semibold"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <div className="xl:block hidden mr-4">
            <div className="flex items-center">
              <Link
                href="https://github.com/harshit-senpai/FConvert"
                target="_blank"
              >
                <FaGithub className="h-8 w-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
