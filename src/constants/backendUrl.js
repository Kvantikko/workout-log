const getBackendUrl = () => {
    if (import.meta.env.PROD) return 'workout-log-ahlp.onrender.com'
    if (import.meta.env.DEV) return 'localhost:8080'
    if (import.meta.env.TEST) return 'localhost:8080'
} 

export const backendUrl = getBackendUrl()