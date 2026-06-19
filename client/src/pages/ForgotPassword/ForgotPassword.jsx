import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { toast } from 'sonner';
import { authService } from '../../services/authService';

const ForgotPassword = () => {
    const navigate = useNavigate();
    // step 1: email, step 2: otp, step 3: new password
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const inputRefs = useRef([]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await authService.forgotPassword(email);
            if (result.success) {
                toast.success('OTP sent to your email!');
                setStep(2);
            } else {
                setError(result.message || 'Failed to send OTP.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.every(char => /^[0-9]$/.test(char))) {
            const newOtp = [...otp];
            pastedData.forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });
            setOtp(newOtp);
            // Focus last input or next empty
            const nextEmptyIndex = newOtp.findIndex(val => val === '');
            const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
            inputRefs.current[focusIndex].focus();
        }
    };

    const handleVerifyOtpStep = (e) => {
        e.preventDefault();
        setError('');
        if (otp.join('').length !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }
        // Since backend verifies OTP and Password together, we just move to next step
        setStep(3);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            const finalOtp = otp.join('');
            const result = await authService.resetPasswordWithOtp({ email, otp: finalOtp, newPassword });
            if (result.success) {
                toast.success('Password reset successfully! Please sign in.');
                navigate('/login');
            } else {
                setError(result.message || 'Failed to reset password.');
            }
        } catch (err) {
            // If OTP is invalid, the backend will throw here. Go back to OTP step if needed.
            setError(err.response?.data?.message || 'Invalid OTP or something went wrong.');
            if (err.response?.data?.message?.toLowerCase().includes('otp')) {
                setStep(2);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
                    {step === 1 && 'Reset Password'}
                    {step === 2 && 'Verify OTP'}
                    {step === 3 && 'New Password'}
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {step === 1 && 'Enter your email and we will send you an OTP to reset your password.'}
                    {step === 2 && `We've sent a 6-digit OTP to ${email}.`}
                    {step === 3 && 'Create a new, strong password.'}
                </p>
            </div>

            {error && (
                <div className="bg-error-container text-on-error-container p-3 rounded mb-6 text-sm font-medium">
                    {error}
                </div>
            )}

            {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="name@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                    />
                    <div>
                        <Button type="submit" variant="primary" className="w-full justify-center h-[40px]" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtpStep} className="space-y-6">
                    <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className="w-12 h-14 text-center text-xl font-semibold bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        ))}
                    </div>
                    <div>
                        <Button type="submit" variant="primary" className="w-full justify-center h-[40px]">
                            Continue
                        </Button>
                        <Button type="button" variant="outline" className="w-full justify-center h-[40px] mt-3" onClick={() => setStep(1)}>
                            Back
                        </Button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        label="New Password"
                        placeholder="••••••••"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                    />
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="••••••••"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        containerClassName="bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]"
                    />
                    <div>
                        <Button type="submit" variant="primary" className="w-full justify-center h-[40px]" disabled={isLoading}>
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                        <Button type="button" variant="outline" className="w-full justify-center h-[40px] mt-3" onClick={() => setStep(2)}>
                            Back
                        </Button>
                    </div>
                </form>
            )}

            {step === 1 && (
                <p className="mt-6 text-center font-body-sm text-body-sm text-on-surface-variant">
                    Remember your password?{" "}
                    <Link className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" to="/login">
                        Sign in
                    </Link>
                </p>
            )}
        </>
    );
};

export default ForgotPassword;
