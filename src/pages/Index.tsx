import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1db1e3f0-43d3-4887-8385-f80471998dc0/files/11cf88bd-2483-4b00-8148-0fc3eab51258.jpg";

const PLAYLIST = [
  { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
  { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: "3:01" },
  { title: "All of Me", artist: "John Legend", duration: "4:29" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
  { title: "Marry Me", artist: "Train", duration: "3:51" },
];

const PROGRAM = [
  { time: "14:00", title: "Сбор гостей", desc: "Встреча и приветственные напитки" },
  { time: "15:00", title: "Церемония", desc: "Обмен клятвами и кольцами" },
  { time: "16:30", title: "Фотосессия", desc: "Памятные снимки с молодожёнами" },
  { time: "18:00", title: "Банкет", desc: "Торжественный ужин и танцы" },
  { time: "22:00", title: "Торт", desc: "Разрезание свадебного торта" },
  { time: "00:00", title: "Продолжение", desc: "Музыка и танцы до утра" },
];

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const isVisible = (id: string) => visibleSections.has(id);

  const togglePlay = () => setIsPlaying((p) => !p);
  const nextTrack = () => setCurrentTrack((t) => (t + 1) % PLAYLIST.length);
  const prevTrack = () => setCurrentTrack((t) => (t - 1 + PLAYLIST.length) % PLAYLIST.length);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#2c2c2c]" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center gap-8 py-5 bg-[#faf9f7]/90 backdrop-blur-sm border-b border-[#e8e3dc]">
        {["О паре", "Дата", "Программа", "Плейлист", "RSVP"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] tracking-[0.2em] uppercase text-[#8a7d6e] hover:text-[#2c2c2c] transition-colors duration-300 hidden sm:block"
          >
            {item}
          </a>
        ))}
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#8a7d6e] sm:hidden">
          А & М · 14.09.2026
        </span>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-[#faf9f7]/55" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#8a7d6e] mb-8 animate-fade-in">
            Приглашение на свадьбу
          </p>
          <h1
            className="text-[72px] md:text-[110px] leading-none font-light text-[#2c2c2c] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Анна
          </h1>
          <p
            className="text-[48px] md:text-[72px] font-light italic text-[#b8a898]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &amp;
          </p>
          <h1
            className="text-[72px] md:text-[110px] leading-none font-light text-[#2c2c2c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Михаил
          </h1>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#8a7d6e] mt-8">
            14 сентября 2026
          </p>
          <div className="mt-16 flex justify-center">
            <div className="w-px h-16 bg-gradient-to-b from-[#b8a898] to-transparent" />
          </div>
        </div>
      </section>

      {/* О ПАРЕ */}
      <section
        id="о паре"
        ref={setRef("about")}
        className={`py-32 px-6 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[9px] tracking-[0.35em] uppercase text-[#b8a898] mb-12">О нас</p>
        <h2
          className="text-5xl md:text-6xl font-light italic text-[#2c2c2c] mb-10 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          История любви начинается там, где заканчиваются слова
        </h2>
        <p className="text-sm leading-relaxed text-[#8a7d6e] font-light max-w-xl mx-auto">
          Мы встретились пять лет назад, и с тех пор каждый день стал особенным. Путешествия, смех, тихие вечера — 
          всё привело нас к этому моменту. Мы хотим разделить его с вами.
        </p>
        <div className="mt-16 flex items-center justify-center gap-6">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#e8e3dc]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#b8a898]" />
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#e8e3dc]" />
        </div>
      </section>

      {/* ДАТА И МЕСТО */}
      <section
        id="дата"
        ref={setRef("date")}
        className={`py-24 px-6 bg-[#f2ede8] transition-all duration-1000 ${
          isVisible("date") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#b8a898] mb-16 text-center">Дата и место</p>
          <div className="grid md:grid-cols-3 gap-12 text-center items-center">
            <div>
              <div className="text-[80px] leading-none font-light text-[#b8a898] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                14
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a7d6e]">Сентября</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a7d6e]">2026</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#b8a898] to-transparent hidden md:block" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#b8a898] to-transparent md:hidden" />
            </div>
            <div className="flex flex-col justify-center">
              <Icon name="MapPin" size={20} className="mx-auto mb-4 text-[#b8a898]" />
              <p className="text-xl font-light text-[#2c2c2c] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Усадьба «Белый сад»
              </p>
              <p className="text-xs text-[#8a7d6e] tracking-wide">Московская область,<br />Рублёво-Успенское шоссе</p>
              <button className="mt-6 mx-auto text-[9px] tracking-[0.25em] uppercase text-[#b8a898] border border-[#b8a898] px-6 py-2.5 hover:bg-[#b8a898] hover:text-white transition-all duration-300">
                Открыть карту
              </button>
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-20 grid grid-cols-4 gap-4 max-w-sm mx-auto text-center">
            {[
              { val: "158", label: "дней" },
              { val: "08", label: "часов" },
              { val: "34", label: "минут" },
              { val: "12", label: "секунд" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-3xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {val}
                </div>
                <div className="text-[8px] tracking-[0.2em] uppercase text-[#b8a898] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОГРАММА */}
      <section
        id="программа"
        ref={setRef("program")}
        className={`py-32 px-6 max-w-2xl mx-auto transition-all duration-1000 ${
          isVisible("program") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[9px] tracking-[0.35em] uppercase text-[#b8a898] mb-16 text-center">Программа дня</p>
        <div className="relative">
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[#e8e3dc]" />
          <div className="space-y-10">
            {PROGRAM.map((item, i) => (
              <div
                key={i}
                className={`flex gap-8 transition-all duration-700 ${
                  isVisible("program") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 text-right flex-shrink-0">
                  <span className="text-xs text-[#b8a898] font-light tracking-wide">{item.time}</span>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full border border-[#b8a898] bg-[#faf9f7] -translate-x-1" />
                  <p className="text-sm font-medium text-[#2c2c2c] mb-0.5">{item.title}</p>
                  <p className="text-xs text-[#8a7d6e] font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПЛЕЙЛИСТ */}
      <section
        id="плейлист"
        ref={setRef("playlist")}
        className={`py-24 px-6 bg-[#2c2c2c] transition-all duration-1000 ${
          isVisible("playlist") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#b8a898] mb-16 text-center">Наш плейлист</p>

          {/* Player */}
          <div className="bg-[#383838] p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-[#b8a898] text-[9px] tracking-[0.2em] uppercase mb-2">Сейчас играет</p>
              <p
                className="text-2xl font-light text-white mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {PLAYLIST[currentTrack].title}
              </p>
              <p className="text-xs text-[#8a7d6e] tracking-wide">{PLAYLIST[currentTrack].artist}</p>
            </div>

            {/* Progress bar */}
            <div className="h-px bg-[#4a4a4a] mb-1">
              <div className="h-px bg-[#b8a898] w-1/3" />
            </div>
            <div className="flex justify-between text-[9px] text-[#8a7d6e] mb-8">
              <span>1:24</span>
              <span>{PLAYLIST[currentTrack].duration}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <button onClick={prevTrack} className="text-[#8a7d6e] hover:text-white transition-colors">
                <Icon name="SkipBack" size={18} />
              </button>
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full border border-[#b8a898] flex items-center justify-center text-[#b8a898] hover:bg-[#b8a898] hover:text-white transition-all duration-300"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
              </button>
              <button onClick={nextTrack} className="text-[#8a7d6e] hover:text-white transition-colors">
                <Icon name="SkipForward" size={18} />
              </button>
            </div>
          </div>

          {/* Track list */}
          <div className="space-y-1">
            {PLAYLIST.map((track, i) => (
              <button
                key={i}
                onClick={() => setCurrentTrack(i)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                  currentTrack === i ? "bg-[#383838] text-white" : "text-[#8a7d6e] hover:text-[#b8a898]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[9px] w-4 text-[#4a4a4a]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-xs font-medium">{track.title}</p>
                    <p className="text-[9px] text-[#6a6a6a]">{track.artist}</p>
                  </div>
                </div>
                <span className="text-[9px]">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section
        id="rsvp"
        ref={setRef("rsvp")}
        className={`py-32 px-6 max-w-lg mx-auto text-center transition-all duration-1000 ${
          isVisible("rsvp") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[9px] tracking-[0.35em] uppercase text-[#b8a898] mb-12">Подтверждение</p>
        <h2
          className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Придёте?
        </h2>
        <p className="text-xs text-[#8a7d6e] leading-relaxed mb-12">
          Просим подтвердить ваше присутствие до 1 августа 2026 года
        </p>

        <div className="space-y-4 mb-10">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full border-b border-[#e8e3dc] bg-transparent py-3 text-sm text-[#2c2c2c] placeholder-[#c4b9ac] focus:outline-none focus:border-[#b8a898] transition-colors text-center font-light tracking-wide"
          />
          <input
            type="text"
            placeholder="Количество гостей"
            className="w-full border-b border-[#e8e3dc] bg-transparent py-3 text-sm text-[#2c2c2c] placeholder-[#c4b9ac] focus:outline-none focus:border-[#b8a898] transition-colors text-center font-light tracking-wide"
          />
          <input
            type="text"
            placeholder="Пожелания / диетические предпочтения"
            className="w-full border-b border-[#e8e3dc] bg-transparent py-3 text-sm text-[#2c2c2c] placeholder-[#c4b9ac] focus:outline-none focus:border-[#b8a898] transition-colors text-center font-light tracking-wide"
          />
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setRsvpStatus("yes")}
            className={`px-10 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${
              rsvpStatus === "yes"
                ? "bg-[#b8a898] text-white"
                : "border border-[#b8a898] text-[#b8a898] hover:bg-[#b8a898] hover:text-white"
            }`}
          >
            Буду
          </button>
          <button
            onClick={() => setRsvpStatus("no")}
            className={`px-10 py-3 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${
              rsvpStatus === "no"
                ? "bg-[#8a7d6e] text-white"
                : "border border-[#e8e3dc] text-[#8a7d6e] hover:border-[#8a7d6e]"
            }`}
          >
            Не смогу
          </button>
        </div>

        {rsvpStatus && (
          <p className="text-xs text-[#b8a898] animate-fade-in">
            {rsvpStatus === "yes" ? "Мы рады! Ждём вас с нетерпением ✦" : "Жаль, что вы не сможете прийти. Спасибо, что сообщили."}
          </p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-[#e8e3dc]">
        <p
          className="text-3xl font-light italic text-[#b8a898] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Анна &amp; Михаил
        </p>
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#c4b9ac]">14 · 09 · 2026</p>
      </footer>
    </div>
  );
}
