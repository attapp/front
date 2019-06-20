import { Client } from './Client';

export interface Area {
    id: number;
    description: string;
    client: Client;
}
