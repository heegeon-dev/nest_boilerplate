import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { PolicyAgreement } from "./PolicyAgreement";
import { Permission } from "./Permission";
import { CompanyInfo } from "./CompanyInfo";

@Entity("user", { schema: "season_renewal_dev" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "id", length: 31 })
  id: string;

  @Column("varchar", { name: "password", length: 256 })
  password: string;

  @Column("varchar", { name: "name", length: 31 })
  name: string;

  @Column("varchar", { name: "address", nullable: true, length: 127 })
  address: string | null;

  @Column("varchar", { name: "address_detail", nullable: true, length: 127 })
  addressDetail: string | null;

  @Column("varchar", { name: "birth_year", nullable: true, length: 15 })
  birthYear: string | null;

  @Column("varchar", { name: "mobile", nullable: true, length: 31 })
  mobile: string | null;

  @Column("varchar", { name: "email", length: 63 })
  email: string;

  @Column("varchar", { name: "overseas", nullable: true, length: 1 })
  overseas: string | null;

  @Column("varchar", { name: "country_num", nullable: true, length: 7 })
  countryNum: string | null;

  @Column("varchar", { name: "signup_source", length: 3 })
  signupSource: string;

  @Column("timestamp", {
    name: "create_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @Column("timestamp", { name: "update_at", nullable: true })
  updateAt: Date | null;

  @Column("timestamp", { name: "expired_at", nullable: true })
  expiredAt: Date | null;

  @Column("varchar", { name: "salt", length: 63 })
  salt: string;

  @Column("varchar", { name: "state", length: 1, default: () => "'C'" })
  state: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToOne(() => PolicyAgreement, (policyAgreement) => policyAgreement.user)
  policyAgreement: PolicyAgreement;

  @ManyToMany(() => Permission, (permission) => permission.users)
  permissions: Permission[];

  @OneToOne(() => CompanyInfo, (companyInfo) => companyInfo.user)
  companyInfo: CompanyInfo;
}
