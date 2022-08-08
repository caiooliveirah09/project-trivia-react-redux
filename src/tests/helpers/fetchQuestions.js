export  const fetchQuestions = async (token) => {
    // const URL = `https://opentdb.com/api.php?amount=5&token=fdeb4eeef3d821562dc0cae3349bea6dbf364742f04c29f8576584c0d7634e00s`
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`
    const response = await fetch(URL)
    const data = await response.json()
    return data;
}
