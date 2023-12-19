/* import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useLocationState = (newState) => {
    const history = useHistory();
    const locationState = history.location.state ?? null;

    const setLocationState = (newState) =>
        history.replace({
            ...history.location,
            state: newState,
        });

    const clearLocationState = () => {
        history.replace({
            ...history.location,
            state: null,
        });
    };

    useEffect(() => {
        window.addEventListener("beforeunload", clearLocationState);

        return () => {
            window.removeEventListener("beforeunload", clearLocationState);
        };
    }, []);

    return [locationState, setLocationState];
}; */