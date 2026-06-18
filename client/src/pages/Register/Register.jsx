import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import OAuthButton from '../../components/ui/OAuthButton';
import GoogleIcon from '../../components/ui/icons/GoogleIcon';
import GitHubIcon from '../../components/ui/icons/GitHubIcon';
import { useForm } from '../../hooks/useForm';
import { authService } from '../../services/authService';
import { toast } from 'sonner';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { formData, handleChange } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!formData.terms) {
            toast.error("You must agree to the Terms of Service.");
            return;
        }
        
        setIsLoading(true);
        try {
            await authService.register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                termsAccepted: formData.terms
            });
            
            // Registration successful!
            toast.success("Registration successful! Please check your email to verify your account.");
            navigate('/login'); // Redirect to login page
        } catch (err) {
            console.error('Registration error:', err);
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage); // Keep inline error for accessibility
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="font-headline-md text-headline-md text-on-surface mb-1">Create an account</h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Create your account to get started.</p>
            </div>
            
            {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded mb-6 text-sm font-medium">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Input 
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First Name"
                        placeholder="Jane"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                    />
                    <Input 
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last Name"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                    />
                </div>

                <Input 
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="jane@example.com"
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

                <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                />
                
                <div className="flex items-start">
                    <Checkbox 
                        id="terms"
                        name="terms"
                        required
                        checked={formData.terms}
                        onChange={handleChange}
                        label={
                            <>I agree to the <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.</>
                        }
                    />
                </div>
                <div>
                    <Button 
                        type="submit"
                        variant="primary" 
                        className="w-full justify-center h-[40px]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
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
                Already have an account?{" "}
                <Link className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" to="/login">
                    Sign in
                </Link>
            </p>
        </>
    );
};

export default Register;
