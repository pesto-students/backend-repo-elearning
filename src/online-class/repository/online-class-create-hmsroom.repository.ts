import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HmsAxiosService } from 'src/config/hms-axios.config';
import { HMSCreateRoomDto, RoomInfoDto } from '../dto/online-class.dto';

const DEFAULT_TEMPLATE_ID = ''

@Injectable()
export class HMSRepository {
    constructor(private hmsAxiosService: HmsAxiosService) { }

    async createHMSRoom(hmsCreateRoomDto: HMSCreateRoomDto): Promise<RoomInfoDto> {
        try {
            const hms = this.hmsAxiosService.getHmsInstance()
            const response = await hms.post('/rooms', hmsCreateRoomDto);
            return response.data as RoomInfoDto;
        } catch (error) {
            console.log(error)
            throw new HttpException('Failed to create 100ms room', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}