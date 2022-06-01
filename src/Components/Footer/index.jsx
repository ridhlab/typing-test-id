import React from "react";

const Footer = () => {
    return (
        <div className="py-4">
            <p className="text-center">
                Made with{" "}
                <img className="m-auto" alt="heart" height="20" width="20" src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png" />
                by{" "}
                <a href="https://www.github.com/ridlwan17" target="_blank" rel="noreferrer" className="text-sky-400">
                    Muhammad Ridwan
                </a>{" "}
            </p>
        </div>
    );
};

export default Footer;
