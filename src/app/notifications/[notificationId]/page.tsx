import { getNotificationDetail, getNotifications } from "@/libs/client";

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

  return (
    <>
      <p>{notification.title}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${notification.content}`,
        }}
      />
    </>
  );
}
