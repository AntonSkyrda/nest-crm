import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/enteties/user.entity';
import { Group } from '../../groups/entities/group.entity';
import { OrderComment } from './order-comment.entity';
import { OrderStatusEnum } from '../../enums/order-status.enum';
import { OrderCoursesEnum } from '../../enums/order-courses.enum';
import { OrderCoursesTypeEnum } from '../../enums/order-courses-type.enum';
import { OrderCoursesTypeFormatEnum } from '../../enums/order-courses-format.enum';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 25, nullable: true })
  surname: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string | null;

  @Column({ type: 'int', nullable: true })
  age: number | null;

  @Column({ type: 'enum', enum: OrderCoursesEnum, nullable: true })
  course: OrderCoursesEnum | null;

  @Column({ type: 'enum', enum: OrderCoursesTypeFormatEnum, nullable: true })
  course_format: string | null;

  @Column({ type: 'enum', enum: OrderCoursesTypeEnum, nullable: true })
  course_type: string | null;

  @Column({ type: 'int', nullable: true })
  sum: number | null;

  @Column({ type: 'int', nullable: true })
  alreadyPaid: number | null;

  @CreateDateColumn()
  @Column({ type: 'datetime', precision: 6, nullable: true })
  created_at: Date | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  utm: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  msg: string | null;

  @Column({ type: 'enum', enum: OrderStatusEnum, nullable: true })
  status: OrderStatusEnum | null;

  @Column({ type: 'int', nullable: true })
  managerId: number | null;

  @Column({ type: 'int', nullable: true })
  groupId: number | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'managerId' })
  manager: User | null;

  @ManyToOne(() => Group, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'groupId' })
  group: Group | null;

  @OneToMany(() => OrderComment, (comment) => comment.order, { cascade: false })
  comments: OrderComment[];
}
