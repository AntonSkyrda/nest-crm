import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_comments')
export class OrderComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar', length: 255 })
  authorLastName: string;

  @Column({ name: 'orderId', type: 'bigint', nullable: false })
  orderId: number;

  @ManyToOne(() => Order, (order) => order.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
