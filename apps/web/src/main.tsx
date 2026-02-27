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
} from '@shopify/polaris';

const API_BASE = 'http://localhost:3000/api';

function App() {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setResult('');
    try {
      const endpoint = mode === 'register' ? 'auth/register' : 'auth/login';
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'register' ? { email, password, name } : { email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '请求失败');
      setResult(`成功：${JSON.stringify(data, null, 2)}`);
    } catch (e) {
      setResult(`失败：${(e as Error).message}`);
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
              {mode === 'register' ? '注册' : '登录'}（V1 起步版）
            </Text>
            <InlineStack gap="200">
              <Button pressed={mode === 'register'} onClick={() => setMode('register')}>
                注册
              </Button>
              <Button pressed={mode === 'login'} onClick={() => setMode('login')}>
                登录
              </Button>
            </InlineStack>

            {mode === 'register' && (
              <TextField label="姓名" autoComplete="name" value={name} onChange={setName} />
            )}
            <TextField label="邮箱" autoComplete="email" value={email} onChange={setEmail} />
            <TextField
              label="密码"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
            />
            <Button variant="primary" loading={loading} onClick={submit}>
              提交
            </Button>
            {result && (
              <Text as="pre" variant="bodySm">
                {result}
              </Text>
            )}
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
