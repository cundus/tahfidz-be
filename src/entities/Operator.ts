import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "data_operator" })
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_lengkap: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  NIO: string;

  @Column()
  tempat_lahir: string;

  @Column()
  tanggal_lahir: Date;

  @Column()
  jenis_kelamin: string;

  @Column()
  email: string;

  @Column()
  nomor_telepon: string;

  @Column()
  posisi: string;

  @Column()
  tanggal_bergabung: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ default: false })
  status: boolean;

  @Column({ nullable: true })
  foto: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
