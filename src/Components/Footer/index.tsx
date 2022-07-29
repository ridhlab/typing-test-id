import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="py-4 text-center">
            <p>
                Made with{" "}
                <img
                    className="m-auto inline-block"
                    alt="heart"
                    height="20"
                    width="20"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
                />{" "}
                by{" "}
                <a href="https://www.github.com/ridhlab" target="_blank" rel="noreferrer" className="text-sky-400">
                    Muhammad Ridwan
                </a>{" "}
            </p>
            <p>
                View{" "}
                <a href="https://www.github.com/ridhlab/typing-test-id" target="_blank" rel="noreferrer" className="text-sky-400">
                    sourcecode
                </a>
            </p>
        </div>
    );
};

export default Footer;
