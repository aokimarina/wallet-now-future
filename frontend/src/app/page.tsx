import FuturePage from "./future/page";
import CurrentPage from "./current/page";

export default function Home() {
  return (
    <section className="h-screen flex flex-row items-center justify-center gap-30 p-12 bg-[url('/ミモザ.png')] bg-no-repeat bg-cover">
      {/* タイトル部分 */}
      <div className="text-left text-gray-600 space-y-2">
        <h1 className="text-6xl font-bold ">いま</h1>
        <h1 className="text-4xl font-bold">と</h1>
        <h1 className="text-6xl font-bold">みらい</h1>
        <h1 className="text-4xl font-bold">の</h1>
        <h1 className="text-6xl font-bold">おさいふ</h1>
      </div>

      {/* ボタン部分 */}
      <div className="flex flex-col items-center space-y-20">
        <a
          href="/current"
          className="w-70 px-10 py-6 text-2xl bg-blue-300 text-white font-semibold rounded-lg shadow-md text-center hover:bg-blue-200 transition"
        >
          今を見に行く
        </a>
        <a
          href="/future"
          className="w-70 px-10 py-6 text-2xl bg-yellow-300 text-white font-semibold rounded-lg shadow-md text-center hover:bg-yellow-200 transition"
        >
          未来を見に行く
        </a>
      </div>
    </section>
  );
}
