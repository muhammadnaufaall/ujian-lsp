import "./globals.css";
import Nav from "./components/Nav";
import QueryWrapper from "./components/queryWrapper/QueryWrapper";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="mx-4 md:mx48 xl:mx-96 bg-gray-100">
        <QueryWrapper>
          <Nav />
          {children}
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}
