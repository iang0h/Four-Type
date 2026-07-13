import type { Blend } from './blends'
import { getComparisonInsight, type PairInsight } from './comparison'
import type { QuizLocale } from './quiz-i18n'

type Primary = Blend['primary']

const protectedValue: Record<Primary, string> = {
  Red: 'kemajuan, kendali, dan keputusan yang jelas',
  Yellow: 'hubungan, energi, dan semangat bersama',
  Blue: 'makna, ketepatan, dan kualitas',
  Green: 'kedamaian, kepercayaan, dan kestabilan emosi',
}

const advice: Record<Primary, string> = {
  Red: 'Bertanyalah sebelum mengambil alih.',
  Yellow: 'Tetap hadir setelah awal yang menyenangkan berlalu.',
  Blue: 'Sampaikan kekhawatiran tanpa mengubahnya menjadi vonis.',
  Green: 'Nyatakan pilihan Anda sebelum berubah menjadi kekesalan diam-diam.',
}

const pairCopy: Record<string, Pick<PairInsight, 'sharedQuality' | 'complement' | 'friction' | 'challenge'>> = {
  'Blue:Blue': {
    sharedQuality: 'Kalian sama-sama menjaga makna, ketepatan, dan hasil yang memenuhi standar penuh pertimbangan.',
    complement: 'Kedalaman bersama dapat menghasilkan perhatian luar biasa ketika salah satu membantu yang lain berhenti menyempurnakan dan mulai bertindak.',
    friction: 'Kalian dapat sama-sama menunggu kepastian atau membandingkan standar tanpa menyebutkan apa yang sudah cukup baik.',
    challenge: 'Pilih satu keputusan minggu ini dan sepakati bahwa jelas serta lengkap lebih baik daripada sempurna.',
  },
  'Blue:Green': {
    sharedQuality: 'Kalian sama-sama menghargai kepercayaan, perhatian yang teliti, dan hubungan yang terasa aman secara emosional.',
    complement: 'Kedalaman memberi kepekaan menilai, sedangkan ketenangan memberi ruang agar pemikiran itu benar-benar didengar.',
    friction: 'Analisis yang hati-hati dan keengganan menghadapi konflik dapat berubah menjadi diam panjang saat percakapan langsung dibutuhkan.',
    challenge: 'Sebutkan masing-masing satu kekhawatiran dan satu pilihan sebelum membahas cara menjaga kedamaian.',
  },
  'Blue:Red': {
    sharedQuality: 'Kalian sama-sama peduli pada standar dan bersedia bertanggung jawab ketika sesuatu benar-benar penting.',
    complement: 'Standar dan tindakan dapat saling menguatkan: satu melihat apa yang harus benar, satu memastikan keputusan bergerak maju.',
    friction: 'Kecepatan dapat terasa ceroboh bagi satu pihak, sedangkan permintaan konteks dapat terasa seperti perlawanan bagi pihak lain.',
    challenge: 'Biarkan satu orang menentukan standar kualitas dan yang lain menentukan tindakan konkret berikutnya.',
  },
  'Blue:Yellow': {
    sharedQuality: 'Kalian sama-sama menangkap makna emosi: satu memberinya kedalaman, satu memberinya ekspresi.',
    complement: 'Ekspresi membawa wawasan tersembunyi ke dalam percakapan, sementara kedalaman menjaga antusiasme tetap bermakna.',
    friction: 'Spontanitas dapat terasa dangkal bagi satu pihak, sedangkan pemrosesan yang hati-hati dapat terasa seperti jarak emosional bagi pihak lain.',
    challenge: 'Bertukar peran sekali: mulai dengan perasaan, lalu tambahkan detail yang membuatnya berguna.',
  },
  'Green:Green': {
    sharedQuality: 'Kalian sama-sama menjaga kedamaian, kepercayaan, dan ritme stabil yang membuat orang merasa aman.',
    complement: 'Kesabaran dan kesetiaan kalian menjadi kuat ketika salah satu berani menyatakan pilihan jujur terlebih dahulu.',
    friction: 'Keharmonisan berubah menjadi penghindaran ketika keduanya berharap orang lain menyebutkan masalah atau memilih arah.',
    challenge: 'Masing-masing menyatakan satu pilihan nyata sebelum menyepakati rencana bersama.',
  },
  'Green:Red': {
    sharedQuality: 'Kalian dapat menciptakan arah yang dapat dipercaya dengan memadukan keputusan tegas dan ketenangan emosi.',
    complement: 'Arah yang jelas mencegah keadaan mengambang, sementara ketenangan mencegah urgensi menimbulkan kerusakan yang tidak perlu.',
    friction: 'Tekanan langsung dapat memicu penarikan diri, dan penarikan diri dapat membuat tekanan menjadi semakin keras.',
    challenge: 'Gunakan dua langkah: tanyakan apa yang dibutuhkan, lalu putuskan tindakan berikutnya bersama.',
  },
  'Green:Yellow': {
    sharedQuality: 'Kalian sama-sama membuat orang merasa diterima, satu melalui ketenangan dan satu melalui kehangatan yang terlihat.',
    complement: 'Kehangatan membuka percakapan dan ketenangan menjaga hubungan tetap aman setelah semangat awal berlalu.',
    friction: 'Keceriaan dapat menutupi masalah nyata sementara sikap mengalah membuat keputusan sulit terus tertunda.',
    challenge: 'Selesaikan satu janji kecil bersama sebelum memulai gagasan menyenangkan berikutnya.',
  },
  'Red:Red': {
    sharedQuality: 'Kalian sama-sama menjaga kemajuan, arah, dan kebutuhan akan keputusan yang jelas ketika orang lain ragu.',
    complement: 'Dorongan bersama menghasilkan kemajuan cepat ketika kepemimpinan dibagi secara jelas dan tidak diperebutkan diam-diam.',
    friction: 'Dua naluri kuat untuk mengendalikan dapat mengubah perbedaan praktis menjadi perebutan keputusan terakhir.',
    challenge: 'Bagi tanggung jawab sebelum keputusan berikutnya agar tidak ada yang harus memenangkan kendali saat itu.',
  },
  'Red:Yellow': {
    sharedQuality: 'Kalian sama-sama membawa energi keluar dan keberanian untuk menggerakkan orang menuju sesuatu yang baru.',
    complement: 'Dorongan memberi arah dan antusiasme memberi semangat sosial, sehingga ide lebih mudah dimulai dan dibagikan.',
    friction: 'Kecepatan dan kegembiraan dapat menciptakan janji lebih cepat daripada kemampuan memeriksa kapasitas serta penyelesaian.',
    challenge: 'Sebelum berkata ya, sepakati siapa yang bertanggung jawab atas sepuluh persen terakhir pekerjaan.',
  },
  'Yellow:Yellow': {
    sharedQuality: 'Kalian sama-sama menjaga hubungan, optimisme, dan energi yang membuat pengalaman tetap hidup.',
    complement: 'Antusiasme bersama menciptakan kedekatan cepat, sementara dukungan timbal balik membantu menyelesaikan apa yang dimulai.',
    friction: 'Kalian dapat mengejar sumber energi berikutnya dan meninggalkan tanggung jawab rutin tanpa pemilik yang jelas.',
    challenge: 'Pilih satu ide bersama dan rayakan hanya setelah kalian berdua menyelesaikannya.',
  },
}

function pairKey(a: Primary, b: Primary) {
  return [a, b].sort().join(':')
}

export function getLocalizedComparisonInsight(locale: QuizLocale, self: Blend, friend: Blend): PairInsight {
  if (locale !== 'id') return getComparisonInsight(self, friend)

  const pair = pairCopy[pairKey(self.primary, friend.primary)]
  const samePrimary = self.primary === friend.primary
  const selfAdvice = advice[self.primary]
  const friendAdvice = advice[friend.primary]

  return {
    headline: samePrimary
      ? `Kalian cepat mengenali dorongan untuk menjaga ${protectedValue[self.primary]}.`
      : 'Naluri kalian yang berbeda dapat menjadi kerja sama yang kuat ketika keduanya dinyatakan dengan jelas.',
    ...pair,
    selfAdvice,
    friendAdvice,
    chemistry: pair.complement,
    repair: `Langkah Anda: ${selfAdvice} Langkah teman: ${friendAdvice}`,
  }
}
