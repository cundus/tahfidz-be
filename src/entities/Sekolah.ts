import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "sekolah" })
export class Sekolah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_sekolah: string;

  @Column()
  nomor_telepon: string;

  @Column()
  email: string;

  @Column()
  alamat: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
