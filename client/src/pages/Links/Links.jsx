import React from 'react';
import LinksFilterBar from './components/LinksFilterBar';
import LinksTable from './components/LinksTable';

const Links = () => {
    return (
        <div className="p-4 md:p-8 max-w-container-max mx-auto w-full flex-1 flex flex-col">
            <LinksFilterBar />
            <LinksTable />
        </div>
    );
};

export default Links;
