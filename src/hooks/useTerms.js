import { useState, useEffect } from "react";
import TermsList from "../data/terms.txt";
import { getShuffledArr } from "../utils/Array";

const useTerms = () => {
    const [originalTerms, setOriginalTerms] = useState();

    const [terms, setTerms] = useState([]);

    const [termSelected, setTermSelected] = useState("");

    const [indexTermSelected, setIndexTermSelected] = useState("");

    const [isTermCorrect, setIsTermCorrect] = useState(true);

    const [countTermCorrect, setCountTermCorrect] = useState(0);

    const [countTermIncorrect, setCountTermIncorrect] = useState(0);

    const setFalseTermCorrect = () => setIsTermCorrect(false);

    const setTrueTermCorrect = () => setIsTermCorrect(true);

    const incCountTermCorrect = () => setCountTermCorrect((prevCount) => prevCount + 1);

    const incCountTermIncorrect = () => setCountTermIncorrect((prevCount) => prevCount + 1);

    const getFile = async (url) => {
        let fileContent = await fetch(url);
        fileContent = await fileContent.text();
        return fileContent;
    };

    const randomizeTerms = () => {
        setTerms(getShuffledArr(terms));
    };

    const nextTerm = () => {
        setTermSelected(terms[indexTermSelected + 1]);
        setIndexTermSelected((prevState) => prevState + 1);
    };

    useEffect(() => {
        if (terms.length !== 0) {
            setTermSelected(terms[0]);
            setIndexTermSelected(0);
        }
    }, [terms]);

    useEffect(() => {
        getFile(TermsList).then((content) => {
            let arr = content.trim().split("\n");
            arr = arr
                .map((term) => {
                    return term.slice(0, -1);
                })
                .filter((term) => {
                    return !/-/.test(term);
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
    };
};

export default useTerms;
