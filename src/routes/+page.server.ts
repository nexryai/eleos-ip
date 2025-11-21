import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

type IPInfoResp = {
    ip: string;
    asn: string;
    as_name: string;
    as_domain: string;
    country_code: string;
    country: string;
    continent_code: string;
    continent: string;
};

export const load: PageServerLoad = async (event) => {
    const clientIPAddress = event.getClientAddress();

    const res = await fetch(`https://ipinfo.io/${clientIPAddress}/json?token=${env.IPINFO_TOKEN}`);
    const data: IPInfoResp = await res.json();

    return {
        ipInfo: data
    };
};