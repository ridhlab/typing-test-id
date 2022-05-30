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
    } = useTerms();

    const [inputValue, setInputValue] = useState("");

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
        const customRegExp = new RegExp(`\^${inputTerm}`, "gi");
        if (customRegExp.test(term)) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        console.log(isTermCorrect);
    }, [isTermCorrect]);

    return (
        <div className="m-20">
            <div className="h-[6.25rem] border-2 text-2xl p-2 overflow-hidden flex flex-wrap mb-4">
                {terms?.map((term, idx) => (
                    <span key={idx} className={`p-1 rounded-sm ${term === termSelected ? (isTermCorrect ? "bg-slate-200" : "bg-red-400") : ""}`}>
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
        </div>
    );
};

export default Main;
