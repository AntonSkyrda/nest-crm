import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/enteties/user.entity';

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

  @Column({ type: 'varchar', length: 10, nullable: true })
  course: string | null;

  @Column({ type: 'varchar', length: 15, nullable: true })
  course_format: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
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

  @Column({ type: 'varchar', length: 15, nullable: true })
  status: string | null;

  @Column({ type: 'int', nullable: true })
  managerId: number | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  manager: User | null;
}
