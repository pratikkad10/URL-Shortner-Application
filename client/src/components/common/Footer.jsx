const Footer = () => {
    return (
        <footer className="bg-surface-container-lowest border-t border-outline-variant flat no shadows w-full mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 max-w-7xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <span className="text-label-md font-headline-sm font-bold text-on-surface">LinkSnap</span>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">© 2024 LinkSnap Inc. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                    <a className="text-on-surface-variant dark:text-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-inverse-primary underline transition-all" href="#">Privacy Policy</a>
                    <a className="text-on-surface-variant dark:text-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-inverse-primary underline transition-all" href="#">Terms of Service</a>
                    <a className="text-on-surface-variant dark:text-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-inverse-primary underline transition-all" href="#">Status</a>
                    <a className="text-on-surface-variant dark:text-surface-variant text-label-sm font-label-sm hover:text-primary dark:hover:text-inverse-primary underline transition-all" href="#">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
