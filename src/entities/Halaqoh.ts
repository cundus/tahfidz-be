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
import { Kehadiran } from "./Kehadiran";
import { TahunAjaran } from "./TahunAjaran";

@Entity({ name: "halaqoh" })
export class Halaqoh {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_halaqoh: string;

  @ManyToOne(() => TahunAjaran)
  tahun_ajaran: TahunAjaran;

  @ManyToOne(() => User) // ManyToOne relationship with User (guru)
  @JoinColumn({ name: "guruId" }) // Specify the join column
  guru: User;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Kehadiran, (kehadiran) => kehadiran.halaqoh)
  @JoinColumn()
  kehadiran: Kehadiran[];
}
