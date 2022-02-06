
import { useCallback, useEffect, useState } from 'react';
import { Launch } from './Launch';

const useToggle = (): [boolean, () => void] => {
    const [state, setState] = useState(true);
    const toggle = () => {
        setState(!state);
    };
    return [state, toggle];
}

export const useAsync = (asyncFunction: (isPrevios: boolean, serchString?: string, offset?: number) => Promise<any>, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState([]);
    const [isPrevios, toggleIsPrevios] = useToggle();
    const [offset, setOffset] = useState(0);

    const execute = useCallback((isPreviosValue: boolean, searchStringValue?: string, offset?: number) => {
        setValue([]);
        setStatus("pending");
        return asyncFunction(isPreviosValue, searchStringValue, offset)
            .then((response) => {
                setStatus("success");
                setValue(response);
            })
            .catch((error) => {
                setStatus("error");
            });
    }, [asyncFunction]);
    useEffect(() => {
        if (immediate) {
            execute(true, "");
        }
    }, [execute, immediate]);
    return { execute, value, isPrevios, toggleIsPrevios, status, offset, setOffset };
};



export async function getAllInfo(isPrevios: boolean, serchString: string = "", offset: number = 0) {
    let allLaunchs: Launch[] = [];
    let reqUrl = "https://lldev.thespacedevs.com/2.2.0/launch/";
    reqUrl = isPrevios ? reqUrl + "previous/" : reqUrl + "upcoming/";
    reqUrl = reqUrl + "?limit=20&offset=" + offset;
    if (serchString !== "") {
        reqUrl = reqUrl + "&search=" + serchString;
    }

    const response = await fetch(reqUrl);
    const data = await response.json();
    for (var value in data.results) {
        if (data.results[value] !== null) {
            const lanch: Launch = {
                id: data.results[value].id,
                name: data.results[value].name,
                status: data.results[value].status?.abbrev,
                image: data.results[value].image,
                missionDescription: data.results[value].mission?.description,
                url: data.results[value].url
            }
            allLaunchs.push(lanch)
        }
    }
    return allLaunchs;
}