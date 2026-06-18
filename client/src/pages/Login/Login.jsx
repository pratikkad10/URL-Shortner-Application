import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Login = () => {
    return (
        <div>
            <h1 className="text-headline-sm font-headline-sm text-on-surface mb-6 text-center">Welcome back</h1>
            <p className="text-body-md text-on-surface-variant mb-6 text-center">
                This is a placeholder for the Login form.
            </p>
            <Button variant="primary" className="w-full justify-center mb-4">Log in</Button>
            <div className="text-center text-body-sm text-on-surface-variant">
                Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;
