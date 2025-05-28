//signing up user object data

export interface accessTokenRespBody{
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}

export class loginReqBody{
  userName: string;
  password: string;
  constructor(){
    this.userName='';
    this.password='';
  }
}

export interface  loginRespBody {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    image: null;
    userName: string;
    phoneNumber: string;
  };
}

