import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Index("FK_role_TO_permission_1", ["roleId"], {})
@Entity("permission", { schema: "season_renewal_dev" })
export class Permission {
  @PrimaryGeneratedColumn({ type: "int", name: "permission_id" })
  permissionId: number;

  @Column("int", { name: "role_id", nullable: true })
  roleId: number | null;

  @Column("varchar", { name: "name", length: 15 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Role;

  @ManyToMany(() => User, (user) => user.permissions)
  @JoinTable({
    name: "user_permission",
    joinColumns: [
      { name: "permission_id", referencedColumnName: "permissionId" },
    ],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "userId" }],
    schema: "season_renewal_dev",
  })
  users: User[];
}
