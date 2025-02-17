import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const targetPath = req.nextUrl.pathname.replace('/proxy', '');
    const targetURL = `${backendURL}${targetPath}${req.nextUrl.search}`;

    const isKakaoLogin = targetPath.includes('/auth/login/kakao');
    const isReissue = targetPath.includes('/auth/reissue');

    if (!isKakaoLogin && !isReissue) {
      return NextResponse.json(
        { message: 'Only auth requests should go through proxy' },
        { status: 403 },
      );
    }

    console.log('targetURL: ', targetURL);

    const headers: Record<string, string> = {};
    if (!isKakaoLogin) {
      headers['Authorization'] = req.headers.get('authorization') || '';
      headers['Cookie'] = req.headers.get('cookie') || '';
    }

    const response = await axios.get(targetURL, {
      headers,
      withCredentials: true,
    });

    const res = NextResponse.json(response.data);
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      res.headers.set('Set-Cookie', setCookieHeader[0]);
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Proxy Error', details: error.message },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const targetPath = req.nextUrl.pathname.replace('/proxy', '');
    const targetURL = `${backendURL}${targetPath}`;

    if (!targetPath.includes('/auth/logout')) {
      return NextResponse.json(
        { message: 'Only auth requests should go through proxy' },
        { status: 403 },
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: req.headers.get('authorization') || '',
      Cookie: req.headers.get('cookie') || '',
    };

    const response = await axios.post(targetURL, undefined, {
      headers,
      withCredentials: true,
    });

    const responseData = response.data || { message: 'No response data' };
    const res = NextResponse.json(responseData);
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        setCookieHeader.forEach((cookie) =>
          res.headers.append('Set-Cookie', cookie),
        );
      } else {
        res.headers.set('Set-Cookie', setCookieHeader);
      }
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Proxy Error',
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 },
    );
  }
}
