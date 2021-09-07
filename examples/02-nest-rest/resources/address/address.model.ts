import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../user/user.model";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house: number;

  @Column()
  apartment: number;

  @OneToOne(type => User, user => user.address)
  user: User;
}
