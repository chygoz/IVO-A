import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./ui/logo";

const links = [
  {
    name: "facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 0H2.5C1.397 0 0.5 0.897 0.5 2V14C0.5 15.103 1.397 16 2.5 16H8.5V10.5H6.5V8H8.5V6C8.5 5.20435 8.81607 4.44129 9.37868 3.87868C9.94129 3.31607 10.7044 3 11.5 3H13.5V5.5H12.5C11.948 5.5 11.5 5.448 11.5 6V8H14L13 10.5H11.5V16H14.5C15.603 16 16.5 15.103 16.5 14V2C16.5 0.897 15.603 0 14.5 0Z"
          fill="white"
        />
      </svg>
    ),
    url: "#",
  },
  {
    name: "instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 1.44578C10.1205 1.44578 10.4096 1.44578 11.2771 1.44578C12.0482 1.44578 12.4337 1.63855 12.7229 1.73494C13.1084 1.92771 13.3976 2.0241 13.6867 2.31325C13.9759 2.60241 14.1687 2.89157 14.2651 3.27711C14.3614 3.56627 14.4578 3.95181 14.5542 4.72289C14.5542 5.59036 14.5542 5.78313 14.5542 8C14.5542 10.2169 14.5542 10.4096 14.5542 11.2771C14.5542 12.0482 14.3614 12.4337 14.2651 12.7229C14.0723 13.1084 13.9759 13.3976 13.6867 13.6867C13.3976 13.9759 13.1084 14.1687 12.7229 14.2651C12.4337 14.3614 12.0482 14.4578 11.2771 14.5542C10.4096 14.5542 10.2169 14.5542 8 14.5542C5.78313 14.5542 5.59036 14.5542 4.72289 14.5542C3.95181 14.5542 3.56627 14.3614 3.27711 14.2651C2.89157 14.0723 2.60241 13.9759 2.31325 13.6867C2.0241 13.3976 1.83133 13.1084 1.73494 12.7229C1.63855 12.4337 1.54217 12.0482 1.44578 11.2771C1.44578 10.4096 1.44578 10.2169 1.44578 8C1.44578 5.78313 1.44578 5.59036 1.44578 4.72289C1.44578 3.95181 1.63855 3.56627 1.73494 3.27711C1.92771 2.89157 2.0241 2.60241 2.31325 2.31325C2.60241 2.0241 2.89157 1.83133 3.27711 1.73494C3.56627 1.63855 3.95181 1.54217 4.72289 1.44578C5.59036 1.44578 5.87952 1.44578 8 1.44578ZM8 0C5.78313 0 5.59036 0 4.72289 0C3.85542 0 3.27711 0.192772 2.79518 0.385543C2.31325 0.578314 1.83133 0.867471 1.3494 1.3494C0.867471 1.83133 0.674699 2.21687 0.385543 2.79518C0.192772 3.27711 0.0963856 3.85542 0 4.72289C0 5.59036 0 5.87952 0 8C0 10.2169 0 10.4096 0 11.2771C0 12.1446 0.192772 12.7229 0.385543 13.2048C0.578314 13.6867 0.867471 14.1687 1.3494 14.6506C1.83133 15.1325 2.21687 15.3253 2.79518 15.6145C3.27711 15.8072 3.85542 15.9036 4.72289 16C5.59036 16 5.87952 16 8 16C10.1205 16 10.4096 16 11.2771 16C12.1446 16 12.7229 15.8072 13.2048 15.6145C13.6867 15.4217 14.1687 15.1325 14.6506 14.6506C15.1325 14.1687 15.3253 13.7831 15.6145 13.2048C15.8072 12.7229 15.9036 12.1446 16 11.2771C16 10.4096 16 10.1205 16 8C16 5.87952 16 5.59036 16 4.72289C16 3.85542 15.8072 3.27711 15.6145 2.79518C15.4217 2.31325 15.1325 1.83133 14.6506 1.3494C14.1687 0.867471 13.7831 0.674699 13.2048 0.385543C12.7229 0.192772 12.1446 0.0963856 11.2771 0C10.4096 0 10.2169 0 8 0Z"
          fill="white"
        />
        <path
          d="M8 3.85542C5.68675 3.85542 3.85542 5.68675 3.85542 8C3.85542 10.3133 5.68675 12.1446 8 12.1446C10.3133 12.1446 12.1446 10.3133 12.1446 8C12.1446 5.68675 10.3133 3.85542 8 3.85542ZM8 10.6988C6.55422 10.6988 5.30121 9.54217 5.30121 8C5.30121 6.55422 6.45783 5.30121 8 5.30121C9.44578 5.30121 10.6988 6.45783 10.6988 8C10.6988 9.44578 9.44578 10.6988 8 10.6988Z"
          fill="white"
        />
        <path
          d="M12.241 4.72289C12.7733 4.72289 13.2048 4.29136 13.2048 3.75904C13.2048 3.22671 12.7733 2.79518 12.241 2.79518C11.7086 2.79518 11.2771 3.22671 11.2771 3.75904C11.2771 4.29136 11.7086 4.72289 12.241 4.72289Z"
          fill="white"
        />
      </svg>
    ),
    url: "#",
  },

  {
    name: "youtube",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
      >
        <path
          d="M21.45 2.42857C21.175 1.42857 20.4875 0.714286 19.525 0.428572C17.875 2.55448e-07 10.8625 0 10.8625 0C10.8625 0 3.98751 2.55448e-07 2.20001 0.428572C1.23751 0.714286 0.549996 1.42857 0.274996 2.42857C-4.20026e-06 4.28572 0 8 0 8C0 8 4.17978e-06 11.7143 0.412504 13.5714C0.687504 14.5714 1.375 15.2857 2.3375 15.5714C3.9875 16 11 16 11 16C11 16 17.875 16 19.6625 15.5714C20.625 15.2857 21.3125 14.5714 21.5875 13.5714C22 11.7143 22 8 22 8C22 8 22 4.28572 21.45 2.42857ZM8.79999 11.4286V4.57143L14.575 8L8.79999 11.4286Z"
          fill="white"
        />
      </svg>
    ),
    url: "#",
  },

  {
    name: "twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="16"
        viewBox="0 0 19 16"
        fill="none"
      >
        <path
          d="M19 1.86044C18.3452 2.30784 17.5764 2.5454 16.7907 2.54315C17.6308 2.03341 18.2597 1.22354 18.5581 0.267437C17.8618 0.873808 16.9843 1.21527 16.0727 1.23462C15.4716 0.600508 14.6871 0.18429 13.8369 0.0484272C12.9867 -0.0874361 12.1167 0.0643832 11.3574 0.481101C10.598 0.897819 9.9904 1.55696 9.62563 2.3596C9.26086 3.16224 9.15864 4.06509 9.3343 4.93265C7.78743 4.84853 6.27502 4.43024 4.89528 3.70493C3.51554 2.97962 2.29932 1.96351 1.32558 0.722581C0.849095 1.6107 0.709583 2.64938 0.934073 3.6374C1.15856 4.62542 1.73108 5.49244 2.5407 6.07051C1.92967 6.07941 1.32487 5.94313 0.773256 5.67226C0.788111 6.58871 1.10093 7.47355 1.66167 8.18523C2.22241 8.89691 2.99867 9.39432 3.86628 9.59787C3.28874 9.75323 2.68466 9.77267 2.09884 9.65477C2.35155 10.4666 2.84391 11.1771 3.50726 11.687C4.17062 12.1969 4.9719 12.4809 5.79942 12.4994C4.05172 13.5915 2.0441 14.1627 0 14.1493C1.71195 15.3005 3.70048 15.9398 5.74424 15.996C7.78799 16.0521 9.80678 15.5229 11.5759 14.4673C13.3449 13.4117 14.7949 11.871 15.7644 10.0169C16.7338 8.16279 17.1847 6.06791 17.0669 3.96548C17.7957 3.35152 18.4453 2.64411 19 1.86044Z"
          fill="white"
        />
      </svg>
    ),
    url: "#",
  },
];

