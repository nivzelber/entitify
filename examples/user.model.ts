import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Address } from "./address.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  registrationDate: boolean;

  @OneToOne(type => Address, address => address.user, { eager: true, cascade: true })
  @JoinColumn()
  address: Address;
}
