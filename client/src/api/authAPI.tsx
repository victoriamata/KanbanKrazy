import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the login route
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred during login");
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the token
    return data.token;
  } catch (err) {
    console.error("Login error:", err);
    return err;
  }
};

export { login };