function Footer() {
  return (
    <footer className="px-4 md:px-8 py-20 bg-[#081020] text-white text-sm">
      <div className="grid max-w-7xl mx-auto w-full  md:grid-cols-3 gap-12">
        <div className="">
          <h3 className="text-2xl font-bold text-white">
            <Logo color="footer" />
          </h3>
          <p className=" mt-4">
            Spotfinda is your go-to platform for discovering and booking sports
            facilities across Nigeria. Even if you don’t know anywhere or anyone
            in your area Spotfinda makes it easy. Our platform connects you to
            available pitches/courts in your area, allowing you to book your
            slot ahead in just a few clicks.
          </p>
          <div className="flex items-center gap-5 mt-5">
            <span className="text-xl"> Certified by</span>
            <Image
              src="/certified.png"
              width={94}
              height={94}
              quality={100}
              priority
              alt="certified"
            />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col">
              <h3 className="text-base font-bold mb-4">Quick Links</h3>
              <Link href="/" className="">
                Home
              </Link>
              <Link href="/about" className="">
                About
              </Link>
              <Link href="/players" className="">
                For Players
              </Link>
              <Link href="/for-businesses" className="">
                For Businesses
              </Link>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold mb-4">Contact</h3>
              <p className="">Email</p>
              <p className="">Phone Number</p>
              <p className="">FAQs</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold mb-4">Legal</h3>
              <p className="">Terms of Service</p>
              <p className="">Privacy policy</p>
            </div>
          </div>
          <ul className="flex  gap-3 mt-5">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  className="w-[34px] h-[34px] rounded-[100%] border-primary border border-solid flex justify-center items-center"
                  href={link.url}
                >
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h3 className="text-base font-bold text-white">Stay in Loop</h3>
          <form className="flex mt-2">
            <div className="h-12 overflow-hidden grid grid-cols-6 w-full bg-white rounded">
              <input
                type="email"
                placeholder="Enter your email"
                className="col-span-4 h-full w-full outline-none rounded px-4 py-2 text-black"
              />
            </div>
          </form>
          <p className="mt-5 text-[#EFF1F4]">
            Join our newsletter to stay up to date on features and releases.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
