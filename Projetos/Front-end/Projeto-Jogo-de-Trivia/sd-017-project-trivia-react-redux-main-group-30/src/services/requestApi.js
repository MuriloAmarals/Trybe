export const handleToken = async () => {
  try {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('response_message', data.response_message);
    localStorage.setItem('response_code', data.response_code);
    return data.token;
  } catch (e) {
    return `Error: ${e}`;
  }
};

export const handleExpiredToken = async (token) => fetch(
  `https://opentdb.com/api.php?amount=5&token=${token}`,
)
  .then((res) => res.json())
  .then((data) => data)
  .catch((err) => err);
