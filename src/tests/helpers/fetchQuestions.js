export  const fetchQuestions = async (token) => {
    //const URL = `https://opentdb.com/api.php?amount=5&token=9dd4626953be02120e447d5ef1112a5e6ba1aebd77609e4e53548fa5b676f6a2`
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`
    const response = await fetch(URL)
    const data = await response.json()
    return data;
} 
