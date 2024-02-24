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

@Entity({ name: "hafalan" })
export class Hafalan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  baris: string;

  @Column()
  surat_awal: string;

  @Column()
  surat_akhir: string;

  @Column()
  ayat_awal: string;

  @Column()
  ayat_akhir: string;

  @Column()
  nilai_hafalan: string;

  @Column()
  nilai_tajwid: string;

  @Column()
  tanggal: Date

  @Column()
  type: string;

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
