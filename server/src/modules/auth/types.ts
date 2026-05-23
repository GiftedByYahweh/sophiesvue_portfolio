export interface LoginPayload {
  username: string;
  password: string;
  userAgent: string;
  ipAddress: string;
}

export interface LoginResult {
  sessionId: string;
  maxAge: number;
}
