import type { Blend } from './blends'

type Primary = Blend['primary']
type ResultLocale = 'en' | 'zh-CN' | 'es' | 'id'

const oneSentenceByPrimary: Record<Primary, string> = {
  Red: 'You calm down by taking control, moving the situation forward, and making the next decision obvious.',
  Yellow: 'You come alive when there is energy in the room, people to connect with, and something worth getting excited about.',
  Blue: 'You notice the hidden flaw, the deeper meaning, and the standard everyone else is quietly stepping over.',
  Green: 'You keep the emotional temperature steady, often long before anyone else realizes the room needs calming.',
}

const misunderstoodByPrimary: Record<Primary, string> = {
  Red: 'People may call you controlling when you are often trying to stop drift, waste, or weak leadership from hurting everyone.',
  Yellow: 'People may call you unserious when you are often trying to keep hope, connection, and movement alive.',
  Blue: 'People may call you negative when you are often protecting what is true, careful, beautiful, or worth doing well.',
  Green: 'People may call you passive when you are often trying to protect trust, peace, and emotional safety.',
}

const challengeByPrimary: Record<Primary, string> = {
  Red: 'Ask one more question before giving the answer.',
  Yellow: 'Finish one small promise before chasing the next exciting thing.',
  Blue: 'Share the draft before it feels completely ready.',
  Green: 'State one real preference before anyone asks twice.',
}

const socialPromptByPrimary: Record<Primary, string[]> = {
  Red: [
    'Send this to the friend who always takes charge.',
    'Send this to someone who says "just decide" at least once a week.',
    'Send this to the person who gets calmer when there is a clear plan.',
  ],
  Yellow: [
    'Send this to the friend who can revive a dead room.',
    'Send this to someone who starts ten things because all ten sound fun.',
    'Send this to the person who turns errands into an event.',
  ],
  Blue: [
    'Send this to the friend who notices the detail everyone missed.',
    'Send this to someone who says "it depends" because it actually does.',
    'Send this to the person who feels things deeply but explains them carefully.',
  ],
  Green: [
    'Send this to the friend who says "I am fine" but absolutely has thoughts.',
    'Send this to someone who keeps everyone calm without getting credit for it.',
    'Send this to the person who avoids drama until silence becomes the drama.',
  ],
}

const idOneSentence: Record<Primary, string> = {
  Red: 'Anda merasa lebih tenang dengan mengambil kendali, menggerakkan keadaan, dan memperjelas keputusan berikutnya.',
  Yellow: 'Anda menjadi hidup ketika ada energi, orang untuk diajak terhubung, dan sesuatu yang layak dirayakan.',
  Blue: 'Anda melihat kekurangan tersembunyi, makna yang lebih dalam, dan standar yang sering dilewati orang lain.',
  Green: 'Anda menjaga suhu emosi tetap stabil, jauh sebelum orang lain menyadari bahwa suasana perlu ditenangkan.',
}

const idMisunderstood: Record<Primary, string> = {
  Red: 'Orang mungkin menyebut Anda mengendalikan, padahal Anda sering berusaha menghentikan keadaan yang mengambang, pemborosan, atau kepemimpinan lemah.',
  Yellow: 'Orang mungkin menganggap Anda tidak serius, padahal Anda berusaha menjaga harapan, hubungan, dan semangat tetap hidup.',
  Blue: 'Orang mungkin menyebut Anda negatif, padahal Anda sedang menjaga kebenaran, ketelitian, keindahan, atau kualitas.',
  Green: 'Orang mungkin menyebut Anda pasif, padahal Anda sering berusaha menjaga kepercayaan, kedamaian, dan keamanan emosi.',
}

const idChallenge: Record<Primary, string> = {
  Red: 'Ajukan satu pertanyaan lagi sebelum memberikan jawaban.',
  Yellow: 'Selesaikan satu janji kecil sebelum mengejar hal menarik berikutnya.',
  Blue: 'Bagikan draf sebelum terasa sepenuhnya siap.',
  Green: 'Nyatakan satu pilihan nyata sebelum orang harus bertanya dua kali.',
}

const idSocialPrompts: Record<Primary, string[]> = {
  Red: ['Kirim kepada teman yang selalu mengambil kendali.', 'Kirim kepada orang yang sering berkata, "putuskan saja".', 'Kirim kepada orang yang lebih tenang ketika rencananya jelas.'],
  Yellow: ['Kirim kepada teman yang dapat menghidupkan ruangan.', 'Kirim kepada orang yang memulai banyak hal karena semuanya terasa seru.', 'Kirim kepada orang yang mengubah urusan biasa menjadi acara.'],
  Blue: ['Kirim kepada teman yang melihat detail yang terlewat.', 'Kirim kepada orang yang berkata, "tergantung," karena memang begitu.', 'Kirim kepada orang yang merasa mendalam tetapi menjelaskannya dengan hati-hati.'],
  Green: ['Kirim kepada teman yang berkata, "saya baik-baik saja," tetapi jelas punya pikiran.', 'Kirim kepada orang yang menjaga semua orang tetap tenang tanpa mendapat pujian.', 'Kirim kepada orang yang menghindari drama sampai diamnya menjadi drama.'],
}

const ogHookByPrimary: Record<Primary, string> = {
  Red: 'It knew I take over when nobody decides',
  Yellow: 'It knew I chase the energy in the room',
  Blue: 'It knew I notice what everyone missed',
  Green: 'It knew I keep the peace until I disappear',
}

const ogLineByPrimary: Record<Primary, string> = {
  Red: 'Painfully accurate: control, impatience with vague plans, and the need for a next move.',
  Yellow: 'Painfully accurate: charm, restlessness, and the need for life to feel alive.',
  Blue: 'Painfully accurate: standards, overthinking, and the need for things to mean something.',
  Green: 'Painfully accurate: calm, avoidance, and the things I do not say out loud.',
}

export function getResultOneSentence(blend: Blend, locale: ResultLocale = 'en') {
  return locale === 'id' ? idOneSentence[blend.primary] : oneSentenceByPrimary[blend.primary]
}

export function getMisunderstoodLine(blend: Blend, locale: ResultLocale = 'en') {
  return locale === 'id' ? idMisunderstood[blend.primary] : misunderstoodByPrimary[blend.primary]
}

export function getWeeklyChallenge(blend: Blend, locale: ResultLocale = 'en') {
  return locale === 'id' ? idChallenge[blend.primary] : challengeByPrimary[blend.primary]
}

export function getSharePrompts(blend: Blend, locale: ResultLocale = 'en') {
  return locale === 'id' ? idSocialPrompts[blend.primary] : socialPromptByPrimary[blend.primary]
}

export function getOgHook(blend: Blend) {
  return ogHookByPrimary[blend.primary]
}

export function getOgLine(blend: Blend) {
  return ogLineByPrimary[blend.primary]
}

export function getProfileEmailPreview(blend: Blend) {
  return {
    oneSentence: getResultOneSentence(blend),
    misunderstood: getMisunderstoodLine(blend),
    challenge: getWeeklyChallenge(blend),
  }
}
