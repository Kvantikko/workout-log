import { createSlice } from '@reduxjs/toolkit'
import { logout } from "./userReducer"

/* const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
         

        }
    })
    observer.observe(body, { childList: true, subtree: true });
}

window.onload = observeUrlChange; */

let prevUrl

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: false,
    reducers: {
        expand: (state, action) => {
            if (!window.location.href.includes("#workout")) {
                prevUrl = window.location.href
            }

            window.history.pushState(null, null, prevUrl)
            window.history.replaceState(null, null, `#workout`)


            state = true
            return state
        },
        unExpand: (state, action) => {
            if (prevUrl) {
                window.history.replaceState(null, null, `${prevUrl}`)
            }
            state = false
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return false
        })
    },
});

export const { expand, unExpand } = drawerSlice.actions;

export default drawerSlice.reducer