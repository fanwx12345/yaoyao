# 爻爻 check now

一个可开源的五行人格测试网站。用户从首页进入，完成 15 道场景题后，根据五行得分得到「主元素 + 副元素」人格结果，并可浏览全部 25 种类型。

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand
- Vitest + React Testing Library
- ESLint + Prettier
- Framer Motion / Lucide React

## 本地运行

```bash
npm install
npm run dev
```

## 质量命令

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## 数据结构

核心类型位于 `src/types/personality.ts`。

- `src/data/questions.ts`：通过 `?raw` 读取 `性格测试+职业规划题库.md` 并解析为题目数据。
- `src/data/results.ts`：通过 `?raw` 读取 `测试结果文案.md` 并解析为 25 种人格结果。
- `src/data/elements.ts`：维护五行 key、中文名、平票优先级和视觉主题。
- `src/data/imageMap.ts`：维护人格图片路径生成规则。
- `src/utils/scoring.ts`：计分、平票排序、结果解析。

## 计分规则

五行元素为 `fire / water / wood / metal / earth`，中文对应火、水、木、金、土。

测试完成后统计每个元素得分：最高分为主元素，第二高为副元素。平票时按 `火 > 水 > 木 > 金 > 土` 排序。如果只有一个元素有分，副元素回落为主元素，展示纯元素型，例如 `金 + 金`。

## 图片命名说明

图片放在根目录 `images` 中，文件名沿用资料中的组合命名：

```text
火 + 火.png
火 + 水.png
...
土 + 金.png
```

路径由 `src/data/imageMap.ts` 生成。新增图片时请保持 `中文主元素 + 空格 + + + 空格 + 中文副元素.png` 的格式。

## 如何新增题目

在 `性格测试+职业规划题库.md` 中追加题目，格式保持：

```text
---Q16：题干

· 🔥 A. 选项文案（火）
· 💧 B. 选项文案（水）
· 🌳 C. 选项文案（木）
· 💰 D. 选项文案（金）
· ⛰️ E. 选项文案（土）
```

选项顺序可以打乱，但每个选项末尾必须保留 `（火）` 这类元素标记。

## 如何新增或修改人格结果

修改 `测试结果文案.md` 中对应矩阵行即可。解析器会读取组合、精神状态、兽设、职业、缺什么、荒诞解读、最佳合拍、关系解读、金句、运势风格和长文案。

当前源资料里 `火 + 木` 的长文案列重复成了 `火 + 火 / FLAME-X`。项目保留 `火 + 木` 的表格字段，并在解析层为它补了独立 `SPARK（速燃型）` 展示信息，避免详情页与 `火 + 火` 冲突。

## 项目结构

```text
src/
  components/  通用 UI 与结果展示组件
  data/        Markdown 解析、五行配置、图片映射
  pages/       首页、测试页、结果页、类型页
  store/       测试答题状态
  types/       业务类型
  utils/       计分算法
```

## 开源说明

代码以 MIT License 发布。文案和图片资源请确认你拥有相应授权后再公开分发。
