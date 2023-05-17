import config from 'config';
import axios from 'axios';
import qs from 'qs';
import Logger from '../../utils/logger.util';
import { ICode, GoogleOauthToken, GoogleUserResult, GetGoogleUserInput } from '../../types';
import AppError from '../../utils/error.util';
import { APP_MESSAGES } from '../../languages';


export class GoogleService {
  getOauthToken = async ({ code }: ICode): Promise<GoogleOauthToken> => {

    const rootURl = 'https://oauth2.googleapis.com/token';
    const options = {
      code,
      client_id: config.get<string>('googleClientId'),
      client_secret: config.get<string>('googleClientSecret'),
      redirect_uri: config.get<string>('googleOauthRedirect'),
      grant_type: 'authorization_code',
    };

    try {

      // get google oauth token
      const { data } = await axios.post<GoogleOauthToken>(
        rootURl,
        qs.stringify(options),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return data;
    } catch (err: any) {
      Logger.error(err);
      throw new Error(err);
    }
  }


  getUser = async ({ id_token, access_token }: GetGoogleUserInput): Promise<GoogleUserResult> => {

    try {
      const { data } = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );

      return data;
    } catch (err: any) {
      Logger.error(err);
      throw new AppError(APP_MESSAGES.ACCOUNT.GOOGLE_AUTH_FAILED, 403)
    }
  }
}