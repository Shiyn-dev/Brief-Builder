# Google Authentication Setup Guide

## Решение проблемы 400: redirect_uri_mismatch

Эта ошибка возникает, когда redirect_uri в запросе не совпадает с настройками в Google Console.

### 1. Настройка Google Console

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Выберите ваш проект
3. Перейдите в "APIs & Services" > "Credentials"
4. Найдите ваш OAuth 2.0 Client ID
5. В разделе "Authorized redirect URIs" добавьте:

#### Для разработки:
```
http://localhost:3000/__/auth/handler
```

#### Для продакшена:
```
https://ваш-домен.com/__/auth/handler
```

### 2. Важные моменты

- ⚠️ **НЕ** добавляйте custom redirect_uri в коде
- ⚠️ **НЕ** используйте `setCustomParameters({ redirect_uri: '...' })`
- ✅ Используйте стандартный `signInWithRedirect(auth, googleProvider)`
- ✅ Firebase автоматически использует `/__/auth/handler` как redirect_uri

### 3. Правильная реализация

```typescript
// ✅ Правильно - стандартный GoogleAuthProvider
const googleProvider = new GoogleAuthProvider()

// ✅ Правильно - стандартный signInWithRedirect
await signInWithRedirect(auth, googleProvider)

// ❌ Неправильно - не делайте так!
// googleProvider.setCustomParameters({ redirect_uri: 'custom-uri' })
```

### 4. Firebase Configuration

Убедитесь, что в `lib/firebase.ts` указан корректный `appId` из Firebase Console:

```typescript
const firebaseConfig = {
  // ... другие настройки
  appId: "1:743757028708:web:ВАШИ_РЕАЛЬНЫЕ_СИМВОЛЫ_ЗДЕСЬ"
}
```

### 5. Отладка

Если ошибка продолжается:

1. Проверьте, что домен в адресной строке точно совпадает с доменом в Google Console
2. Убедитесь, что используется HTTPS для продакшена
3. Проверьте, что appId в firebase.ts не является placeholder'ом
4. Очистите кэш браузера и cookies

### 6. Типичные ошибки

- Использование HTTP вместо HTTPS в продакшене
- Отсутствие точного совпадения домена (с www или без)
- Неправильный порт для localhost
- Placeholder appId в конфигурации Firebase