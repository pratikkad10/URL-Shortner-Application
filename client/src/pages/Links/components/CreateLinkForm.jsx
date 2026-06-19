import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useForm } from '../../../hooks/useForm';
import { getShortUrlBase } from '../../../utils/format';

const CreateLinkForm = ({ onSubmit, isLoading }) => {
    const navigate = useNavigate();
    const [showAdvanced, setShowAdvanced] = useState(false);

    const { formData, handleChange } = useForm({
        url: '',
        alias: '',
        expirationDate: '',
        utmSource: '',
        utmMedium: '',
        utmCampaign: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.url) {
            toast.error("Please enter a destination URL.");
            return;
        }
        onSubmit(formData);
    };

    const inputContainerClass = "bg-surface-container-lowest border border-outline-variant rounded focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow h-[40px]";

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
                id="originalUrl"
                name="url"
                type="url"
                label={<>Destination URL <span className="text-error">*</span></>}
                icon="link"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://example.com/very/long/path/to/content"
                required
                containerClassName={`${inputContainerClass} !h-[48px]`}
            />

            <div className="space-y-2 w-full">
                <label className="block font-label-md text-label-md text-on-surface" htmlFor="customAlias">
                    Custom Alias <span className="text-on-surface-variant font-normal">(Optional)</span>
                </label>
                <div className={`flex items-center grow overflow-hidden ${inputContainerClass}`}>
                    <span className="flex items-center px-4 bg-surface-container-low border-r border-outline-variant text-on-surface-variant font-body-md h-full whitespace-nowrap">
                        {getShortUrlBase()}/
                    </span>
                    <input
                        id="customAlias"
                        name="alias"
                        type="text"
                        value={formData.alias}
                        onChange={handleChange}
                        className="grow bg-transparent border-none focus:ring-0 px-4 text-on-surface placeholder-outline focus:outline-none py-3 text-body-md font-body-md"
                        placeholder="my-custom-campaign"
                    />
                </div>
            </div>

            <div className="w-full sm:w-1/2">
                <Input
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    label={<>Expiration Date <span className="text-on-surface-variant font-normal">(Optional)</span></>}
                    icon="calendar_today"
                    containerClassName={inputContainerClass}
                />
            </div>

            <div className="pt-2">
                <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="gap-1! px-2! py-1! -ml-2! text-on-surface-variant hover:text-primary"
                >
                    <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${showAdvanced ? 'rotate-90' : ''}`}>chevron_right</span>
                    Advanced: UTM Parameters
                </Button>
            </div>

            {showAdvanced && (
                <div className="space-y-4 bg-surface-container-lowest border border-outline-variant/50 p-5 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="utmSource"
                            name="utmSource"
                            type="text"
                            label="UTM Source"
                            value={formData.utmSource}
                            onChange={handleChange}
                            placeholder="e.g. google, newsletter"
                            containerClassName={inputContainerClass}
                            size="sm"
                        />
                        <Input
                            id="utmMedium"
                            name="utmMedium"
                            type="text"
                            label="UTM Medium"
                            value={formData.utmMedium}
                            onChange={handleChange}
                            placeholder="e.g. cpc, email"
                            containerClassName={inputContainerClass}
                            size="sm"
                        />
                    </div>
                    <Input
                        id="utmCampaign"
                        name="utmCampaign"
                        type="text"
                        label="UTM Campaign"
                        value={formData.utmCampaign}
                        onChange={handleChange}
                        placeholder="e.g. summer_sale_2024"
                        containerClassName={inputContainerClass}
                        size="sm"
                    />
                </div>
            )}

            <div className="pt-6 border-t border-outline-variant flex justify-end gap-3 mt-8">
                <Button type="submit" className="gap-xs shadow-sm" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate Link"}
                    {!isLoading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                </Button>
            </div>
        </form>
    );
};

export default CreateLinkForm;
