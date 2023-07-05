import { Column, Entity } from "typeorm";
import BaseEntity from "./Entity";

@Entity("subs")
export default class Sub extends BaseEntity {
  @index()
  @Column({unique:true})
  name:string

  @Column()
  title:string

  @Column({type: 'text', nullable:true})
  description: string;

  @column({nullable:true})
  imgeUrn: string;

  @Column({nullable:true})
  bannerUrn: string;

  @Column()
  username: string;

  @ManyToTone(()=>)
  @JoinColumn({name: 'username', referencedColumnName: 'username'})
  user:User;

  @OneToMant(()=> postMessage,(post)=> post.sub)
  posts: Post[];

  @Expose()
  get image():string {
    return this.imageUrn ? `${process.env.APP_URL}`/images/${this.imageUrn}:
    "https://www.gravatar.com/avatar?dmp$f=y"
  }

  @Expose()
  get bannerUrl():string {
    return this.bannerUrn ? `${process.env.APP_URL}`/images/${this.bannerUrn}`:undefined;
  }

}