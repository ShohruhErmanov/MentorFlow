import { Award, Star } from 'lucide-react';

export default function Achievements() {
  return (
    <div className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm h-64 flex flex-col items-center justify-center text-center">
      <div className="flex gap-4 mb-4">
        <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shadow-sm">
          <Star size={32} />
        </div>
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
          <Award size={32} />
        </div>
      </div>
      <h3 className="text-lg font-bold text-[#191b23]">Yutuqlar va Sertifikatlar</h3>
      <p className="mt-2 text-sm text-[#737686]">O'quvchining barcha qo'lga kiritgan sertifikatlari va nishonlari (badges) shu yerda joylashadi.</p>
    </div>
  );
}
