import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Return the decoded token
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // return a value if user is logged in
    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string) {
      const decoded = jwtDecode<JwtPayload>(token);
      const expiration = decoded.exp || 0;
      const currentTime = Date.now() / 1000;
      return expiration < currentTime; 
  }

  getToken(): string {
    // Return the token from localStorage
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
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
