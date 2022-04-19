import { useState } from 'react';


const useCounter = () => {


    const [ counter, setCounter ] = useState(0);

    const decrement = () => setCounter(counter - 1);
    const increment = () => setCounter(counter + 1);



    return { decrement, increment, counter };
};

export default useCounter;