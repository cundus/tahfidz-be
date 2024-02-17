import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";
import { User } from "./Users";

@Entity({ name: "profile" })
export class Profile {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   nama_lengkap: string;

   // @Column()
   // username: string;

   // @Column()
   // password: string;

   @Column()
   nomor_induk: string;

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

   @Column({ nullable: true, default: "" })
   nama_ayah: string;

   @Column({ nullable: true, default: "" })
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

   @Column({ nullable: true, default: "" })
   email: string;

   @Column({ nullable: true, default: "" })
   nomor_telepon: string;

   @Column({ nullable: true, default: "" })
   posisi: string;

   @Column({ nullable: true, default: "" })
   tanggal_bergabung: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @OneToOne(() => Profile, { cascade: true })
   @JoinColumn()
   user: User;
}
