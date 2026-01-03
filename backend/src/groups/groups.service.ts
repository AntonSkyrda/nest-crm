import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const newGroup = this.groupsRepository.create(createGroupDto);
    return this.groupsRepository.save(newGroup);
  }
}
