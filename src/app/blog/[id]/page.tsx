import { getDetail, getList } from "@/libs/microcms";

// Next.js 15の型定義: paramsはPromiseとして扱われます
type Props = {
  params: Promise<{ id: string }>;
};

// 1. 静的生成（SSG）のためのパス生成関数
export async function generateStaticParams() {
  const { contents } = await getList();

  return contents.map((post) => ({
    id: post.id,
  }));
}

// 2. 記事詳細ページの本体
export default async function BlogPost({ params }: Props) {
  // URLのパラメータからIDを取り出す（awaitが必要です）
  const { id } = await params;

  // microCMSから記事データを取得
  const post = await getDetail(id);

  return (
    <main className="min-h-screen p-24">
      {/* 記事タイトル */}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      {/* 公開日 */}
      <div className="text-gray-400 mb-8">
        {new Date(post.publishedAt!).toLocaleDateString()}
      </div>

      {/* アイキャッチ画像があれば表示 */}
      {post.eyecatch && (
        <img
          src={post.eyecatch.url}
          alt={post.title}
          className="mb-10 w-full max-w-2xl rounded-lg"
        />
      )}

      {/* 記事本文（HTMLとして表示） */}
      {/* prose-invert を削除し、lgサイズなどを指定 */}
        <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
        />
    </main>
  );
}
