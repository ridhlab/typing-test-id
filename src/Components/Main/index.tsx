import React, { useEffect, useRef, useState } from "react";

// Hooks
import useTerms from "../../hooks/useTerms";

// Library
import Countdown from "react-countdown";

const Main: React.FC = () => {
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
    useTerms();

    const [inputValue, setInputValue] = useState<string>("");

    const [scrollPos, setScrollPos] = useState<number>(10);

    const [yPosTermSelected, setYPosTermSelected] = useState<number | null>(null);

    const [isYPosChanged, setIsYPosChanged] = useState<boolean>(false);

    const [dateNow, setDateNow] = useState<number | string>("");

    const [isStart, setIsStart] = useState<boolean>(false);

    const [testCompleted, setTestCompleted] = useState<boolean>(false);

    const [IsReset, setIsReset] = useState<boolean>(false);

    const checkTermCorrect = (term: string, inputTerm: string): boolean => {
        const customRegExp = new RegExp(`^${inputTerm}`, "gi");
        if (customRegExp.test(term)) {
            return true;
        }
        return false;
    };

    const handleChange = (value: string): void => {
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

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (!isStart) {
            return;
        } else {
            const keyCodeSpace = e.keyCode || e.which;
            if (keyCodeSpace === 32) {
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

    const handleClickStart = (): void => {
        document.getElementById("input")!.focus();
        setIsStart(true);
        setDateNow(Date.now() + 60000);
        setIsReset(false);
    };

    const handleCountdownComplete = (): void => {
        setIsStart(false);
        setTestCompleted(true);
        calculateWpm(termsStatus);
    };

    const handleClickReset = (): void => {
        reset();
        setInputValue("");
        setIsReset(true);
        setTestCompleted(false);
        setTrueTermCorrect();
    };
    /**
     * @abstract to be attention to implement auto sroll
     */
    const handleScroll = (): void => {
        document.getElementById("term-box")!.scrollTo(scrollPos - scrollPos, scrollPos);
        setScrollPos((prev) => prev + 30);
    };

    return (
        <div className="m-10">
            <div className="my-4">
                <input
                    id="input"
                    className="border-2 p-2 text-2xl w-full"
                    value={inputValue}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(e)}
                    autoComplete="off"
                />
            </div>
            <div className="h-[15rem] border-2 text-xl p-2 overflow-y-scroll flex flex-wrap mb-4" id="term-box">
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
