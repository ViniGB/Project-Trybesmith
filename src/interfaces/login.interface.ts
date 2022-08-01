interface Login {
  username: string;
  password: string;
  error?: { code?: number, message?: string };
}

export default Login;