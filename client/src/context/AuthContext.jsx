import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const data = await authService.checkAuth();
            if (data.success && data.data) {
                setUser(data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
            if (error.response?.status !== 401) {
                console.error("Auth check failed:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
            if (data.success) {
                // Backend returns only userId on login, so we fetch the full user profile
                await checkAuthStatus();
                toast.success('Logged in successfully');
                return { success: true };
            }
            return { success: false, error: data.message || 'Login failed' };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Failed to logout');
        }
    };

    const register = async (userData) => {
        try {
            const data = await authService.register(userData);
            if (data.success) {
                toast.success('Registration successful! Please check your email to verify your account.');
                return { success: true };
            }
            return { success: false, error: data.message || 'Registration failed' };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
