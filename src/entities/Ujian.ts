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

@Entity({ name: "ujian" })
export class Ujian {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tanggal: Date;

  @Column()
  juz: number;

  @Column()
  kesalahan_hafalan: number;

  @Column()
  kesalahan_tajwid: number;

  @Column()
  nilai_hafalan: number;

  @Column()
  nilai_tajwid: number;

  @Column()
  total_nilai: number;

  @Column()
  keterangan: string;

  @Column()
  penguji: string;

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
