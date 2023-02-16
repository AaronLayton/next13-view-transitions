"use client"

import useViewTransition from '@/hooks/useViewTransition';
import Link from 'next/link'
import React from 'react'

const Navigation = () => {

    const startViewTransition = useViewTransition();

    const handleViewTransition = async (e: any) => {
        await startViewTransition({
            classNames: ["page-transition"],
        });
    };

    return (
        <>
            <Link onClick={handleViewTransition} className="button-link" href="/">Home</Link>
            <Link onClick={handleViewTransition} className="button-link" href="/page1">Page 1</Link>
            <Link onClick={handleViewTransition} className="button-link" href="/page2">Page 2</Link>
        </>
    )
}

export default Navigation