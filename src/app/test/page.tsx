export default function page() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">
        最近のお知らせ
      </h2>
      <table className="w-full table-auto">
        <tbody>
          <tr className="bg-white hover:bg-gray-100 transition">
            <td className="p-4 text-gray-500 text-sm">2024/11/09</td>
            <td className="p-4 text-gray-800 font-medium">お知らせ2</td>
            <td className="p-4 text-gray-600 text-sm">これはテストです</td>
          </tr>
          <tr className="bg-gray-50 hover:bg-gray-100 transition">
            <td className="p-4 text-gray-500 text-sm">2024/10/31</td>
            <td className="p-4 text-gray-800 font-medium">テストお知らせ</td>
            <td className="p-4 text-gray-600 text-sm">
              これはテストのお知らせです
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
