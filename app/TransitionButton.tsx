"use client";

import useViewTransition from '@/hooks/useViewTransition';
import React, { useState } from 'react'

const TransitionButton = () => {

    const [count, setCount] = useState(0);
    const startViewTransition = useViewTransition();

    const onIncrementClick = async () => {
        await startViewTransition({
            classNames: ["count-transition"],
        });
        setCount(count + 1);
    };

    return (
        <div className="container">
            <div className="count">{count}</div>
            <button onClick={onIncrementClick}>Increment</button>
        </div>

    )
}

export default TransitionButton