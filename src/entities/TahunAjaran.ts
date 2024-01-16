import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "data_tahun_ajaran" })
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
}
