import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

interface Props {
  location: Location;
  title: string;
  children?: any;
}

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `/blog`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <>
        <h1 className="main-heading">
          <Link to="/">
            Pear<strong>log</strong>
          </Link>
        </h1>
        <a
          href="https://github.com/hyeonpearl"
          target="_blank"
          className="global-header-link"
        >
          Github
        </a>
      </>
    );
  } else {
    header = (
      <>
        <Link className="header-link-home" to="/">
          Pear<strong>log</strong>
        </Link>
        <a
          href="https://github.com/hyeonpearl"
          target="_blank"
          className="header-link-github"
        >
          Github
        </a>
      </>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="global-footer">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
