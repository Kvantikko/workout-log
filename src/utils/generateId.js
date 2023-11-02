const generateId = () => 
    Number((Math.random() * 1000000).toFixed(0))
    // frontend id, backend will generate own

export default generateId