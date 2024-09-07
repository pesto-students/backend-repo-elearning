import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HmsAxiosConfig {
    constructor(private configService: ConfigService) { }

    getHMSBaseUri(): string {
        return this.configService.get<string>('HMS_BASE_URI');
    }

    getHMSManagementToken(): string {
        return this.configService.get<string>('HMS_MANAGEMENT_TOKEN');
    }
}

@Injectable()
export class HmsAxiosService {
    private hms;

    constructor(private config: HmsAxiosConfig) {
        this.hms = axios.create({
            baseURL: this.config.getHMSBaseUri()
        });

        this.hms.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${this.config.getHMSManagementToken()}`;
                config.headers['Content-Type'] = "application/json";
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

    }

    getHmsInstance() {
        return this.hms;
    }
}