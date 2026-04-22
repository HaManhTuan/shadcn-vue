# Design system — Manager đặt lịch giúp việc

Tài liệu này căn chỉnh với **shadcn-vue-admin** hiện tại: token CSS trong `src/assets/index.css`, preset theme trong `src/assets/themes.css`, lớp `theme-*` trên `<html>` (xem `src/composables/use-system-theme.ts`, `src/constants/themes.ts`), và component UI trong `src/components/ui/`.

## 1. Định hướng cảm xúc & tông màu

Ứng dụng quản lý đặt lịch giúp việc cần cảm giác **sạch — đáng tin — dễ đọc lịch**, tránh primary quá “gấp” hoặc gợi cảnh báo (đỏ cam) làm màu chủ đạo.

| Hướng | Cảm giác | Gợi ý trong repo |
|--------|-----------|-------------------|
| **Ưu tiên** | Tươi, an tâm, “nhà sạch” | **`theme-green`** (mặc định store demo): primary xanh lá dịu, sidebar đồng bộ |
| **Thay thế** | Teal / B2B | **`theme-teal`** (hue OKLCH ~195°, cùng cấu trúc green) hoặc **`theme-blue`** |
| **Hạn chế** | Tránh nhầm với lỗi / huỷ | Không dùng `theme-red` làm mặc định sản phẩm; giữ đỏ cho **destructive** và trạng thái huỷ |

**Nền & chữ:** Giữ chuẩn shadcn: `--background`, `--foreground`, `--muted`, `--muted-foreground` — đã map sang Tailwind qua `@theme inline` (`bg-background`, `text-muted-foreground`, …).

## 2. Cách theme hoạt động trong codebase

- **Mặc định store (demo Manager):** `theme` khởi tạo `'green'`. Ngay sau `setupPinia`, `main.ts` gọi `applyDemoForcedTheme(pinia)` — **ghi đè** theme đã hydrate từ `sessionStorage` thành `green`, trừ khi `VITE_FORCE_THEME_GREEN=false` (xem `.env.example`).
- **Preset trung tính (`zinc`):** Không có block `.theme-zinc`; giá trị lấy từ `:root` và `.dark` trong `index.css`.
- **Đổi preset màu:** `setTheme('green' | 'teal' | …)` → class `theme-*` trên `document.documentElement`, override trong `themes.css`.
- **Bo góc:** `radius` trong store ghi đè `--radius` (rem), ảnh hưởng `--radius-sm` … `--radius-xl`.

Khi xây module Manager, ưu tiên class semantic: `bg-card`, `border-border`, `text-foreground`, `bg-primary`, `text-primary-foreground` thay vì mã màu cứng.

## 3. Token nghiệp vụ đặt lịch (`schedule-*`)

Để badge / chip trạng thái lịch **nhất quán** và tách khỏi `primary` (nút “Tạo lịch”, “Lưu”), repo định nghĩa thêm các biến trong `index.css` và map sang Tailwind:

| Token | Ý nghĩa UI | Gợi ý dùng |
|--------|------------|------------|
| `schedule-pending` | Chờ xác nhận | Badge, dot timeline |
| `schedule-confirmed` | Đã chốt | Ô lịch, hàng bảng |
| `schedule-in-progress` | Đang thực hiện | Banner trạng thái ca |
| `schedule-completed` | Hoàn tất | Lịch sử, read-only |
| *(Huỷ / lỗi)* | — | Dùng `destructive` có sẵn |

Ví dụ class: `bg-schedule-pending text-schedule-pending-foreground`, `border-schedule-confirmed`, …

## 4. Design UI — pattern khuyến nghị

### 4.1 Bảng & danh sách

- Khung: `Card` + `Table` (shadcn-vue), header bảng `text-muted-foreground`, hàng hover `hover:bg-muted/50`.
- Cột thời gian: monospace hoặc `tabular-nums` (nếu dùng utility tương đương) để cột giờ thẳng cột.
- Hành động: `Button` `variant="outline"` / `ghost` cho thứ cấp; `default` chỉ cho hành động chính trên hàng.

### 4.2 Lịch (Calendar / range)

- Ngày “có ca”: thêm `bg-primary/15` hoặc chấm nhỏ `bg-schedule-confirmed` — tránh lấp cả ô bằng primary đậm (khó đọc số ngày).
- Ngày chọn: dùng ring/focus có sẵn (`ring-ring`).

### 4.3 Form đặt / chỉnh lịch

- Luôn `Label` + message lỗi từ zod/vee-validate; lỗi field: `text-destructive`, border `border-destructive` theo pattern form hiện có.
- Nhóm thông tin: `space-y-4` hoặc `gap-4` trong `grid` — khớp spacing các page admin khác.

### 4.4 Thông báo

- Toast: `vue-sonner` đã import; thành công không cần màu lạ, lỗi/huỷ dùng tone destructive.

## 5. Typography & mật độ

- Tiêu đề trang: theo hierarchy hiện tại của layout (tránh tự thêm font mới).
- Dashboard đặt lịch thường **mật độ cao**: ưu tiên `text-sm` cho cell bảng, `leading-snug`, padding ô lịch vừa đủ.

## 6. Dark mode

- Class `.dark` trên cùng phần tử chứa variant dark (theo setup app). Token `schedule-*` có nhánh `.dark` trong `index.css` để badge vẫn đọc được.

## 7. Checklist triển khai module mới

1. Preset: mặc định đã là **`green`**; có thể chọn **`teal`** trong theme picker nếu muốn tông xanh ngọc.
2. Trang mới đặt dưới `src/pages/…`, dùng layout có sẵn (`src/layouts/`).
3. Trạng thái lịch: ưu tiên class `schedule-*` + `destructive` cho huỷ.
4. Không fork component `ui/` trừ khi cần; bọc logic trong page/feature components.

## 8. Tham chiếu file

| File | Vai trò |
|------|---------|
| `src/assets/index.css` | Token gốc, `@theme inline`, token `schedule-*` |
| `src/assets/themes.css` | Preset `theme-green`, `theme-teal`, `theme-blue`, … |
| `src/constants/themes.ts` | Danh sách `Theme` cho store & UI chọn màu |
| `src/components/ui/*` | Button, Card, Badge, Calendar, Table, Form… |

---

*Tài liệu này mô tả hướng thiết kế cho sản phẩm “Manager đặt lịch giúp việc” trên nền codebase shadcn-vue-admin; chỉnh sửa token nên ghi chú trong PR để QA/design theo dõi.*
