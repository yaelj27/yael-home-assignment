
import { useCallback, useEffect, useState } from 'react';
import { Launch } from '../Home/Launch';

export const useAsyncSingleItem = (asyncFunction: (reqUrl: string) => Promise<any>, immediate = false) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState<Launch>();

    const execute = useCallback((reqUrl: string) => {
        setValue(undefined);
        setStatus("pending");
        return asyncFunction(reqUrl)
            .then((response) => {
                response != null ?
                    setStatus("success") :
                    setStatus("error");
                setValue(response);
            })
            .catch((error) => {
                setStatus("error");
            });
    }, [asyncFunction]);
    useEffect(() => {
        if (immediate) {
            execute("");
        }
    }, [execute, immediate]);
    return { execute, value, status };
};



export async function getItemInfo(reqUrl: string) {

    const response = await fetch(reqUrl);
    const data = await response.json();
    if (data !== null) {
        const lanch: Launch = {
            id: data.id,
            name: data.name,
            status: data.status?.abbrev,
            image: data.image,
            missionDescription: data.mission?.description,
            url: ""
        }
        return lanch;

    }
    return null;
}