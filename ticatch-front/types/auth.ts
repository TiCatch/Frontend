export interface TokenDto {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
}

export interface LoginResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
  data: {
    userId: number;
    userNickname: string;
    userScore: number;
    credentialId: string;
    userEmail: string;
    visited: boolean;
    createdDate: string;
    modifiedDate: string;
    tokenDto: TokenDto;
  };
}
