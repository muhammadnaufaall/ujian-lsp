import React from "react";

function Footer() {
  return (
    <div className="p-5 flex justify-center">
      {`Made with 💜 by `}
      <a
        className="ml-2 text-indigo-600 font-semibold underline"
        href="https://www.linkedin.com/in/muhammad-naufal-08828222b/">{`Muhammad Naufal`}</a>
    </div>
  );
}

export default Footer;
