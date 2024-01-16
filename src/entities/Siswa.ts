import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "data_siswa" })
export class Siswa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_lengkap: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  NIS: string;

  @Column()
  tempat_lahir: string;

  @Column()
  tanggal_lahir: Date;

  @Column()
  jenis_kelamin: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ nullable: true })
  foto: string;

  @Column()
  nama_ayah: string;

  @Column()
  nama_ibu: string;

  @Column({ nullable: true })
  nomor_telepon_ayah: string;

  @Column({ nullable: true })
  nomor_telepon_ibu: string;

  @Column({ nullable: true })
  pekerjaan_ayah: string;

  @Column({ nullable: true })
  pekerjaan_ibu: string;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
