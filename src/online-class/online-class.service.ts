import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetOnlineClassQueryDto } from './dto/get-online-class-query.dto';
import { HMSCreateRoomDto, OnlineClassDto, RoomInfoDto, UpdateOnlineClassDto } from './dto/online-class.dto';
import { OnlineClassRepository } from './repository/online-class.respository';
import { OnlineClass } from 'src/core/schemas/online-class.schema';
import { HMSRepository } from './repository/online-class-create-hmsroom.repository';

@Injectable()
export class OnlineClassService {
    constructor(
        @InjectModel(OnlineClass.name) private onlineClassModel: Model<OnlineClass>,
        private onlineClassRepository: OnlineClassRepository,
        private hmsRepository: HMSRepository
    ) { }

    async createOnlineClass(onlineClassDto: OnlineClassDto): Promise<Boolean> {
        try {
            const roomInfo: RoomInfoDto = await this.hmsRepository.createHMSRoom({ name: onlineClassDto.title, description: onlineClassDto.description });
            return await this.onlineClassRepository.createOnlineClass(onlineClassDto, roomInfo)
        } catch (error) {
            throw new HttpException('Failed to create online class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async fetchOnlineClass(condition: GetOnlineClassQueryDto) {
        return await this.onlineClassRepository.fetchOnlineClassWithDetails(condition);
    }

    async updateOnlineClass(updateOnlineClassDto: UpdateOnlineClassDto): Promise<OnlineClass> {
        try {
            const updatedClass = await this.onlineClassModel.findByIdAndUpdate(
                updateOnlineClassDto._id,
                updateOnlineClassDto,
                { new: true }
            );

            if (!updatedClass) {
                throw new HttpException('Online class not found', HttpStatus.NOT_FOUND);
            }

            return updatedClass;
        } catch (error) {
            throw new HttpException('Failed to update online class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}