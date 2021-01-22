export default {
  //Log In Users
  LogIn: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      body: userData,
    };
    const response = await fetch("/login", requestOptions);
    return response;
  },

  //Sign Up New Users
  SignUp: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      body: userData,
    };
    const response = await fetch("/register", requestOptions);
    const data = await response.json();
    return data;
  },
};
