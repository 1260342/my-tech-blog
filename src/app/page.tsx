import Link from 'next/link';
import { getList } from '@/libs/microcms';

export default async function Home() {
  const { contents } = await getList();

  if (!contents || contents.length === 0) {
    return <h1>記事がありません</h1>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contents.map((post) => (
        <Link
          href={`/blog/${post.id}`}
          key={post.id}
          className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          {/* アイキャッチ画像エリア */}
          <div className="aspect-video bg-gray-100 relative">
            {post.eyecatch ? (
              <img
                src={post.eyecatch.url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              // 画像がない場合のダミー（グレーの箱）
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                No Image
              </div>
            )}
          </div>

          {/* タイトルと日付エリア */}
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-2">
              {new Date(post.publishedAt!).toLocaleDateString()}
            </div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
