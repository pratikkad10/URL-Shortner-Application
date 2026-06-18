import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '../ui/IconButton';

const TopNavBar = () => {
    return (
        <nav className="md:hidden w-full h-16 bg-surface-container-lowest/80 backdrop-blur-md text-on-surface border-b border-outline-variant docked full-width top-0 sticky z-50 flex justify-between items-center px-gutter mx-auto">
            <Link to="/" className="text-headline-md font-headline-md font-bold text-on-surface hover:opacity-80 transition-opacity">LinkSnap</Link>
            <div className="flex items-center gap-2">
                <IconButton icon="search" className="text-on-surface" />
                <div className="relative">
                    <IconButton icon="notifications" className="text-on-surface" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border border-surface pointer-events-none"></span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
                    <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDztr_q9ELiDDc2lUQUq9xkX2FAbaurgqx4iVRrq8ZQZJPK5OR4tuWNE8g4yXpx7FP2zWD54STvlnWXCNC_e2d69fIYZxhwWMhXuerXLKUykX6TNDYFdxPwCllaevWJ-lFXTk0DzOf8GFIQLFzblNx1q-V7drA7s3fjUZ6N9BViMSWlE_t4XX4TY23tKubQ98bG9kw-yiLTLexInPpuPPbM9x2BJlGS_EmSRIyT7NNK9CQaDdxWCYFoy-0io3mD4bA_zA7TghmqNJ4" />
                </div>
            </div>
        </nav>
    );
};

export default TopNavBar;
