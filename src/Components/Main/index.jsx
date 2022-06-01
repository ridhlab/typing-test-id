import React, { useEffect, useRef, useState } from "react";

// Hooks
import useTerms from "../../hooks/useTerms";

// Library
import Countdown from "react-countdown";

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
        reset,
        calculateWpm,
        wpm,
    } = useTerms();

    const [inputValue, setInputValue] = useState("");

    const [scrollPos, setScrollPos] = useState(10);

    const [yPosTermSelected, setYPosTermSelected] = useState("");

    const [isYPosChanged, setIsYPosChanged] = useState(false);

    const [dateNow, setDateNow] = useState(null);

    const [isStart, setIsStart] = useState(false);

    const [testCompleted, setTestCompleted] = useState(false);

    const [IsReset, setIsReset] = useState(false);

    const handleChange = (value) => {
        if (!isStart) {
            return;
        } else {
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
        }
    };

    const handleKeyUp = (e) => {
        if (!isStart) {
            return;
        } else {
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
        }
    };

    const checkTermCorrect = (term, inputTerm) => {
        const customRegExp = new RegExp(`^${inputTerm}`, "gi");
        if (customRegExp.test(term)) {
            return true;
        }
        return false;
    };

    const handleClickStart = () => {
        document.getElementById("input").focus();
        setIsStart(true);
        setDateNow(Date.now() + 60000);
        setIsReset(false);
    };

    const handleCountdownComplete = () => {
        setIsStart(false);
        setTestCompleted(true);
        calculateWpm(termsStatus);
    };

    const handleClickReset = () => {
        reset();
        setInputValue("");
        setIsReset(true);
        setTestCompleted(false);
    };

    /**
     * @abstract to be attention to implement auto sroll
     */

    const handleScroll = () => {
        document.getElementById("term-box").scrollTo(scrollPos - scrollPos, scrollPos);
        setScrollPos((prev) => prev + 30);
    };

    useEffect(() => {
        console.log(termSelected);
    }, [termSelected]);

    return (
        <div className="m-10">
            <div className="my-4">
                <input
                    id="input"
                    className="border-2 p-2 text-2xl w-full"
                    value={inputValue}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyUp={handleKeyUp}
                    autoComplete="off"
                />
            </div>
            <div className="h-[15rem] border-2 text-xs p-2 overflow-y-scroll flex flex-wrap mb-4" id="term-box">
                {terms?.map((term, idx) => {
                    return (
                        <span
                            key={idx}
                            id={term === termSelected ? "term-selected" : undefined}
                            className={`p-1 rounded-sm ${
                                idx >= indexTermSelected ? "text-black" : termsStatus[idx]?.status ? "text-lime-400" : "text-red-400"
                            } ${term === termSelected ? (isTermCorrect ? "bg-slate-200" : "bg-red-400") : ""}`}
                        >
                            {term}
                        </span>
                    );
                })}
            </div>
            <div className="flex justify-between items-center my-4">
                <div className="flex">
                    <div className="p-4 border-2">
                        <p>Kata Benar {countTermCorrect}</p>
                    </div>
                    <div className="p-4 border-2 mx-2">
                        <p>Kata Salah {countTermIncorrect}</p>
                    </div>
                    {testCompleted && !IsReset && <div className="p-4 border-2">WPM : {wpm}</div>}
                </div>
                <div>{isStart && <Countdown date={dateNow} onComplete={() => handleCountdownComplete()} />}</div>
            </div>
            <div className="flex justify-center">
                {(!isStart && !testCompleted) || IsReset ? (
                    <button className="px-4 py-2 bg-sky-400 text-white rounded-md" onClick={() => handleClickStart()}>
                        Start
                    </button>
                ) : (
                    ""
                )}
                {testCompleted && !IsReset && (
                    <button className="px-4 py-2 bg-sky-400 text-white rounded-md" onClick={() => handleClickReset()}>
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default Main;
