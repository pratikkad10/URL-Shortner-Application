import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface-container-lowest border-t border-outline-variant flat no shadows w-full mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 max-w-7xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <span className="text-label-md font-headline-sm font-bold text-on-surface">LinkSnap</span>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">© 2024 LinkSnap Inc. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                    <Link className="text-on-surface hover:text-primary hover:underline transition-colors duration-200 text-label-sm font-medium" to="/privacy">Privacy Policy</Link>
                    <Link className="text-on-surface hover:text-primary hover:underline transition-colors duration-200 text-label-sm font-medium" to="/terms">Terms of Service</Link>
                    <Link className="text-on-surface hover:text-primary hover:underline transition-colors duration-200 text-label-sm font-medium" to="/status">Status</Link>
                    <Link className="text-on-surface hover:text-primary hover:underline transition-colors duration-200 text-label-sm font-medium" to="/contact">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
