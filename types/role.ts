// A Role as returned by the API (populated)
export interface Role {
  _id: string;
  name: string;
}

export type CreateRoleInput = {
  name: string;
};

export type UpdateRoleInput = {
  name: string;
};
