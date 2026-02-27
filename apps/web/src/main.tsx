import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  AppProvider,
  Page,
  Card,
  Text,
  TextField,
  Button,
  BlockStack,
  InlineStack,
  Banner,
} from '@shopify/polaris';

const API_BASE = 'https://shopify.firstdemo.cn/api';

function App() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const endpoint = mode === 'register' ? 'auth/register' : 'auth/login';
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || '请求失败');

      if (data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }

      setMessage(mode === 'register' ? '注册成功，请登录。' : '登录成功。');

      if (mode === 'register') {
        setMode('login');
        setPassword('');
      }
    } catch (e) {
      setIsError(true);
      setMessage((e as Error).message || '请求失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppProvider i18n={{}}>
      <Page title="WZ Dropshipping Shopify App">
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              {mode === 'login' ? '邮箱登录' : '邮箱注册'}
            </Text>

            <InlineStack gap="200">
              <Button pressed={mode === 'login'} onClick={() => setMode('login')}>
                登录
              </Button>
              <Button pressed={mode === 'register'} onClick={() => setMode('register')}>
                注册
              </Button>
            </InlineStack>

            {message ? (
              <Banner title={isError ? '操作失败' : '操作成功'} tone={isError ? 'critical' : 'success'}>
                <p>{message}</p>
              </Banner>
            ) : null}

            <TextField
              label="邮箱"
              type="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />

            <TextField
              label="密码"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
              placeholder="至少 6 位"
            />

            <Button
              variant="primary"
              loading={loading}
              onClick={submit}
              disabled={!email || password.length < 6}
            >
              {mode === 'login' ? '登录' : '注册'}
            </Button>
          </BlockStack>
        </Card>
      </Page>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
