import { getNotificationDetail, getNotifications } from "@/libs/client";
import "@/app/style/tagElement.css";
import SyntaxHilighter from "@/app/components/SyntaxHilighter/SyntaxHilighter";
// import tag from "@/public/icon/tag.svg";
import home from "@/public/icon/home.svg";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
  const { contents } = await getNotifications(100);
  return contents.map((notification) => ({
    notificationId: notification.id,
  }));
}

export const generateMetadata = async (props: {
  params: Promise<{ notificationId: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const notificationId = params.notificationId;
  const notification = await getNotificationDetail(notificationId);

  return {
    title: notification.title,
    description: notification.description,
  };
};

export default async function StaticDetailPage(props: {
  params: Promise<{ notificationId: string }>;
}) {
  const params = await props.params;
  const notificationId = params.notificationId;
  const notification = await getNotificationDetail(notificationId);
  const createDate = notification.createdAt.slice(0, 10);
  const updateDate = notification.updatedAt.slice(0, 10);

  return (
    <div>
      <div className="flex items-center bg-[#f4f3f3] h-10">
        <Link href="/" className="flex flex-row items-center mx-3">
          <Image src={home} alt="home icon" width={20} height={20} />
          Home
        </Link>
        &gt;
        <Link href="/articles" className="flex mx-3">
          お知らせ一覧
        </Link>
        &gt;
        <Link href={`/articles/${notification.id}`} className="flex mx-3">
          {notification.title}
        </Link>
      </div>
      <div className="m-16 border-2 border-solid border-slate-400 rounded-lg p-5 w-[90%] max-w-[1100px] mx-auto shadow-xl">
        <div className="mb-10">
          <h1 className="mb-5">{notification.title}</h1>

          {/* お知らせ機能にタグを実装したい時用 */}

          {/* <div className="flex items-start">
            <div className="flex-shrink-0 mt-[3px] ml-1">
              <Image src={tag} alt="tag icon" width={20} height={20} />
            </div>
            <div className="flex flex-wrap gap-2 ml-2">
              {notification.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div> */}

          <p>{`created Date:${createDate}`}</p>
          <p>{`updatedDate:${updateDate}`}</p>
        </div>
        <SyntaxHilighter content={notification.content} />
      </div>
    </div>
  );
}
