import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const API_URL = 'http://localhost:8000';

export async function register(
    email: string,
    password: string,
    username: string,
    phoneNumber: string
){
    try{
        // Make a POST request to the registration endpoint
        const response = await axios.post(`${API_URL}/auth/api/signup/`, {
            email,
            username,
            phone_number1: phoneNumber,
            password
        });

        // Redirect to the signin page after successful registration
        window.location.href = '/';
        return response.data;
    } catch (error: any) {
        // Handle registration errors
        if (error.response && error.response.data) {
            // Throw specific error message from backend
            throw new Error(
                error.response.data.detail || 
                error.response.data.message || 
                'Registration failed'
            );
        }
        // Generic error if no specific message
        throw new Error('An unexpected error occurred during registration');
    }
}

export async function login(email: string, password: string) {
    try {
        // Make a POST request to the login endpoint
        const response = await axios.post(`${API_URL}/auth/api/login/`, {
            email,
            password
        });

        // Extract tokens and user data from the response
        const { tokens, user } = response.data;

        // Store tokens in local storage
        localStorage.setItem(ACCESS_TOKEN, tokens.access);
        localStorage.setItem(REFRESH_TOKEN, tokens.refresh);

        // Redirect to HR dashboard after successful login
        window.location.href = '/dashboard';

        return user;
    } catch (error: any) {
        // Handle login errors
        if (error.response && error.response.data) {
            throw new Error(error.response.data.detail || 'Login failed');
        }
        throw new Error('An unexpected error occurred during login');
    }
}

export function logout() {
    try {
        // Get the refresh token from local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        // Send logout request to the backend
        axios.post(`${API_URL}/auth/api/logout/`, {
            refresh: refreshToken
        });

        // Remove tokens from local storage
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);

        // Redirect to the signin page
        window.location.href = '/';
        
    } catch (error) {
        // Even if logout request fails, clear local storage and redirect
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);

        // Redirect to the signin page
        window.location.href = '/';
    }
}