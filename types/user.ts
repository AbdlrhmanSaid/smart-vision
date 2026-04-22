// User roles are now populated objects from the API
export interface User {
  _id: string;
  username: string;
  roles: { _id: string; name: string }[];
}

// When creating/updating, send role IDs
export type CreateUserInput = {
  username: string;
  password: string;
  roles: string[]; // array of role _id's
};

export type UpdateUserInput = {
  username?: string;
  roles?: string[]; // array of role _id's
};

export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};
