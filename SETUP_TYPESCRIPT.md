# 🚀 Setup TypeScript - Hướng dẫn cài đặt

## Bước 1: Cài đặt TypeScript Dependencies

Chạy lệnh sau để cài đặt TypeScript và các type definitions cần thiết:

```bash
npm install -D typescript @types/react @types/react-dom @types/node
```

### Giải thích các packages:
- `typescript` - TypeScript compiler
- `@types/react` - Type definitions cho React
- `@types/react-dom` - Type definitions cho React DOM
- `@types/node` - Type definitions cho Node.js

## Bước 2: Cài đặt thêm types cho các thư viện đang dùng

```bash
npm install -D @types/nprogress
```

## Bước 3: Kiểm tra cài đặt

Sau khi cài đặt xong, kiểm tra version:

```bash
npx tsc --version
```

Bạn sẽ thấy output như: `Version 5.x.x`

## Bước 4: Restart VS Code

Để VS Code nhận diện TypeScript configuration:

1. Đóng VS Code
2. Mở lại project
3. Hoặc: `Ctrl+Shift+P` → "Developer: Reload Window"

## Bước 5: Kiểm tra TypeScript hoạt động

Tạo file test đơn giản:

```typescript
// src/test.ts
const greeting: string = "Hello TypeScript!";
console.log(greeting);
```

Nếu không có lỗi đỏ trong VS Code, TypeScript đã hoạt động! ✅

## Bước 6: Bắt đầu Migration

Bây giờ bạn có thể bắt đầu migrate code theo hướng dẫn trong `MIGRATION_GUIDE.md`

### Thứ tự ưu tiên:

1. ✅ **Services** (Quan trọng nhất)
   ```bash
   src/services/axios.custom.js → axios.custom.ts
   src/services/api.service.js → api.service.ts
   ```

2. ✅ **Context**
   ```bash
   src/components/context/auth.context.jsx → auth.context.tsx
   ```

3. ✅ **Pages**
   ```bash
   src/pages/login.jsx → login.tsx
   src/pages/register.jsx → register.tsx
   # ... các pages khác
   ```

4. ✅ **Components**
   ```bash
   src/components/layout/header.jsx → header.tsx
   src/components/layout/footer.jsx → footer.tsx
   # ... các components khác
   ```

5. ✅ **Core Files**
   ```bash
   src/App.jsx → App.tsx
   src/main.jsx → main.tsx
   ```

## 🎯 Quick Commands

### Chạy dev server
```bash
npm run dev
```

### Build project
```bash
npm run build
```

### Type check (không build)
```bash
npx tsc --noEmit
```

## 📚 Tài liệu đã tạo

1. **`.claude/agents/frontend.md`** - Frontend development guidelines
2. **`MIGRATION_GUIDE.md`** - Chi tiết migration process
3. **`INTEGRATION_SUMMARY.md`** - Tóm tắt những gì đã tích hợp
4. **`SETUP_TYPESCRIPT.md`** - File này

## ✨ Những gì đã sẵn sàng

### Cấu hình
- ✅ `tsconfig.json` - TypeScript config
- ✅ `tsconfig.node.json` - Node config
- ✅ `vite.config.js` - Vite config với path aliases

### Type Definitions
- ✅ `src/types/common.type.ts`
- ✅ `src/types/user.type.ts`
- ✅ `src/types/api.type.ts`

### Utilities
- ✅ `src/utils/format.util.ts`
- ✅ `src/utils/validation.util.ts`

### Constants
- ✅ `src/constants/API_ENDPOINTS.ts`
- ✅ `src/constants/APP_CONFIG.ts`

### Hooks
- ✅ `src/hooks/useAuth.ts`

### Components
- ✅ `src/components/common/Button.tsx` (Template)

### Services
- ✅ `src/services/user.service.ts` (Template)

## 🔥 Bắt đầu ngay

```bash
# 1. Cài đặt dependencies
npm install -D typescript @types/react @types/react-dom @types/node @types/nprogress

# 2. Restart VS Code
# Ctrl+Shift+P → "Developer: Reload Window"

# 3. Đọc hướng dẫn
# - MIGRATION_GUIDE.md
# - .claude/agents/frontend.md

# 4. Bắt đầu migrate từ services
# Rename: src/services/axios.custom.js → axios.custom.ts
```

## 💡 Tips

1. **Migrate từng file một** - Đừng migrate toàn bộ cùng lúc
2. **Test sau mỗi migration** - Đảm bảo app vẫn chạy
3. **Commit thường xuyên** - Dễ rollback nếu có vấn đề
4. **Sử dụng path aliases** - `@/` thay vì `../../`
5. **Đọc error messages** - TypeScript errors rất chi tiết

## 🐛 Troubleshooting

### Lỗi: Cannot find module '@/...'
```bash
# Solution: Restart TypeScript server
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Lỗi: JSX element implicitly has type 'any'
```typescript
// Solution: Add proper types
import { FC } from 'react';
const MyComponent: FC<Props> = (props) => { ... }
```

### Lỗi: Module not found
```bash
# Solution: Check import path
# Đảm bảo file extension đúng (.ts, .tsx)
```

## 📞 Cần trợ giúp?

- Đọc `MIGRATION_GUIDE.md` cho chi tiết
- Xem `.claude/agents/frontend.md` cho best practices
- Check `INTEGRATION_SUMMARY.md` cho tổng quan

---

**Chúc bạn setup thành công! 🎉**

Bắt đầu với lệnh: `npm install -D typescript @types/react @types/react-dom @types/node`
