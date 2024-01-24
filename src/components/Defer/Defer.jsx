import { useMediaQuery } from "@mui/material"
import { useState, useEffect, useMemo, Children } from "react"
import FlipMove from "react-flip-move"

const Defer = ({ chunkSize, children, isFlip }) => {

    const isSmallScreen = useMediaQuery('(max-width:900px)')
    const [render, setRender] = useState(isSmallScreen ? true : false)
    const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize)

    const childrenArray = useMemo(() => Children.toArray(children), [
        children
    ])

    useEffect(() => {
        if (renderedItemsCount < childrenArray.length) {
            window.requestIdleCallback(
                () => {
                    setRenderedItemsCount(
                        Math.min(renderedItemsCount + chunkSize, childrenArray.length)
                    )
                },
                { timeout: 200 }
            );
        }
    }, [renderedItemsCount, childrenArray.length, chunkSize])

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        }, 0)
    },[])





    return render && (
        <>
            {isFlip ?
                <FlipMove>
                    {childrenArray.slice(0, renderedItemsCount)}
                </FlipMove>
                :
                childrenArray.slice(0, renderedItemsCount)
            }
        </>

    )
}

export default Defer