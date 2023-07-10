import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity("votes")
export default class Vote extends BaseEntity {
  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  @Column()
  username: string;

  @Column()
  postId: number;

  @ManyToOne(() => Post)
  post: Post;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => Comment)
  comment: Comment;
}
