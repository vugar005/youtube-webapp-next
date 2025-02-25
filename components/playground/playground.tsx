import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function Playground() {
    const [count, setCount] = useState<number>(0);
    const [data, setData] = useState(null);
    const [param, setParam] = useState('initialParam');

    //   // Fetch data function
    //   const fetchData = async () => {
    //     const response = await fetch(`https://dummyjson.com/todos?p=${param}`);
    //     const data = await response.json();
    //     console.log(data)
    //     setData(data);
    //   }

    //   useEffect(() => {
    //     fetchData();
    //   }, []); // The fetchData function is a dependency


    // Fetch data function
    const fetchData = useCallback(async () => {
        console.log('fetchData');
        const response = await fetch(`https://dummyjson.com/todos?p=${param}`);
        const data = await response.json();
        console.log(data)
        setData(data);
    }, [param]); // param is now a dependency of fetchData

    useEffect(() => {
        console.log('fetchDataEffect')
        fetchData();
    }, [fetchData]); // fetchData is memoized and only changes if param changes


    const onClickHandler = () => {
        console.log('clickHandler');
        setCount(count + 1);
        setParam(count.toString());
    };

    return (
        <div>
            count: {count}
            <Button onClick={onClickHandler}>Submit</Button>
        </div>
    );
}