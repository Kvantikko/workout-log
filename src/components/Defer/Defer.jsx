import { useState, useEffect, useMemo, Children } from "react";

const Defer = ({ chunkSize, children }) => {
    const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize);

    const childrenArray = useMemo(() => Children.toArray(children), [
        children
    ]);

    useEffect(() => {
        if (renderedItemsCount < childrenArray.length) {
            window.requestIdleCallback(
                () => {
                    setRenderedItemsCount(
                        Math.min(renderedItemsCount + chunkSize, childrenArray.length)
                    );
                },
                { timeout: 200 }
            );
        }
    }, [renderedItemsCount, childrenArray.length, chunkSize]);

    return childrenArray.slice(0, renderedItemsCount);
};

export default Defer