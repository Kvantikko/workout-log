export const getScrollbarWidth = () => {
    return(
        document.getElementById('main').offsetWidth -  document.getElementById('main').clientWidth
    )
    //window.innerWidth - document.documentElement.clientWidth;
}
    
