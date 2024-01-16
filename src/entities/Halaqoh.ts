import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "data_halaqoh" })
export class Halaqoh {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_halaqoh: string;

  @Column()
  tahun_ajaran: string;

  @Column()
  nama_guru: string;

  @Column("json")
  nama_anggota: JSON;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
