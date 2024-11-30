import { getNotificationDetail, getNotifications } from "@/libs/client";
import "./style.css";
import SyntaxHilighter from "@/app/components/SyntaxHilighter/SyntaxHilighter";

export async function generateStaticParams() {
  const { contents } = await getNotifications(100);
  return contents.map((notification) => ({
    notificationId: notification.id,
  }));
}

export default async function StaticDetailPage(props: {
  params: Promise<{ notificationId: string }>;
}) {
  const params = await props.params;
  const notificationId = params.notificationId;
  const notification = await getNotificationDetail(notificationId);
  const createDate = notification.createdAt.slice(0, 10);
  const updateDate = notification.updatedAt.slice(0, 10);

  return (
    <div className="m-16 border-2 border-solid border-slate-400 rounded-lg p-5 w-[90%] max-w-[1100px] mx-auto">
      <div className="mb-10">
        <h1 className="mb-5">{notification.title}</h1>
        <p>{`created Date:${createDate}`}</p>
        <p>{`updatedDate:${updateDate}`}</p>
      </div>
      <SyntaxHilighter content={notification.content} />
    </div>
  );
}
