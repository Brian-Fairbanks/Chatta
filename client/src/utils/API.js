export default {
  //Log In Users
  LogIn: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // "username " seems to be hard coded into the passport authenticate strategy.
        username: userData.email,
        password: userData.password,
      }),
    };
    const response = await fetch("/login", requestOptions);
    const data = await response.json();
    return { status: response.status, ...data };
  },

  //Sign Up New Users
  SignUp: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch("/register", requestOptions);
    const data = await response.json();
    return { status: response.status, ...data };
  },

  // retrieve a list of all users matching a search parameter
  FindOtherUsers: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(
      "/api/user/search/" + userData,
      requestOptions
    );
    const data = await response.json();
    return { status: response.status, ...data };
  },

  // Retrieves all information about a passed conversation
  GetConversation: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(
      "/api/conversation/" + userData.id,
      requestOptions
    );
    const data = await response.json();
    return { status: response.status, ...data };
  },

  // Post a message to a chatroom
  postMessage: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch("/api/message", requestOptions);
    const data = await response.json();
    return { status: response.status, ...data };
  },

  // Retrieves all information about a passed conversation
  getUser: async function (userData) {
    // set up fetch requests
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/user/" + userData.id, requestOptions);
    const data = await response.json();
    return { status: response.status, ...data };
  },
};
