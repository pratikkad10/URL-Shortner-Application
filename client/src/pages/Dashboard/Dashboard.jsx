import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Dashboard = () => {
    return (
        <div className="bg-surface text-on-surface font-body-md min-h-screen p-8">
            <header className="flex justify-between items-center mb-8">
                <Link to="/" className="text-headline-md font-headline-md font-bold text-primary">
                    LinkSnap
                </Link>
                <div className="flex gap-4">
                    <Button variant="ghost">Settings</Button>
                    <Link to="/login"><Button variant="outline">Log out</Button></Link>
                </div>
            </header>
            
            <main>
                <h1 className="text-display-sm font-bold mb-4">Dashboard</h1>
                <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-sm text-center">
                    <p className="text-body-lg text-on-surface-variant">
                        This is a placeholder for the User Dashboard.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
