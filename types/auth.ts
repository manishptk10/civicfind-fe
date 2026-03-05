export interface ApiStatusResponse {
  data: {
    status: boolean;
    message: string;
    access_token: string;
    email: string;
    code: 'NOT_VERIFIED' | 'LIMIT_EXCEED' | 'BLOCKED';
  };
}
