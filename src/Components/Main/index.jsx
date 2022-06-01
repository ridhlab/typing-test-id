import React, { useEffect, useState } from "react";

// Hooks
import useTerms from "../../hooks/useTerms";

const Main = () => {
    const {
        terms,
        termSelected,
        isTermCorrect,
        setFalseTermCorrect,
        setTrueTermCorrect,
        nextTerm,
        countTermCorrect,
        countTermIncorrect,
        incCountTermCorrect,
        incCountTermIncorrect,
        indexTermSelected,
        termsStatus,
    } = useTerms();

    const [inputValue, setInputValue] = useState("");

    const [scrollPos, setScrollPos] = useState(43);

    const handleChange = (value) => {
        setInputValue(value);
        if (value[value.length - 1] === " " && value.slice(0, -1) !== termSelected) {
            setFalseTermCorrect();
        } else {
            if (value[value.length - 1] !== " ") {
                if (checkTermCorrect(termSelected, value)) {
                    setTrueTermCorrect();
                } else {
                    setFalseTermCorrect();
                }
            }
        }
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 32) {
            if (inputValue === " ") {
                setInputValue("");
                setTrueTermCorrect();
            } else {
                if (isTermCorrect) {
                    incCountTermCorrect();
                } else {
                    incCountTermIncorrect();
                }
                setInputValue("");
                nextTerm();
                setTrueTermCorrect();
            }
        }
    };

    const checkTermCorrect = (term, inputTerm) => {
        console.log(term, inputTerm);
        const customRegExp = new RegExp(`^${inputTerm}`, "gi");
        if (customRegExp.test(term)) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        console.log(isTermCorrect);
    }, [isTermCorrect]);

    useEffect(() => {
        console.log(termsStatus);
    }, [termsStatus]);

    const handleClick = () => {
        console.log(scrollPos);
        document.getElementById("term-box").scrollTo(scrollPos - scrollPos, scrollPos);
        setScrollPos((prev) => prev + 40);
    };
    // console.log(document.getElementById("term-box").scrollHeight);
    console.log(indexTermSelected);

    return (
        <div className="m-20">
            <div className="h-[8rem] border-2 text-2xl p-2 overflow-y-scroll flex flex-wrap mb-4" id="term-box">
                {terms?.map((term, idx) => (
                    <span
                        key={idx}
                        className={`p-1 rounded-sm ${idx >= indexTermSelected ? "text-black" : termsStatus[idx]?.status ? "text-lime-400" : "text-red-400"} ${
                            term === termSelected ? (isTermCorrect ? "bg-slate-200" : "bg-red-400") : ""
                        }`}
                    >
                        {term}
                    </span>
                ))}
            </div>
            <div className="my-4">
                <input className="border-2 p-2 text-2xl w-full" value={inputValue} onChange={(e) => handleChange(e.target.value)} onKeyUp={handleKeyUp} />
            </div>
            <div className="flex">
                <div className="p-4 border-2">
                    <p>Kata Benar {countTermCorrect}</p>
                </div>
                <div className="p-4 border-2">
                    <p>Kata Salah {countTermIncorrect}</p>
                </div>
            </div>
            <button className="p-2 bg-slate-400 rounded-md" onClick={() => handleClick()}>
                Scroll
            </button>
        </div>
    );
};

export default Main;
