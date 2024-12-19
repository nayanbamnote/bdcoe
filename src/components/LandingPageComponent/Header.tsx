import React from "react";
import Link from "next/link";

import "@/css/animate.css";
import "@/css/bootstrap.min.css";
import "@/css/font-awesome.min.css";
import "@/css/meanmenu.css";
import "@/css/one.css";
import "@/css/style.css";
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="wow fadeInDown" data-offset-top="197" data-spy="affix">
      <div className="logo-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12  col-xs-12 mainmenu-area">
              <nav className="navbar navbar-default mean-nav">
                <div className="navbar-header">
                  <a className="navbar-brand" href="/">
                    <img
                      src="images/bd-logo2.png"
                      className="logo-change max-w-[330px]"
                      alt="BDCOE"
                    />
                  </a>{" "}
                </div>

                <div
                  className=" navbar-collapse !visible"
                  id="bs-example-navbar-collapse-1">
                  <ul className="mobile-menu nav navbar-nav">
                    <li className="active">
                      <a href="/">Home</a>
                    </li>
                    
                    <li>
                      <a href="/profile">Profile</a>
                    </li>
                    <li>
                      <SignedIn>
                        <div className=" p-1 bg-slate-400 rounded-lg transform scale-150 flex justify-center items-center">
                        <UserButton />
                        </div>
                      </SignedIn>
                      <SignedOut>
                        <Link href="/sign-in">Login</Link>
                      </SignedOut>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
