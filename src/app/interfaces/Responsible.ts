import { Client } from './Client';

export interface Responsible {
    id: number;
    name: string;
    email: string;
    phone: string;
    client: Client;
}