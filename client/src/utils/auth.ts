import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // Return the decoded token
    const token = this.getToken();
    if (!token) throw new Error("No token found");
    return jwtDecode<UserData>(token);
  }

  loggedIn() {
    // Return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false; 
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime; 
    } catch (err) {
      console.error("Error decoding token:", err);
      return true;
    }
  }

  getToken(): string | null {
    // Return the token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // Redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('id_token');
    // Redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
