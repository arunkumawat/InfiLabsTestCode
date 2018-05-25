import { Interfaces } from "./interfaces"
export interface Device {
    id?: number;
    name: string;
    loopBack: string;
    interfaces?: Interfaces[];
}