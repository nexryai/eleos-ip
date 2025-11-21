import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

// ---------------------------------------------------------
// 定数定義 (Runtimeにも存在するオブジェクト)
// ---------------------------------------------------------

/** DNSレコードタイプの定義 */
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

/** DNSステータスコードの定義 */
const DnsStatus = {
    NOERROR: 0,
    FORMERR: 1,
    SERVFAIL: 2,
    NXDOMAIN: 3,
    NOTIMP: 4,
    REFUSED: 5,
} as const;


// ---------------------------------------------------------
// 型定義 (TypeScriptの型推論を利用)
// ---------------------------------------------------------

// 値の型を抽出 (例: 1 | 2 | 5 ... )
type DnsRecordType = typeof DnsRecordType[keyof typeof DnsRecordType];

// 値の型を抽出 (例: 0 | 1 | 2 ... )
type DnsStatus = typeof DnsStatus[keyof typeof DnsStatus];

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

interface DnsResponse {
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

export const load: PageServerLoad = async (event) => {
    const clientIPAddress = event.getClientAddress();

    const res = await fetch(`https://api.ipinfo.io/lite/${clientIPAddress}?token=${env.IPINFO_TOKEN}`);
    const data: IPInfoResp = await res.json();

    const resolveRes = await fetch(`https://dns.google/resolve?name=${data.as_domain}&type=NS&do=true`);
    const resolved: DnsResponse = await resolveRes.json();

    return {
        ipInfo: data,
        resolved: resolved,
        isUsingDNSSEC: isUsingDNSSEC(resolved),
        authoritativeNameServers: getAuthoritativeNameServer(resolved),
    };
};