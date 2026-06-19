import React, { useState, useEffect } from 'react';
import LinksFilterBar from './components/LinksFilterBar';
import LinksTable from './components/LinksTable';
import EditLinkModal from './components/EditLinkModal';
import { urlService } from '../../services/urlService';
import { toast } from 'sonner';

const Links = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingLink, setEditingLink] = useState(null);
    
    // Pagination states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchLinks = async () => {
        setIsLoading(true);
        try {
            const response = await urlService.getCodes(page, limit);
            if (response.success) {
                setLinks(response.data.items || []);
                if (response.data.pagination) {
                    setTotalPages(response.data.pagination.totalPages);
                    setTotalItems(response.data.pagination.totalItems);
                }
            }
        } catch (error) {
            toast.error("Failed to load links");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [page, limit]);

    const handleEdit = (link) => {
        setEditingLink(link);
    };

    const handleDelete = async (shortUrl) => {
        if (window.confirm("Are you sure you want to delete this link? This action cannot be undone.")) {
            try {
                await urlService.deleteUrl(shortUrl);
                toast.success("Link deleted successfully");
                fetchLinks(); // Refresh the list
            } catch (error) {
                toast.error("Failed to delete link");
                console.error(error);
            }
        }
    };

    const handleSave = async (id, data) => {
        try {
            await urlService.updateUrl(id, data);
            toast.success("Link updated successfully");
            fetchLinks(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update link");
            throw error; // Re-throw to be caught by modal for loading state
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-container-max mx-auto w-full flex-1 flex flex-col">
            <LinksFilterBar 
                page={page} 
                limit={limit} 
                totalItems={totalItems} 
            />
            <LinksTable 
                links={links}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                totalPages={totalPages}
                totalItems={totalItems}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            
            {editingLink && (
                <EditLinkModal 
                    link={editingLink} 
                    onClose={() => setEditingLink(null)} 
                    onSave={handleSave} 
                />
            )}
        </div>
    );
};

export default Links;
