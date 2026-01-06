import type { MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

// ブログ記事の型定義
export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;
