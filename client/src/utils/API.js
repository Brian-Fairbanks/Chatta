export default {
  //Log In Users
  LogIn: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // "username " seems to be hard coded into the passport authenticate strategy.
        username:userData.email,
        password:userData.password
      }),
    };
    const response = await fetch("/login", requestOptions);
    return response;
  },

  //Sign Up New Users
  SignUp: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch("/register", requestOptions);
    const data = await response.json();
    return data;
  },
};
