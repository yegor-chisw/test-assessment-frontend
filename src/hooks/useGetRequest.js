import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:8080';

export const useGetRequest = (path) => {
    const [isLoading, setIsloading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getData = useCallback(async () => {
        try {
            setIsloading(true);
            setTimeout( async () => {
                const response = await fetch(`${API_URL}/${path}`);
                const json = await response.json();
                setData(json);
                setIsloading(false);
            }, 1000)
        } catch (error) {
            setError(error);
            setIsloading(false);
        }
    }, [path]);

    useEffect(() => {
        getData();
    }, [getData]);

    return [data, isLoading, error];
};