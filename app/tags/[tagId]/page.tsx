import { Tag, getList, getTag, getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    tagId: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const { tagId } = params;
  const data = await getList({
    limit: LIMIT,
    filters: `tags[contains]${tagId}`,
  });
  const tag = await getTag(tagId);
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/tags/${tagId}`} />
    </>
  );
}

// export async function generateStaticParams() {
//   const tagList = await getTagList();
//   const params = tagList.contents.map((tag: Tag) => ({
//     tagId: tag.id,
//   }));
//   return params;
// }

// export default async function Page({ params }: Props) {
//   const tagId = params.tagId;
//   const data = await getList({
//     limit: LIMIT,
//     filters: `tags[contains]${tagId}`,
//   });
//   return (
//     <>
//       <ArticleList articles={data.contents} />
//       <Pagination totalCount={data.totalCount} basePath={`/tags/${tagId}`} />
//     </>
//   );
// }
