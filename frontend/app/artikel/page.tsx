// pages/artikel/index.tsx
import Link from 'next/link';
import NavbarUtama from "../../components/navigation/navbar_utama";
import Footer from "../../components/footer";

const articles = [
  {
    id: '1',
    title: 'Cara Merawat Cabai Saat Musim Hujan',
    date: 'Monday 31 August 2021',
    image: '/cabai.jpg',
    excerpt:
      'Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum...',
  },
  {
    id: '2',
    title: 'Pemuda ini Sukses Tanam Sawi di Rumah',
    date: 'Monday 31 August 2021',
    image: '/sawi.jpg',
    excerpt:
      'Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum...',
  },
  {
    id: '3',
    title: 'Tips Merawat Tanaman Bawang di Rumah',
    date: 'Monday 31 August 2021',
    image: '/bawang.jpg',
    excerpt:
      'Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum...',
  },
  // Tambahkan lebih banyak artikel di sini...
];

export default function ArtikelPage() {
  return (
    <div className="min-h-screen bg-white">
        <NavbarUtama />
      
      <div className="w-full bg-gradient-to-b from-[#6B8F5A] to-[#3B5D2A] py-20 mt-[64px] flex flex-col items-center">
        <h1 className="text-white text-5xl font-bold text-center">
        Artikel
        </h1>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 mb-20 max-w-7xl mx-auto">
        {articles.map((article) => (
          <Link key={article.id} href={`/artikel/${article.id}`}>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <p className="text-sm italic text-gray-500">{article.date}</p>
              <h2 className="text-xl font-semibold text-[#314E34] mt-2 mb-4">{article.title}</h2>
              <img
                src={article.image}
                alt={article.title}
                className="rounded-md w-full h-48 object-cover mb-4"
              />
              <p className="text-sm text-gray-700 mb-4">{article.excerpt}</p>
              <button className="px-6 py-2 border border-[#5C7D5B] text-[#5C7D5B] rounded-full hover:bg-[#5C7D5B] hover:text-white transition-colors">
                Baca Selengkapnya
              </button>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
