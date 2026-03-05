export interface User {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
  status: 'active' | 'deactive';
  createdAt: string;
  updatedAt: string;
}

export interface UsersListData {
  status: boolean;
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UsersApiResponse {
  data: UsersListData;
}
