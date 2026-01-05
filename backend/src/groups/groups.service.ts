import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const newGroup = this.groupsRepository.create(createGroupDto);
      return await this.groupsRepository.save(newGroup);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const err = e as any;

        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err.driverError?.code === 'ER_DUP_ENTRY' ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err.driverError?.code === '23505'
        ) {
          throw new ConflictException('Group name must be unique');
        }
      }
      throw e;
    }
  }
}
