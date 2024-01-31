import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Halaqoh } from "./Halaqoh";

@Entity({ name: "tahun_ajaran" })
export class TahunAjaran {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_tahun_ajaran: string;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Halaqoh, (halaqoh) => halaqoh.tahun_ajaran) // ManyToOne relationship with Halaqoh (guru)
  tahun_ajaran: Halaqoh[];
}
