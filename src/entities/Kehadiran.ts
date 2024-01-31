import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "./Users";
import { Halaqoh } from "./Halaqoh";

@Entity({ name: "meet" })
export class Kehadiran {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meet: string;

  @Column()
  status: string;

  @Column()
  tanggal: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { cascade: true })
  // @JoinColumn()
  user: User;

  @ManyToOne(() => Halaqoh, { cascade: true })
  @JoinColumn()
  halaqoh: Halaqoh;
}
