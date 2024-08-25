import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
export type User = any;

@Injectable()

export class UserService {

    constructor(private userRepository: UserRepository){}

    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }

      async createUserType(userTypeDto){
        return this.userRepository.createUserType(userTypeDto);
      }

}