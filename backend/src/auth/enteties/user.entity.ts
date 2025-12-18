import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Token } from './token.entity';
import { RoleEnum } from '../../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.MANAGER })
  role: RoleEnum;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) return;

    if (this.password.startsWith('$argon2')) {
      return;
    }

    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  async validatePassword(password: string): Promise<boolean> {
    if (!password) return false;
    try {
      return await argon2.verify(this.password, password);
    } catch {
      return false;
    }
  }
}
