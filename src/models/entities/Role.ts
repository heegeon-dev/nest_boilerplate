import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity("role", { schema: "season_renewal_dev" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "role_id" })
  roleId: number;

  @Column("varchar", { name: "name", length: 15 })
  name: string;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: "user_role",
    joinColumns: [{ name: "role_id", referencedColumnName: "roleId" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "userId" }],
    schema: "season_renewal_dev",
  })
  users: User[];
}
