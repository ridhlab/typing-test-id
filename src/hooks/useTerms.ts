import fs from "fs";
import { useState, useEffect } from "react";
import TermsList from "../data/terms.txt";
import { getShuffledArr } from "../utils/Array";

interface TermsStatus {
    term: string;
    status: boolean;
    length: number;
}

const useTerms = () => {
    const [originalTerms, setOriginalTerms] = useState<string[]>([]);

    const [terms, setTerms] = useState<string[]>([]);

    const [termsStatus, setTermsStatus] = useState<TermsStatus[]>([]);

    const [termSelected, setTermSelected] = useState<string>("");

    const [indexTermSelected, setIndexTermSelected] = useState<number>(0);

    const [isTermCorrect, setIsTermCorrect] = useState<boolean>(true);

    const [countTermCorrect, setCountTermCorrect] = useState<number>(0);

    const [countTermIncorrect, setCountTermIncorrect] = useState<number>(0);

    const [wpm, setWpm] = useState<number | null>(null);

    const setFalseTermCorrect: () => void = () => setIsTermCorrect(false);

    const setTrueTermCorrect: () => void = () => setIsTermCorrect(true);

    const incCountTermCorrect: () => void = () => setCountTermCorrect((prevCount) => prevCount + 1);

    const incCountTermIncorrect: () => void = () => setCountTermIncorrect((prevCount) => prevCount + 1);

    const getFile = async (url: string): Promise<string> => {
        let fileContent: any | Array<string> = await fetch(url);
        fileContent = await fileContent.text();
        return fileContent;
    };

    const reset = (): void => {
        randomizeTerms();
        setTermsStatus([]);
        setTermSelected("");
        setIndexTermSelected(0);
        setCountTermCorrect(0);
        setCountTermIncorrect(0);
        setWpm(null);
    };

    const randomizeTerms: () => void = () => setTerms(getShuffledArr(terms));

    const nextTerm = (): void => {
        setTermsStatus((prev) => {
            if (prev.length === 0) {
                return [
                    {
                        term: terms[indexTermSelected],
                        status: isTermCorrect,
                        length: terms[indexTermSelected].length,
                    },
                ];
            } else {
                return [
                    ...prev,
                    {
                        term: terms[indexTermSelected],
                        status: isTermCorrect,
                        length: terms[indexTermSelected].length,
                    },
                ];
            }
        });
        setTermSelected(terms[indexTermSelected + 1]);
        setIndexTermSelected((prevState) => prevState + 1);
    };

    const getCountChar = (arr: TermsStatus[]): number => {
        let res: number = 0;
        for (let i = 0; i < arr.length; i++) {
            res += arr[i].length;
        }
        return res;
    };

    const calculateWpm = (terms: TermsStatus[]): void => {
        const countCharTrue: number = getCountChar(terms.filter((term) => term.status));
        const resWpm: number = countCharTrue / 5;
        setWpm(resWpm);
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
