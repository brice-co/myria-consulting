import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  advisorySession: ["create", "read", "update", "delete"],
  finding: ["create", "read", "validate", "comment"],
  decision: ["create", "read", "update"],
  action: ["create", "read", "update"],
  report: ["read", "share"],
} as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
  ...ownerAc.statements,
  advisorySession: ["create", "read", "update", "delete"],
  finding: ["create", "read", "validate", "comment"],
  decision: ["create", "read", "update"],
  action: ["create", "read", "update"],
  report: ["read", "share"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  advisorySession: ["create", "read", "update", "delete"],
  finding: ["create", "read", "validate", "comment"],
  decision: ["create", "read", "update"],
  action: ["create", "read", "update"],
  report: ["read", "share"],
});

export const member = ac.newRole({
  ...memberAc.statements,
  advisorySession: ["create", "read", "update"],
  finding: ["create", "read", "validate", "comment"],
  decision: ["create", "read"],
  action: ["create", "read", "update"],
  report: ["read"],
});
