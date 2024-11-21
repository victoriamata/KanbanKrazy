import { UserLogin } from "../interfaces/UserLogin";

// Function to handle user login
const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the login route with the user's login information
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo), // Convert the userInfo object to a JSON string to send in the request body
    });

    // Check if the response status indicates a failed request
    if (!response.ok) {
      // Initialize a default error message
      let errorMessage = "An error occurred";

      // Try to extract a more specific error message from the response body
      try {
        const errorData = await response.json(); // Parse the response body as JSON
        errorMessage = errorData.message || errorMessage; // Use the message from the response if available
      } catch {
        // Fallback to the response's status text if parsing fails
        errorMessage = response.statusText;
      }

      // Throw an error with the constructed error message
      throw new Error(`Error: ${errorMessage}`);
    }

    // Parse the response body as JSON to get the data
    const data = await response.json();

    // Return the token from the response data
    return data.token;
  } catch (err) {
    // Log any errors that occur during the login process to the console
    console.error("Login error:", err);

    // Return the error object
    return err;
  }
};

// Export the login function for use in other parts of the application
export { login };
