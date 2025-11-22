import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

// ---------------------------------------------------------
// Google Public DNSのレスポンス型定義
// ---------------------------------------------------------

const DnsRecordType = {
    A: 1,
    NS: 2,
    CNAME: 5,
    SOA: 6,
    PTR: 12,
    MX: 15,
    TXT: 16,
    AAAA: 28,
    SRV: 33,
    RRSIG: 46,
    ANY: 255,
} as const;

const DnsStatus = {
    NOERROR: 0,
    FORMERR: 1,
    SERVFAIL: 2,
    NXDOMAIN: 3,
    NOTIMP: 4,
    REFUSED: 5,
} as const;

export type DnsRecordType = typeof DnsRecordType[keyof typeof DnsRecordType];
export type DnsStatus = typeof DnsStatus[keyof typeof DnsStatus];

interface DnsQuestion {
    name: string;
    type: DnsRecordType | number;
}

interface DnsRecord {
    name: string;
    type: DnsRecordType | number;
    TTL: number;
    data: string;
}

export interface DnsResponse {
    Status: DnsStatus | number;
    TC: boolean;
    RD: boolean;
    RA: boolean;
    AD: boolean;
    CD: boolean;
    Question: DnsQuestion[];
    Answer?: DnsRecord[];
    Comment?: string;
}


// ---------------------------------------------------------
// IPLocateのレスポンス型定義
// ---------------------------------------------------------

interface AsnInfo {
    asn: string;
    route: string;
    netname: string;
    name: string;
    country_code: string;
    domain: string;
    type: string;
    rir: string;
}

interface PrivacyInfo {
    is_abuser: boolean;
    is_anonymous: boolean;
    is_bogon: boolean;
    is_hosting: boolean;
    is_icloud_relay: boolean;
    is_proxy: boolean;
    is_tor: boolean;
    is_vpn: boolean;
}

interface HostingInfo {
    provider: string;
    domain: string;
    network: string;
}

interface CompanyInfo {
    name: string;
    domain: string;
    country_code: string;
    type: string;
}

interface AbuseInfo {
    address: string;
    country_code: string;
    email: string;
    name: string;
    network: string;
    phone: string;
}

export interface IPLocateResp {
    ip: string;
    country: string;
    country_code: string;
    is_eu: boolean;
    city: string;
    continent: string;
    latitude: number;
    longitude: number;
    time_zone: string;
    postal_code: string;
    subdivision: string;
    currency_code: string;
    calling_code: string;
    is_anycast: boolean;
    is_satellite: boolean;
    asn: AsnInfo;
    privacy: PrivacyInfo;
    hosting: HostingInfo;
    company: CompanyInfo;
    abuse: AbuseInfo;
}

const isUsingDNSSEC = (dnsResponse: DnsResponse): boolean => {
    return dnsResponse.Answer?.some((record) => record.type === DnsRecordType.RRSIG) ?? false;
}

const getAuthoritativeNameServer = (dnsResponse: DnsResponse): string[] => {
    const nameServers: string[] = [];
    dnsResponse.Answer?.forEach((record) => {
        if (record.type === DnsRecordType.NS) {
            nameServers.push(record.data);
        }
    });
    return nameServers;
}

const resolve = async (query: string, type: string): Promise<DnsResponse> => {
    const resolveRes = await fetch(`https://dns.google/resolve?name=${query}&type=${type}&do=true`);
    const resolved: DnsResponse = await resolveRes.json();
    return resolved;
}

export const load: PageServerLoad = async (event) => {
    const query = event.params.address;
    const [resolvedA, resolvedNS] = await Promise.all([resolve(query, 'A'), resolve(query, 'NS')]);

    // NOERRORで解決された場合はクエリがドメイン名であると判断する
    const ipAddress = resolvedA.Status === DnsStatus.NOERROR ? resolvedA.Answer?.find(record => record.type === DnsRecordType.A || record.type === DnsRecordType.AAAA)?.data : query;

    const res = await fetch(`https://iplocate.io/api/lookup/${ipAddress}?apikey=${env.IPLOCATE_API_KEY}`);
    const data: IPLocateResp = await res.json();

    return {
        query: query,
        ipInfo: data,
        resolved: resolvedA,
        isUsingDNSSEC: isUsingDNSSEC(resolvedNS),
        authoritativeNameServers: getAuthoritativeNameServer(resolvedNS),
    };
};
