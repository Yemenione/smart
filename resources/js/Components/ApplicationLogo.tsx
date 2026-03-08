import { usePage } from '@inertiajs/react';
import { HTMLAttributes } from 'react';

export default function ApplicationLogo(props: HTMLAttributes<HTMLElement>) {
    const { logoUrl, siteName } = usePage().props as any;

    if (logoUrl) {
        return (
            <img
                src={logoUrl}
                alt="Logo"
                className={props.className}
                style={{ maxHeight: '100%', width: 'auto' }}
            />
        );
    }

    return (
        <span className={props.className + " font-heading font-bold tracking-tighter"}>
            {siteName || 'SMARTOUIES'}<span className="text-white/40">.</span>
        </span>
    );
}
