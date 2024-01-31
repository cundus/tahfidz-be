// UserEntity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Profile } from "./Profile";
import { Halaqoh } from "./Halaqoh";
import { Kehadiran } from "./Kehadiran";
// import { Post } from "./Posts";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @ManyToOne(() => Halaqoh, (halaqoh) => halaqoh.guru) // ManyToOne relationship with Halaqoh (guru)
  guru: Halaqoh;

  // @ManyToOne(() => Halaqoh, (halaqoh) => halaqoh.siswa) // ManyToOne relationship with Halaqoh (siswa)
  // siswaOfHalaqoh: Halaqoh;

  // @OneToMany(() => Post, (post) => post.user)
  // posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, { cascade: true }) // Define the OneToOne relationship
  @JoinColumn() // Specify the join column
  profile: Profile; // Add this property

  @OneToMany(() => Kehadiran, (kehadiran) => kehadiran.user)
  kehadiran: Kehadiran[];
}
