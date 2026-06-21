import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import OAuthButton from '../../components/ui/OAuthButton';
import GoogleIcon from '../../components/ui/icons/GoogleIcon';
import GitHubIcon from '../../components/ui/icons/GitHubIcon';
import { useForm } from '../../hooks/useForm';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Initialize our custom form hook
    const { formData, handleChange } = useForm({
        email: '',
        password: '',
    });

    const { login } = useAuth();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the browser from refreshing the page
        setError('');
        setIsLoading(true);

        const result = await login({
            email: formData.email,
            password: formData.password
        });

        if (!result.success) {
            setError(result.error);
        }
        
        setIsLoading(false);
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface mb-1">Sign in to LinkSnap</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Welcome back! Please enter your details.</p>
            </div>

            {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded mb-6 text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Attach the submit handler to the form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="name@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                />

                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                />

                <div className="flex items-center justify-between">
                    <Checkbox
                        id="remember-me"
                        name="rememberMe"
                        label="Remember me"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />
                    <div className="text-sm">
                        <Link className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors" to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full justify-center h-[40px]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-outline-variant"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <OAuthButton
                        provider="Google"
                        iconSvg={<GoogleIcon />}
                    />
                    <OAuthButton
                        provider="GitHub"
                        iconSvg={<GitHubIcon />}
                    />
                </div>
            </div>

            <p className="mt-6 text-center font-body-sm text-body-sm text-on-surface-variant">
                Don't have an account?{" "}
                <Link className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" to="/register">
                    Create account
                </Link>
            </p>
        </>
    );
};

export default Login;
