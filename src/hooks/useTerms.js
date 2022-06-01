import { useState, useEffect } from "react";
import TermsList from "../data/terms.txt";
import { getShuffledArr } from "../utils/Array";

const useTerms = () => {
    const [originalTerms, setOriginalTerms] = useState();

    const [terms, setTerms] = useState([]);

    const [termsStatus, setTermsStatus] = useState([]);

    const [termSelected, setTermSelected] = useState("");

    const [indexTermSelected, setIndexTermSelected] = useState("");

    const [isTermCorrect, setIsTermCorrect] = useState(true);

    const [countTermCorrect, setCountTermCorrect] = useState(0);

    const [countTermIncorrect, setCountTermIncorrect] = useState(0);

    const [wpm, setWpm] = useState(null);

    const setFalseTermCorrect = () => setIsTermCorrect(false);

    const setTrueTermCorrect = () => setIsTermCorrect(true);

    const incCountTermCorrect = () => setCountTermCorrect((prevCount) => prevCount + 1);

    const incCountTermIncorrect = () => setCountTermIncorrect((prevCount) => prevCount + 1);

    const getFile = async (url) => {
        let fileContent = await fetch(url);
        fileContent = await fileContent.text();
        return fileContent;
    };

    const reset = () => {
        randomizeTerms();
        setTermsStatus([]);
        setTermSelected("");
        setIndexTermSelected("");
        setCountTermCorrect(0);
        setCountTermIncorrect(0);
        setWpm(null);
    };

    const randomizeTerms = () => {
        setTerms(getShuffledArr(terms));
    };

    const nextTerm = () => {
        setTermsStatus((prev) => {
            if (prev.length === 0) {
                return [{ term: terms[indexTermSelected], status: isTermCorrect, length: terms[indexTermSelected].length }];
            } else {
                return [...prev, { term: terms[indexTermSelected], status: isTermCorrect, length: terms[indexTermSelected].length }];
            }
        });
        setTermSelected(terms[indexTermSelected + 1]);
        setIndexTermSelected((prevState) => prevState + 1);
    };

    const getCountChar = (arr) => {
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
            res += arr[i].length;
        }
        return res;
    };

    const calculateWpm = (terms) => {
        const countCharTrue = getCountChar(terms.filter((term) => term.status));
        const resWpm = countCharTrue / 5;
        setWpm(resWpm);
    };

    useEffect(() => {
        if (terms.length !== 0) {
            setTermSelected(terms[0]);
            setIndexTermSelected(0);
            console.log(terms);
        }
    }, [terms]);

    useEffect(() => {
        getFile(TermsList).then((content) => {
            let arr = content.trim().split("\n");
            arr = arr
                .map((term) => {
                    return term.replace(/(\r\n|\n|\r)/gm, "");
                })
                .filter((term) => {
                    return !/-/.test(term);
                })
                .filter((term) => {
                    return term.length < 8;
                });
            setOriginalTerms(arr);
            setTerms(getShuffledArr(arr));
        });
    }, []);

    return {
        terms,
        randomizeTerms,
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
    };
};

export default useTerms;
