import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Register = () => {
    return (
        <div>
            <h1 className="text-headline-sm font-headline-sm text-on-surface mb-6 text-center">Create an account</h1>
            <p className="text-body-md text-on-surface-variant mb-6 text-center">
                This is a placeholder for the Registration form.
            </p>
            <Button variant="primary" className="w-full justify-center mb-4">Sign up</Button>
            <div className="text-center text-body-sm text-on-surface-variant">
                Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
            </div>
        </div>
    );
};

export default Register;
