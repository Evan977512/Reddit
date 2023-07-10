import { Entity, PrimaryGeneratedColumn, Column, Index, In, OneToMany, BeforeInsert } from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt from "bcryptjs";

@Entity("users")
export default class User {
  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(1, 255, { message: "Email is empty" })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "Must be at least 3 characters long" })
  @Column()
  username: string;

  @Column()
  @Length(6, 13, { message: "Must be at least 6 characters long" })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => ValidationTypes, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
