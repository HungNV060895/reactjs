# TypeScript Migration Guide

Hướng dẫn chi tiết để migrate dự án từ JavaScript sang TypeScript theo chuẩn frontend.md

## 📋 Tổng quan

Dự án hiện tại đang sử dụng:
- ✅ Vite 6+ (Build tool)
- ✅ React 18+ (Framework)
- ✅ Ant Design 5+ (UI Components)
- ✅ React Router DOM 6+ (Routing)
- ✅ Axios (HTTP Client)

Cần migrate sang TypeScript để có:
- Type safety
- Better IDE support
- Fewer runtime errors
- Better code documentation

## 🚀 Các bước thực hiện

### Phase 1: Cài đặt TypeScript (✅ Hoàn thành)

```bash
npm install -D typescript @types/react @types/react-dom @types/node
```

**Đã tạo:**
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tsconfig.node.json` - Node configuration
- ✅ `vite.config.js` - Updated with path aliases

### Phase 2: Tạo Type Definitions (✅ Hoàn thành)

**Đã tạo các file types:**
- ✅ `src/types/common.type.ts` - Common types (ApiResponse, Pagination, etc.)
- ✅ `src/types/user.type.ts` - User related types
- ✅ `src/types/api.type.ts` - API related types

**Cần tạo thêm:**
- [ ] `src/types/book.type.ts` - Book types
- [ ] `src/types/product.type.ts` - Product types

### Phase 3: Tạo Utilities & Constants (✅ Hoàn thành)

**Đã tạo:**
- ✅ `src/utils/format.util.ts` - Formatting functions
- ✅ `src/utils/validation.util.ts` - Validation functions
- ✅ `src/constants/API_ENDPOINTS.ts` - API endpoints
- ✅ `src/constants/APP_CONFIG.ts` - App configuration
- ✅ `src/hooks/useAuth.ts` - Auth custom hook

### Phase 4: Tạo Component Templates (✅ Hoàn thành)

**Đã tạo:**
- ✅ `src/components/common/Button.tsx` - Button component template

**Cần tạo thêm:**
- [ ] Các common components khác

### Phase 5: Tạo Service Layer (✅ Hoàn thành)

**Đã tạo:**
- ✅ `src/services/user.service.ts` - User service template

**Cần migrate:**
- [ ] `src/services/api.service.js` → `api.service.ts`
- [ ] `src/services/axios.custom.js` → `axios.custom.ts`

### Phase 6: Migrate Components

**Thứ tự ưu tiên:**

1. **Context (Cao nhất)**
   ```bash
   # Rename và thêm types
   src/components/context/auth.context.jsx → auth.context.tsx
   ```

2. **Layout Components**
   ```bash
   src/components/layout/header.jsx → header.tsx
   src/components/layout/footer.jsx → footer.tsx
   ```

3. **Pages**
   ```bash
   src/pages/login.jsx → login.tsx
   src/pages/register.jsx → register.tsx
   src/pages/user.jsx → user.tsx
   src/pages/book.jsx → book.tsx
   src/pages/product.jsx → product.tsx
   ```

4. **Feature Components**
   ```bash
   src/components/user/* → *.tsx
   src/components/book/* → *.tsx
   src/components/product/* → *.tsx
   ```

### Phase 7: Migrate Core Files

```bash
src/App.jsx → App.tsx
src/main.jsx → main.tsx
```

## 📝 Migration Checklist

### Immediate Actions (Làm ngay)

- [ ] Cài đặt TypeScript dependencies
  ```bash
  npm install -D typescript @types/react @types/react-dom @types/node
  ```

- [ ] Rename `axios.custom.js` → `axios.custom.ts` và thêm types
- [ ] Rename `api.service.js` → `api.service.ts` và thêm types
- [ ] Rename `auth.context.jsx` → `auth.context.tsx` và thêm types

### Short-term (1-2 tuần)

- [ ] Migrate tất cả pages sang TypeScript
- [ ] Migrate layout components
- [ ] Tạo types cho Book và Product
- [ ] Update imports để sử dụng path aliases (@/)

### Long-term (1 tháng)

- [ ] Migrate tất cả feature components
- [ ] Enable strict mode trong tsconfig.json
- [ ] Add unit tests với TypeScript
- [ ] Code review và refactor

## 🎯 Best Practices

### 1. Component Structure

```tsx
import { FC } from 'react';
import type { ComponentProps } from './types';

export const MyComponent: FC<ComponentProps> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};
```

### 2. Props Interface

```tsx
interface MyComponentProps {
  title: string;
  count?: number; // Optional
  onSubmit: (data: FormData) => void;
  children?: React.ReactNode;
}
```

### 3. State Typing

```tsx
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
```

### 4. Event Handlers

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // ...
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### 5. API Calls

```tsx
const fetchUsers = async (): Promise<User[]> => {
  const response = await userService.getUsers();
  return response.data;
};
```

## 🔧 Path Aliases

Sử dụng path aliases để import dễ dàng hơn:

```tsx
// ❌ Bad
import { User } from '../../../types/user.type';

// ✅ Good
import { User } from '@/types/user.type';
```

**Available aliases:**
- `@/` → `src/`
- `@/components/` → `src/components/`
- `@/pages/` → `src/pages/`
- `@/services/` → `src/services/`
- `@/types/` → `src/types/`
- `@/utils/` → `src/utils/`
- `@/hooks/` → `src/hooks/`
- `@/constants/` → `src/constants/`
- `@/assets/` → `src/assets/`

## 🐛 Common Issues & Solutions

### Issue 1: Module not found
```bash
# Solution: Restart VS Code or TypeScript server
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Issue 2: Type errors in existing code
```tsx
// Temporary: Use type assertion
const data = response.data as User;

// Better: Fix the type properly
const response = await axios.get<ApiResponse<User>>('/users');
```

### Issue 3: Any type warnings
```tsx
// ❌ Avoid
const data: any = ...;

// ✅ Use proper types
const data: User | null = ...;
```

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Ant Design TypeScript](https://ant.design/docs/react/use-with-typescript)

## 🎉 Next Steps

1. Đọc kỹ file `.claude/agents/frontend.md`
2. Bắt đầu với Phase 6 - Migrate components
3. Test kỹ sau mỗi migration
4. Commit thường xuyên với clear messages
5. Review code với team

---

**Lưu ý:** Migration nên được thực hiện từng bước, test kỹ và commit thường xuyên. Không nên migrate toàn bộ cùng lúc.
