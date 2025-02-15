import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  try {
    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
    const targetPath = req.nextUrl.pathname.replace('/proxy', '');
    const targetURL = `${backendURL}${targetPath}${req.nextUrl.search}`;

    const response = await axios.get(targetURL, {
      headers: {
        Authorization: req.headers.get('authorization') || '',
        Cookie: req.headers.get('cookie') || '',
      },
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
    const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
    const targetPath = req.nextUrl.pathname.replace('/proxy', '');
    const targetURL = `${backendURL}${targetPath}`;

    const isLogoutRequest = targetPath.includes('/auth/logout');
    const isLoginRequest = targetPath.includes('/auth/login');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (!isLoginRequest) {
      const authToken = req.headers.get('authorization') || '';
      const cookie = req.headers.get('cookie') || '';

      if (authToken) headers['Authorization'] = authToken;
      if (cookie) headers['Cookie'] = cookie;
    }

    // 로그아웃 요청이면 body 없이 요청
    const body = isLogoutRequest ? undefined : await req.json();

    const response = await axios.post(targetURL, body, {
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
