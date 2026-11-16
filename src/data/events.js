/**
 * Shared event catalogue for the /event page, the event detail pages
 * (/event/:slug) and the archive section on /event.
 * Localized fields use { id, en, zh } objects — pick with `localized()`.
 *
 * NOTE: `guestStars` and `support` are placeholder entries — swap them for
 * the real names, roles and photos per event.
 */

export const categoryLabels = {
  public: { id: 'Acara Publik', en: 'Public Event', zh: '公共活动' },
  mice: { id: 'Acara MICE', en: 'MICE Event', zh: 'MICE 活动' },
  brand: { id: 'Aktivasi Merek', en: 'Brand Activation', zh: '品牌推广' },
  tenant: { id: 'Acara Tenant', en: 'Tenant Event', zh: '商户活动' },
  sport: { id: 'Acara Olahraga', en: 'Sport Event', zh: '体育活动' },
  corporate: { id: 'Acara Korporat', en: 'Corporate Event', zh: '企业活动' },
  hybrid: { id: 'Acara Hibrida', en: 'Hybrid Event', zh: '混合式活动' },
}

const MONTHS = {
  id: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export function formatEventDate(date, language) {
  if (language === 'zh') {
    const from = date.from ? `${date.from}日` : ''
    const to = date.to ? `${date.to}日` : ''
    const range = date.from && date.to ? `${from}-${to}` : date.from ? from : to
    return `${date.year}年${date.month}月${range}`
  }
  const monthName = (MONTHS[language] ?? MONTHS.id)[date.month - 1]
  if (date.from && date.to) return `${date.from}-${date.to} ${monthName} ${date.year}`
  if (date.from) return `${date.from} ${monthName} ${date.year}`
  return `${monthName} ${date.year}`
}

export function sortEventsByDateDesc(list) {
  return [...list].sort((a, b) => (b.date.year - a.date.year) || (b.date.month - a.date.month) || ((b.date.from ?? 0) - (a.date.from ?? 0)))
}

/**
 * Deterministically pick `count` related events for the detail page:
 * the current event is always excluded, and each detail page gets a
 * different combination (consecutive window shifted by one position).
 */
export function getRelatedEvents(slug, count = 3) {
  const sorted = sortEventsByDateDesc(events)
  const index = sorted.findIndex((event) => event.slug === slug)
  if (index === -1) return sorted.slice(0, count)
  const picked = []
  for (let step = 1; picked.length < Math.min(count, sorted.length - 1); step += 1) {
    const candidate = sorted[(index + step + 1) % sorted.length]
    if (candidate.slug !== slug && !picked.includes(candidate)) picked.push(candidate)
  }
  return picked
}

export const events = [
  {
    slug: 'bandung-festival-2026',
    title: { id: 'Bandung Festival 2026', en: 'Bandung Festival 2026', zh: '万隆节 2026' },
    category: 'public',
    gathering: false,
    date: { from: 19, to: 24, month: 8, year: 2026 },
    place: 'Summarecon Mall Bandung',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Festival publik enam hari di Summarecon Mal Bandung dengan panggung hiburan, bazar, dan agenda komunitas.',
      en: 'A six-day public festival at Summarecon Mall Bandung featuring live entertainment, bazaars, and community programming.',
      zh: '在 Summarecon 万隆购物中心举办的六天公众节庆，包含现场演出、市集与社群活动。',
    },
    overview: {
      id: 'Bandung Festival 2026 adalah festival publik enam hari yang kami produksi di Summarecon Mal Bandung — dari panggung utama hingga area tenant, dari pembukaan hingga penutupan. Tim kami mengelola keseluruhan produksi: perencanaan, perizinan, vendor, artis, dan operasional harian di lapangan.',
      en: 'Bandung Festival 2026 is a six-day public festival we produced at Summarecon Mall Bandung — from the main stage to the tenant area, from opening to closing. Our team manages the entire production: planning, permits, vendors, artists, and day-to-day on-site operations.',
      zh: '“万隆节 2026”是我们在 Summarecon 万隆购物中心制作的六天公众节庆——从主舞台到商户区，从开幕到闭幕。我们的团队负责全部制作：企划、审批、供应商、艺人与每日现场运营。',
    },
    scope: {
      id: ['Produksi panggung utama & side stage selama 6 hari', 'Manajemen tenant, booth, dan bazar', 'Booking artis & kurasi program harian', 'Operasional lapangan: kru, keamanan, dan perizinan'],
      en: ['Main & side stage production across 6 days', 'Tenant, booth & bazaar management', 'Artist booking & daily program curation', 'On-site operations: crew, security & permits'],
      zh: ['六天主舞台与副舞台制作', '商户、展位与市集管理', '艺人预订与每日节目策划', '现场运营：团队、安保与审批'],
    },
    guestStars: [
      { name: 'Rangga Wibowo', role: { id: 'Band · Pop Alternatif', en: 'Band · Alt Pop', zh: '乐队 · 另类流行' }, photo: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?auto=format&fit=crop&w=400&q=80' },
      { name: 'Nadira Putri', role: { id: 'Penyanyi Solo', en: 'Solo Singer', zh: '独唱歌手' }, photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
      { name: 'Kolektif Kanvas Bandung', role: { id: 'Kolektif Seni', en: 'Arts Collective', zh: '艺术团体' }, photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Kopi Kala', category: { id: 'Kedai Kopi · UMKM', en: 'Coffee Shop · SME', zh: '咖啡店 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80' },
      { name: 'Batik Laras', category: { id: 'Fashion · UMKM', en: 'Fashion · SME', zh: '服饰 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80' },
      { name: 'Bank Arunika', category: { id: 'Perbankan', en: 'Banking', zh: '银行业' }, photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
      { name: 'Galora FM', category: { id: 'Media Partner', en: 'Media Partner', zh: '媒体合作伙伴' }, photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'talkshow-meet-up-guest-speaker',
    title: { id: 'Pengisi Acara Talkshow & Meet Up', en: 'Talkshow & Meet Up Guest Speaker', zh: '脱口秀与见面会嘉宾' },
    category: 'mice',
    gathering: true,
    date: { month: 7, year: 2026 },
    place: 'Bandung',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Sesi talkshow dan meet up dengan pengisi acara pilihan — kami tangani pembicara, panggung, hingga sesi interaksi.',
      en: 'A talkshow and meet-up session with hand-picked guests — we handle the speakers, stage, and audience interaction.',
      zh: '精选嘉宾的脱口秀与见面会——我们负责嘉宾、舞台与互动环节。',
    },
    overview: {
      id: 'Acara talkshow dan meet up ini mempertemukan audiens dengan tokoh pilihan dalam suasana yang intim dan terstruktur. Kami menangani seluruh alurnya: booking dan koordinasi pengisi acara, rundown, produksi panggung dan audio, hingga sesi tanda tangan dan foto bersama.',
      en: 'This talkshow and meet-up brought audiences face-to-face with hand-picked guest speakers in an intimate, structured setting. We handled the full flow: guest booking and coordination, rundown, stage and audio production, down to the signing and photo sessions.',
      zh: '这场脱口秀与见面会让观众与精选嘉宾在温馨有序的氛围中近距离交流。我们负责完整流程：嘉宾预订与协调、流程把控、舞台与音响制作，直至签名合影环节。',
    },
    scope: {
      id: ['Booking & koordinasi pengisi acara (fee, kontrak, rider)', 'Rundown talkshow, Q&A, dan sesi meet up', 'Produksi panggung, audio, dan dokumentasi', 'Pengelolaan antrean & interaksi audiens'],
      en: ['Guest booking & coordination (fee, contract, rider)', 'Rundown for talkshow, Q&A & meet-up session', 'Stage, audio & documentation production', 'Queue and audience interaction management'],
      zh: ['嘉宾预订与协调（费用、合同、rider）', '脱口秀、问答与见面会流程安排', '舞台、音响与影像制作', '签名合影队列与互动管理'],
    },
    guestStars: [
      { name: 'Bimo Aditama', role: { id: 'Penulis & Pembicara', en: 'Author & Speaker', zh: '作家 · 演讲者' }, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sari Wijaya', role: { id: 'Moderator', en: 'Moderator', zh: '主持人' }, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { name: 'Dimas Probo', role: { id: 'Komika', en: 'Stand-up Comedian', zh: '单口喜剧演员' }, photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Toko Buku Aksara', category: { id: 'Retail Buku · UMKM', en: 'Bookstore · SME', zh: '书店 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=400&q=80' },
      { name: 'Literasi Bandung', category: { id: 'Komunitas', en: 'Community', zh: '社群' }, photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sprint Teknologi', category: { id: 'IT & Software', en: 'IT & Software', zh: 'IT 与软件' }, photo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'coway-brand-activation',
    title: { id: 'Coway Brand Activation', en: 'Coway Brand Activation', zh: 'Coway 品牌推广活动' },
    category: 'brand',
    gathering: false,
    date: { month: 5, year: 2026 },
    place: 'Summarecon Mall Bandung',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Aktivasi brand Coway di mal — booth interaktif, product demo, dan lead capture untuk pengunjung.',
      en: 'Coway brand activation at the mall — interactive booth, product demos, and lead capture for visitors.',
      zh: 'Coway 品牌商场激活——互动展位、产品演示与访客线索收集。',
    },
    overview: {
      id: 'Coway Brand Activation di Summarecon Mal Bandung dirancang untuk menarik pengunjung lewat booth interaktif dan demonstrasi produk secara langsung. Tim kami mengeksekusi konsep, produksi booth, promotor, dan sistem lead capture dari hari pertama hingga hari terakhir.',
      en: 'Coway Brand Activation at Summarecon Mall Bandung was designed to draw visitors through an interactive booth and live product demonstrations. Our team executed the concept, booth production, promoters, and lead capture from day one to the last.',
      zh: 'Coway 品牌推广活动在 Summarecon 万隆购物中心举办，通过互动展位与现场产品演示吸引访客。我们的团队从首日到尾日负责概念、展位制作、促销人员与线索收集系统。',
    },
    scope: {
      id: ['Konsep aktivasi & desain booth', 'Produksi booth, display & properti', 'Product demo & promotor management', 'Lead capture & laporan hasil aktivasi'],
      en: ['Activation concept & booth design', 'Booth, display & property production', 'Product demos & promoter management', 'Lead capture & activation report'],
      zh: ['激活创意与展位设计', '展位、陈列与物料制作', '产品演示与促销员管理', '线索收集与激活效果报告'],
    },
    guestStars: [
      { name: 'Alya Maharani', role: { id: 'MC & Brand Ambassador', en: 'MC & Brand Ambassador', zh: '主持人 · 品牌大使' }, photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' },
      { name: 'Gagah Pradana', role: { id: 'Stand-up Comedian', en: 'Stand-up Comedian', zh: '单口喜剧演员' }, photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80' },
      { name: 'Karina Dewi', role: { id: 'Dance Crew Kupu', en: 'Dance Crew Kupu', zh: '舞团 Kupu' }, photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Sentosa Jaya', category: { id: 'Distribusi & Logistik', en: 'Distribution & Logistics', zh: '分销与物流' }, photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
      { name: 'Mama Lina Catering', category: { id: 'Katering · UMKM', en: 'Catering · SME', zh: '餐饮 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { name: 'Riang Medika', category: { id: 'Layanan Kesehatan', en: 'Healthcare', zh: '医疗服务' }, photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'tenant-event-local-brand-day',
    title: { id: 'Tenant Event Local Brand Day', en: 'Tenant Event Local Brand Day', zh: '本地品牌日租户活动' },
    category: 'tenant',
    gathering: false,
    date: { month: 4, year: 2026 },
    place: 'Summarecon Mall Bandung',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Satu hari penuh merayakan merek-merek lokal — kurasi tenant, booth, dan pengalaman belanja di mal.',
      en: 'A full day celebrating local brands — tenant curation, booths, and shopping experiences at the mall.',
      zh: '一整天的本地品牌日——商户甄选、展位与商场购物体验。',
    },
    overview: {
      id: 'Tenant Event Local Brand Day adalah hari khusus untuk merek-merek lokal tampil di Summarecon Mal Bandung. Kami menangani kurasi tenant, tata letak dan dekorasi area, promosi ke pengunjung, dan operasional acara dari persiapan hingga bongkar.',
      en: 'Tenant Event Local Brand Day is a dedicated day for local brands to shine at Summarecon Mall Bandung. We handled tenant curation, area layout and decoration, visitor promotions, and event operations from setup to teardown.',
      zh: '本地品牌日是属于本土品牌的专属日，在 Summarecon 万隆购物中心亮相。我们负责商户甄选、区域布置装饰、访客推广以及从搭建到撤展的整体运营。',
    },
    scope: {
      id: ['Kurasi & koordinasi tenant lokal', 'Layout area, booth & dekorasi', 'Promosi & marketing ke pengunjung mal', 'Operasional acara: setup, manpower, bongkar'],
      en: ['Local tenant curation & coordination', 'Area layout, booths & decoration', 'Visitor promotions & marketing', 'Event operations: setup, crew, teardown'],
      zh: ['本土商户甄选与协调', '区域布局、展位与装饰', '访客推广与营销', '活动执行：搭建、人员、撤展'],
    },
    guestStars: [
      { name: 'Rara Kusuma', role: { id: 'Content Creator', en: 'Content Creator', zh: '内容创作者' }, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { name: 'Bima Arya', role: { id: 'Aksi Akustik', en: 'Acoustic Act', zh: '原声音乐' }, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sanggar Tari Ligar', role: { id: 'Tari Tradisional', en: 'Traditional Dance', zh: '传统舞蹈' }, photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Kriya Alam', category: { id: 'Kerajinan · UMKM', en: 'Crafts · SME', zh: '手工艺 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Rumah Roti Naya', category: { id: 'Bakery · UMKM', en: 'Bakery · SME', zh: '面包店 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
      { name: 'Kanvas Distro', category: { id: 'Distro · UMKM', en: 'Streetwear · SME', zh: '潮牌 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'sera-sa-bakehouse-grand-opening',
    title: { id: 'Sera Sa Bakehouse Grand Opening', en: 'Sera Sa Bakehouse Grand Opening', zh: 'Sera Sa Bakehouse 盛大开业' },
    category: 'public',
    gathering: false,
    date: { month: 3, year: 2026 },
    place: 'Bandung',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Grand opening Sera Sa Bakehouse — seremoni pembukaan, hiburan, dan pengalaman pertama pelanggan.',
      en: "Sera Sa Bakehouse grand opening — opening ceremony, entertainment, and customers' first experience.",
      zh: 'Sera Sa Bakehouse 盛大开业——开业仪式、演出娱乐与顾客的首次体验。',
    },
    overview: {
      id: 'Grand opening Sera Sa Bakehouse dirayakan dengan seremoni pembukaan dan hiburan untuk pelanggan pertama. Kami merancang rangkaian acaranya — seremoni, hiburan, MC, dan dokumentasi — serta mengelola tamu undangan dan alur selama hari-H.',
      en: 'Sera Sa Bakehouse grand opening was celebrated with an opening ceremony and entertainment for its first customers. We designed the program — ceremony, entertainment, MC, and documentation — and managed guest arrivals and the flow throughout the day.',
      zh: 'Sera Sa Bakehouse 盛大开业以开业仪式与演出迎接首批顾客。我们策划了活动流程——仪式、演出、主持与影像记录——并管理来宾接待与当天动线。',
    },
    scope: {
      id: ['Konsep & dekorasi hari-H', 'Seremoni pembukaan & rangkaian acara', 'Hiburan, MC & dokumentasi', 'Manajemen tamu undangan & alur acara'],
      en: ['Day-of concept & decoration', 'Opening ceremony & program', 'Entertainment, MC & documentation', 'Guest management & event flow'],
      zh: ['开业当天概念与装饰', '开业仪式与活动流程', '演出、主持与影像记录', '来宾接待与活动动线'],
    },
    guestStars: [
      { name: 'Salsa Indah', role: { id: 'Pastry Chef', en: 'Pastry Chef', zh: '糕点主厨' }, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
      { name: 'Nino Saputra', role: { id: 'MC', en: 'MC', zh: '主持人' }, photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80' },
      { name: 'Senja Pagi', role: { id: 'Band Indie Lokal', en: 'Local Indie Band', zh: '本地独立乐队' }, photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Tepung Sejahtera', category: { id: 'Supplier Bahan Baku', en: 'Ingredient Supplier', zh: '原料供应商' }, photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
      { name: 'Kopi Kala', category: { id: 'Kedai Kopi · UMKM', en: 'Coffee Shop · SME', zh: '咖啡店 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80' },
      { name: 'Komunitas UKM Bandung', category: { id: 'Komunitas UMKM', en: 'SME Community', zh: '中小企业社群' }, photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'lumi-fun-run-5k',
    title: { id: 'Lumi Fun Run 5K', en: 'Lumi Fun Run 5K', zh: 'Lumi 5公里欢乐跑' },
    category: 'sport',
    gathering: false,
    date: { month: 2, year: 2026 },
    place: 'Bandung',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Fun run 5K untuk komunitas Lumi — registrasi, race kit, rute lari, dan pengalaman purna-lomba.',
      en: 'The Lumi 5K fun run — registration, race kits, the race route, and the finish-line experience.',
      zh: 'Lumi 5公里欢乐跑——报名、参赛物资、赛道与终点体验。',
    },
    overview: {
      id: 'Lumi Fun Run 5K mengajak komunitas berlari 5 kilometer di Bandung dengan pengalaman yang tertata: dari registrasi dan race kit, penandaan rute, marshal dan medis, hingga area finish dan pembagian merchandise.',
      en: 'The Lumi 5K fun run brought the community together for a 5-kilometer run in Bandung with a well-crafted experience: from registration and race kits to route marking, marshals and medical support, finish-line area and merchandise hand-out.',
      zh: 'Lumi 5公里欢乐跑邀约社区伙伴在万隆完成 5 公里赛程，体验井然有序：从报名与参赛物资领取、赛道标记、引导员与医疗支持，到终点区域与礼品发放。',
    },
    scope: {
      id: ['Konsep lomba & perizinan rute 5K', 'Sistem registrasi peserta & race kit', 'Marshal, medis & keamanan rute', 'Area start/finish & hiburan purna-lomba'],
      en: ['Race concept & 5K route permits', 'Participant registration & race kit', 'Marshals, medical & route safety', 'Start/finish area & post-race entertainment'],
      zh: ['赛事概念与 5 公里赛道审批', '选手报名与参赛物资', '引导员、医疗与赛道安保', '起终点区域与赛后娱乐'],
    },
    guestStars: [
      { name: 'Kevin Halim', role: { id: 'Atlet & Pelari Nasional', en: 'National Runner', zh: '国家级跑者' }, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
      { name: 'Rena Sari', role: { id: 'MC Sport', en: 'Sports MC', zh: '体育主持人' }, photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' },
      { name: 'DJ Anggara', role: { id: 'DJ', en: 'DJ', zh: 'DJ' }, photo: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Lumi Sports', category: { id: 'Sportswear · UMKM', en: 'Sportswear · SME', zh: '运动服饰 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80' },
      { name: 'Hydra+', category: { id: 'Minuman Elektrolit', en: 'Electrolyte Drink', zh: '电解质饮品' }, photo: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=400&q=80' },
      { name: 'Klinik Sehat Utama', category: { id: 'Kesehatan', en: 'Healthcare', zh: '医疗健康' }, photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'corporate-gathering-awarding-night',
    title: { id: 'Corporate Gathering & Awarding Night', en: 'Corporate Gathering & Awards Night', zh: '企业聚会暨颁奖之夜' },
    category: 'corporate',
    gathering: true,
    date: { month: 1, year: 2026 },
    place: 'Bandung',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Malam apresiasi korporat — gala, awarding ceremony, dan hiburan untuk tim internal.',
      en: 'A corporate appreciation night — gala dinner, awarding ceremony, and entertainment for internal teams.',
      zh: '企业答谢夜——晚宴、颁奖典礼与团队娱乐。',
    },
    overview: {
      id: 'Corporate Gathering & Awarding Night adalah malam apresiasi untuk tim dan mitra terbaik. Kami mengeksekusi konsep gala, produksi panggung dan lighting, rundown awarding ceremony, hiburan, serta dokumentasi — memastikan setiap momen penghargaan terasa spesial.',
      en: 'Corporate Gathering & Awarding Night is an appreciation evening for the best teams and partners. We executed the gala concept, stage and lighting production, awarding ceremony rundown, entertainment, and documentation — making every award moment feel special.',
      zh: '企业聚会暨颁奖之夜是属于最佳团队与伙伴的答谢夜。我们执行晚宴创意、舞台与灯光制作、颁奖流程、演出与影像记录——让每个颁奖时刻都格外特别。',
    },
    scope: {
      id: ['Konsep gala & tema awarding', 'Produksi panggung, lighting & LED screen', 'Rundown awarding ceremony & presenter', 'Hiburan, dokumentasi & after-movie'],
      en: ['Gala concept & awarding theme', 'Stage, lighting & LED screen production', 'Awarding ceremony rundown & presenters', 'Entertainment, documentation & aftermovie'],
      zh: ['晚宴创意与颁奖主题', '舞台、灯光与 LED 屏制作', '颁奖流程与颁奖嘉宾', '演出、影像记录与 aftermovie'],
    },
    guestStars: [
      { name: 'Andra Ramadhan', role: { id: 'Penyanyi', en: 'Singer', zh: '歌手' }, photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80' },
      { name: 'Gita Prameswari', role: { id: 'MC Gala', en: 'Gala MC', zh: '晚宴主持人' }, photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
      { name: 'Yoga Pratama', role: { id: 'Comedian', en: 'Comedian', zh: '喜剧演员' }, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'Hotel Purnama', category: { id: 'Hospitality', en: 'Hospitality', zh: '酒店接待' }, photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80' },
      { name: 'Anggun Catering', category: { id: 'Katering · UMKM', en: 'Catering · SME', zh: '餐饮 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { name: 'Konveksi Tunas', category: { id: 'Konveksi · UMKM', en: 'Apparel Production · SME', zh: '服装加工 · 中小企业' }, photo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    slug: 'live-streaming-concert',
    title: { id: 'Live Streaming Concert', en: 'Live-Streamed Concert', zh: '线上直播音乐会' },
    category: 'hybrid',
    gathering: false,
    date: { month: 12, year: 2025 },
    place: 'Bandung',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=850&q=85',
    text: {
      id: 'Konser yang disiarkan langsung — produksi multi-kamera, audio, dan streaming berkualitas dari Bandung.',
      en: 'A live-streamed concert — multi-camera production, audio, and quality streaming from Bandung.',
      zh: '线上直播音乐会——来自万隆的多机位、音响与高质量流媒体制作。',
    },
    overview: {
      id: 'Live Streaming Concert ini diproduksi sebagai konser hibrida yang bisa dinikmati di mana saja. Kami menangani produksi panggung dan live streaming: setup multi-kamera, audio, encoding dan platform streaming, serta moderasi chat — hingga konten highlight setelahnya.',
      en: 'This Live-Streamed Concert was produced as a hybrid concert that could be enjoyed from anywhere. We handled the stage and streaming production: multi-camera setup, audio, streaming encoding and platform, and chat moderation — plus highlight content afterwards.',
      zh: '这场线上直播音乐会以混合式形式制作，让线上观众也能同步欣赏。我们负责舞台与直播制作：多机位设置、音响、推流编码与平台、聊天室管理——以及后续精彩剪辑。',
    },
    scope: {
      id: ['Produksi panggung & show management', 'Multi-kamera, audio & live switching', 'Encoding, platform & moderasi streaming', 'Konten highlight & distribusi pasca-acara'],
      en: ['Stage production & show management', 'Multi-camera, audio & live switching', 'Encoding, platform & stream moderation', 'Highlight content & post-event distribution'],
      zh: ['舞台制作与 show 执行', '多机位、音响与直播切换', '推流编码、平台与聊天室管理', '精彩剪辑与赛后分发'],
    },
    guestStars: [
      { name: 'Arka Wijaya', role: { id: 'Band “Gelombang”', en: 'Band “Gelombang”', zh: '乐队 Gelombang' }, photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sita Naila', role: { id: 'Penyanyi', en: 'Singer', zh: '歌手' }, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
      { name: 'Anggara', role: { id: 'DJ Live', en: 'Live DJ', zh: '现场 DJ' }, photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80' },
    ],
    support: [
      { name: 'StreamNow', category: { id: 'Media Partner', en: 'Media Partner', zh: '媒体合作伙伴' }, photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80' },
      { name: 'Studio Gema', category: { id: 'Production House', en: 'Production House', zh: '制作公司' }, photo: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=400&q=80' },
    ],
  },
]

export function getEventBySlug(slug) {
  return events.find((event) => event.slug === slug) ?? null
}
