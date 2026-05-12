import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Clock, Heart, Music, Sparkles, Volume2, VolumeX, Bird, Flower2 } from 'lucide-react';

// --- Sub-components ---

import petalImg from './assets/sakura-petal.png';
import branchTL from './assets/sakura-branch-tl.png';
import branchBR from './assets/sakura-branch-br.png';
import preloaderBg from './assets/preloader-bg.png';
import coupleImg from './assets/couple.png';


const Preloader = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const textVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -20, filter: 'blur(10px)' }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-white"
    >
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 6, ease: [0.33, 1, 0.68, 1] }}
        className="absolute inset-0 z-0"
      >
        <img src={preloaderBg} alt="Wedding Arch" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </motion.div>

      {/* Premium SVG Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 100 - 50 + 'vw',
              y: Math.random() * 100 - 50 + 'vh'
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute left-1/2 top-1/2"
          >
            <Sparkles className="text-gold opacity-30" size={24 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="text1"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex justify-center gap-4 text-gold/40">
                <div className="w-12 h-px bg-current self-center" />
                <Heart size={16} />
                <div className="w-12 h-px bg-current self-center" />
              </div>
              <h2 className="text-luxury text-4xl md:text-6xl italic font-serif leading-tight">
                "Bless us with <br /> your presence."
              </h2>
              <p className="text-wine/40 tracking-[0.6em] uppercase text-[9px] font-bold">A Sacred Union Awaits</p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="text2"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex justify-center gap-4 text-gold/40">
                <div className="w-12 h-px bg-current self-center" />
                <Sparkles size={16} />
                <div className="w-12 h-px bg-current self-center" />
              </div>
              <h2 className="text-luxury text-4xl md:text-6xl italic font-serif leading-tight">
                "Love us with <br /> your whole heart."
              </h2>
              <p className="text-wine/40 tracking-[0.6em] uppercase text-[9px] font-bold">The Celebration of Love</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="text3"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex justify-center gap-4 text-gold/40">
                <div className="w-12 h-px bg-current self-center" />
                <Music size={16} />
                <div className="w-12 h-px bg-current self-center" />
              </div>
              <h2 className="text-luxury text-4xl md:text-6xl italic font-serif leading-tight">
                "Our story begins <br /> with you."
              </h2>
              <p className="text-wine/40 tracking-[0.6em] uppercase text-[9px] font-bold">Forever Starts Now</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 5, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-rose/40"
      />
    </motion.div>
  );
};


const FallingPetals = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 15,
      scale: 0.05 + Math.random() * 0.15,
      rotation: Math.random() * 360,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: -100, x: 0, opacity: 0, rotate: el.rotation }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 400],
            opacity: [0, 0.8, 0],
            rotate: el.rotation + (Math.random() > 0.5 ? 1080 : -1080)
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          className="absolute mix-blend-multiply"
          style={{ left: el.left }}
        >
          <img
            src={petalImg}
            alt="petal"
            style={{ width: '100px', height: '100px', transform: `scale(${el.scale})` }}
            className="opacity-70"
          />
        </motion.div>
      ))}
    </div>
  );
};

const SakuraDecor = () => {
  return (
    <>
      {/* Top Left Branch */}
      <div className="fixed -top-6 -left-6 md:-top-12 md:-left-12 w-[250px] h-[250px] md:w-[450px] md:h-[450px] z-[5] pointer-events-none mix-blend-multiply opacity-90">
        <motion.img
          initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src={branchTL}
          alt="Sakura Branch Top Left"
          className="w-full h-full object-contain origin-top-left"
        />
      </div>

      {/* Bottom Right Branch */}
      <div className="fixed -bottom-12 -right-12 md:-bottom-24 md:-right-24 w-[300px] h-[300px] md:w-[550px] md:h-[550px] z-[5] pointer-events-none mix-blend-multiply opacity-90">
        <motion.img
          initial={{ rotate: 5, scale: 0.9, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
          src={branchBR}
          alt="Sakura Branch Bottom Right"
          className="w-full h-full object-contain origin-bottom-right"
        />
      </div>
    </>
  );
};

const TempleSilhouettes = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Distant Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[60vh] opacity-[0.03] text-wine flex justify-around items-end"
      >
        <svg viewBox="0 0 100 100" className="w-[400px] h-[400px] fill-current">
          <path d="M50 0 L10 100 L90 100 Z" />
        </svg>
        <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] fill-current">
          <path d="M50 10 L20 100 L80 100 Z" />
        </svg>
      </motion.div>

      {/* Mid Layer */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[80vh] opacity-[0.05] text-gold flex justify-between items-end px-24"
      >
        <div className="w-1 h-full bg-gradient-to-t from-gold/40 to-transparent" />
        <svg viewBox="0 0 100 150" className="w-[500px] h-[700px] fill-current">
          <path d="M50 5 L35 25 L65 25 Z M32 26 L68 26 L72 45 L28 45 Z M25 46 L75 46 L80 70 L20 70 Z M5 106 L95 106 L100 150 L0 150 Z" />
        </svg>
      </motion.div>
    </div>
  );
};

const SakuraSeparator = () => (
  <div className="w-full flex items-center justify-center gap-8 my-24 opacity-30">
    <div className="w-32 h-px bg-gradient-to-r from-transparent to-gold/40" />
    <img src={petalImg} alt="sakura" className="w-6 h-6 mix-blend-multiply rotate-45" />
    <div className="w-32 h-px bg-gradient-to-l from-transparent to-gold/40" />
  </div>
);

const FloatingLamps = ({ delay = 0, x = '50%', y = '50%', scale = 1, depth = 1 }) => {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -500 * depth]);

  return (
    <motion.div
      style={{ left: x, top: y, scale, y: yOffset }}
      className="absolute pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 3, -3, 0]
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          delay,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <div className="w-10 h-10 bg-marigold/20 rounded-full blur-lg animate-pulse" />
          <div className="w-px h-32 bg-gold/20 absolute bottom-full left-1/2" />
          <div className="w-6 h-10 border border-gold/30 rounded-full backdrop-blur-[2px] flex items-center justify-center">
            <div className="w-2 h-3 bg-marigold rounded-full blur-[1px] gold-glow" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ParallaxSection = ({ children, offset = 100 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const ScrollReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const EpicScrollSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.3, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.6], ["50%", "0%"]);
  const imageScale = useTransform(scrollYProgress, [0.3, 0.6], [2, 1]);
  const blurValue = useTransform(scrollYProgress, [0.3, 0.5], [20, 0]);
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

  const textY = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="h-[250vh] w-full relative z-30">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
        <motion.div
          style={{ scale, borderRadius }}
          className="w-full h-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] origin-center"
        >
          <motion.img
            style={{ scale: imageScale, filter: blur }}
            src={coupleImg}
            alt="Wedding Moment"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-wine/60 backdrop-blur-md" />

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold/80 mb-8" />
            <h2 className="text-gold text-5xl md:text-8xl font-serif italic mb-6 drop-shadow-2xl">Eternal Grace</h2>
            <p className="text-white text-lg md:text-2xl font-light tracking-[0.3em] uppercase max-w-2xl leading-relaxed drop-shadow-lg">
              Two families • One beautiful journey
            </p>
            <div className="w-px h-24 bg-gradient-to-t from-transparent to-gold/80 mt-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const RoyalDecorativeSection = () => {
  return (
    <section className="relative w-full bg-wine overflow-hidden z-20 py-32 md:py-48">
      {/* Subtle Ornamental Rings */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] border-[0.5px] border-gold/8 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] border-[0.5px] border-gold/5 rounded-full"
        />
      </div>

      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(180,40,40,0.3)_0%,transparent_70%)]" />

      {/* Large Faint Heart */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <Heart size={600} fill="currentColor" className="text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5 }}
          className="space-y-10"
        >
          {/* Heartbeat Icon */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Heart size={36} className="text-gold/80" fill="currentColor" />
              <div className="absolute inset-0 blur-2xl bg-gold/20 rounded-full" />
            </motion.div>
          </div>

          {/* Quote Lines — Staggered Reveal */}
          <div className="space-y-2 md:space-y-3">
            {[
              "\"In the garden of love,",
              "we bloom together",
              "under the sacred stars.\""
            ].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-gold-light text-3xl md:text-7xl font-serif italic leading-snug"
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Divider + Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center gap-6 pt-4"
          >
            <div className="flex items-center gap-6 text-gold/30">
              <div className="w-16 md:w-24 h-px bg-current" />
              <span className="text-[9px] md:text-[10px] tracking-[1em] uppercase font-bold text-gold/50">Forever & Always</span>
              <div className="w-16 md:w-24 h-px bg-current" />
            </div>
            <div className="w-px h-12 bg-gradient-to-t from-transparent via-gold/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Hearts + Gold Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 6
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${50 + Math.random() * 50}%`
            }}
          >
            {i % 4 === 0 ? (
              <Heart size={10} fill="currentColor" className="text-rose/15" />
            ) : (
              <div className="w-1 h-1 bg-gold/30 rounded-full blur-[0.5px]" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle audio playback
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // User taps "Enter" — start audio + preloader simultaneously
  const handleEnter = useCallback(() => {
    setHasEntered(true);
    setIsPlaying(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Audio element always mounted so it persists across all phases */}
      <audio
        ref={audioRef}
        src="/Alaipayuthey Marriage Song Ringtone.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <AnimatePresence>
        {!hasEntered ? (
          /* ── Cinematic Splash Screen ── */
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1100] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Full-bleed background with slow Ken Burns */}
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 8, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 z-0"
            >
              <img src={preloaderBg} alt="" className="w-full h-full object-cover" />
            </motion.div>

            {/* Layered overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/70 z-[1]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,rgba(255,255,255,0.5)_100%)] z-[2]" />

            {/* Floating sparkles */}
            <div className="absolute inset-0 z-[3] pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: [0, -60 - Math.random() * 40],
                    x: [0, (Math.random() - 0.5) * 30],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                  className="absolute"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${30 + Math.random() * 40}%`,
                  }}
                >
                  <Sparkles size={8 + Math.random() * 10} className="text-gold/60" />
                </motion.div>
              ))}
            </div>

            {/* Top ornamental border */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-[5]"
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-[5]"
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-8 max-w-xl flex flex-col items-center">

              {/* Ornamental top motif */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 text-gold/50">
                  <div className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent to-current" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                  <div className="w-6 md:w-10 h-px bg-current" />
                  <Heart size={12} className="text-rose/60" fill="currentColor" />
                  <div className="w-6 md:w-10 h-px bg-current" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                  <div className="w-8 md:w-16 h-px bg-gradient-to-l from-transparent to-current" />
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-wine/40 tracking-[0.5em] md:tracking-[0.8em] uppercase text-[8px] md:text-[10px] font-display mb-6"
              >
                You Are Cordially Invited
              </motion.p>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-luxury text-4xl md:text-6xl lg:text-7xl leading-[1.15] mb-3"
              >
                Ramasubramanian
              </motion.h1>

              {/* Ampersand */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="my-2 md:my-4"
              >
                <span className="text-gold/70 italic text-3xl md:text-5xl font-serif">&</span>
              </motion.div>

              {/* Bride name */}
              <motion.h1
                initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-luxury text-4xl md:text-6xl lg:text-7xl leading-[1.15] mb-8"
              >
                Malliga Priyadharshini
              </motion.h1>

              {/* Date line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 md:gap-6 text-wine/40 tracking-[0.3em] uppercase text-[9px] md:text-xs mb-12 md:mb-16"
              >
                <span>May 13, 2026</span>
                <span className="w-1 h-1 rounded-full bg-gold/40" />
                <span>Thoothukudi</span>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Pulsing glow ring behind button */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-rose/30 pointer-events-none"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.7, 1],
                    opacity: [0.15, 0, 0.15],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute inset-0 rounded-full border border-gold/20 pointer-events-none"
                />

                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(74, 4, 4, 1)', color: '#FFFAF0' }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 rounded-full border-2 border-wine/20 text-wine bg-white/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(74,4,4,0.15)] transition-all duration-500 cursor-pointer group"
                >
                  {/* Sound wave equalizer icon */}
                  <div className="flex items-end gap-[3px] h-4">
                    {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ scaleY: [h, 1, h] }}
                        transition={{
                          duration: 0.6 + i * 0.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.08,
                        }}
                        className="w-[2px] md:w-[2.5px] bg-current rounded-full origin-bottom"
                        style={{ height: '100%' }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-display font-bold">
                    Open Invitation
                  </span>
                  <Sparkles size={14} className="opacity-40 group-hover:opacity-80 transition-opacity" />
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom petal accents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 mix-blend-multiply z-[5]"
            >
              <img src={petalImg} alt="" className="w-6 h-6 rotate-[30deg]" />
              <div className="w-16 h-px bg-gold/30" />
              <img src={petalImg} alt="" className="w-5 h-5 -rotate-[20deg]" />
              <div className="w-16 h-px bg-gold/30" />
              <img src={petalImg} alt="" className="w-6 h-6 rotate-[60deg] -scale-x-100" />
            </motion.div>
          </motion.div>
        ) : isLoading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-[400vh] bg-white selection:bg-rose/30 scroll-smooth"
        >

          <SakuraDecor />
          <FallingPetals />

          {/* Background Gradient Layer */}
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#FFFAF0_0%,#FFFFFF_100%)] z-[-2]" />

          {/* Removed old motifs and lamps */}

          {/* Header Badges */}


          {/* Audio Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[70] p-3 md:p-4 border border-white/60 bg-white/40 backdrop-blur-xl rounded-full text-wine hover:bg-rose hover:text-white hover:border-transparent transition-colors group shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
          >
            <span className="relative flex items-center justify-center">
              {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose animate-pulse" />
              )}
            </span>
          </motion.button>

          {/* Main Content */}
          <main className="relative flex flex-col items-center">


            {/* Hero Section */}
            <section className="min-h-[100svh] w-full flex flex-col items-center justify-between relative overflow-hidden py-24 md:py-32">
              {/* Top Blessing */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-wine/60 tracking-[0.3em] md:tracking-[0.8em] text-[8px] md:text-xs uppercase font-display text-center px-4 z-20"
              >
                With the divine blessings of the Almighty
              </motion.div>

              {/* Center Names */}
              <ParallaxSection offset={-100}>
                <div className="flex flex-col items-center justify-center w-full px-6">
                  <motion.div
                    className="text-center z-10 px-8 md:px-32 py-16 md:py-24 border border-white/60 bg-white/30 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
                  >
                    {/* Decorative top dot */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/50" />

                    <div className="overflow-hidden">
                      <motion.h1
                        initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-luxury text-5xl md:text-[7rem] leading-tight"
                      >
                        Ramasubramanian
                      </motion.h1>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 1.5 }}
                      className="relative flex items-center justify-center py-8 md:py-16"
                    >
                      <div className="absolute left-1/2 -translate-x-1/2 w-48 md:w-96 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                      <span className="text-gold italic text-4xl md:text-6xl font-serif relative z-10 px-8">
                        &
                      </span>
                    </motion.div>

                    <div className="overflow-hidden">
                      <motion.h1
                        initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-luxury text-5xl md:text-[7rem] leading-tight"
                      >
                        Malliga Priyadharshini
                      </motion.h1>
                    </div>

                    {/* Decorative bottom dot */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/50" />
                  </motion.div>
                </div>
              </ParallaxSection>

              {/* Bottom Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="flex flex-col items-center space-y-6 z-20 px-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-wine/80 font-light tracking-[0.3em] md:tracking-[0.5em] uppercase text-sm md:text-2xl text-center">
                  <span>May 13, 2026</span>
                  <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold/50" />
                  <span className="md:hidden w-8 h-px bg-gold/30" />
                  <span>7:00 PM</span>
                </div>
                <div className="text-[10px] md:text-sm tracking-[0.4em] uppercase text-wine/40 font-sans text-center">
                  Thoothukudi
                </div>
              </motion.div>
            </section>

            {/* Invitation Message */}
            <section className="py-32 md:py-64 px-6 max-w-5xl text-center relative z-20 mx-auto">
              <ScrollReveal>
                <div className="p-8 md:p-24 border border-white/60 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                  <div className="mb-16">
                    <div className="w-16 h-px bg-gold/30 mx-auto mb-8" />
                    <h2 className="text-display text-4xl text-wine mb-12 tracking-[0.3em] uppercase">Artistic Union</h2>
                  </div>
                  <p className="text-serif text-2xl md:text-4xl leading-relaxed text-wine/80 font-light italic px-8">
                    "With the blessings of the Almighty, the engagement ceremony of our beloved children has been arranged."
                    <br /><br />
                    We cordially invite you and your family to grace the occasion and bless the couple as they begin their journey together.
                  </p>
                  <div className="w-16 h-px bg-gold/30 mx-auto mt-16" />
                </div>
              </ScrollReveal>
            </section>

            <EpicScrollSection />
            <RoyalDecorativeSection />

            {/* Ancestry Section */}
            <section className="py-16 md:py-32 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-20">
              <ScrollReveal>
                <div className="p-8 md:p-12 border border-white/60 bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                  <h3 className="text-luxury text-2xl md:text-3xl mb-8">The Groom's Side</h3>
                  <p className="text-wine text-xl font-bold mb-4">K.S.K. Ramasubramanian, B.Com</p>
                  <div className="space-y-6 text-wine/70 text-sm leading-relaxed">
                    <div>
                      <p className="uppercase tracking-widest text-[10px] opacity-60 mb-2">Parents</p>
                      <p className="text-base">Mr. K.S. Kalimuthu Achari & Mrs. Murugalakshmi</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="uppercase tracking-widest text-[10px] opacity-60 mb-2">Paternal Grandparents</p>
                        <p>Late Mr. K. Subbaiah Achari & Mrs. Meenakshi Ammal (Sankarankovil)</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-widest text-[10px] opacity-60 mb-2">Maternal Grandparents</p>
                        <p>Late Mr. P. Ramasamy Achari & Mrs. Sellammal (Kovilpatti)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="p-8 md:p-12 border border-white/60 bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                  <h3 className="text-luxury text-2xl md:text-3xl mb-8">The Bride's Side</h3>
                  <p className="text-wine text-xl font-bold mb-4">S. Malliga Priyadharshini, M.Sc</p>
                  <div className="space-y-6 text-wine/70 text-sm leading-relaxed">
                    <div>
                      <p className="uppercase tracking-widest text-[10px] opacity-60 mb-2">Parents</p>
                      <p className="text-base">Mr. S. Chermakumar & Mrs. S. Padmavathi</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="uppercase tracking-widest text-[10px] opacity-60 mb-2">Paternal Grandparents</p>
                        <p>Mr. A. Paul Achari & Mrs. Malliga Ammal (Udangudi)</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-widest text-[10px] opacity-60 mb-2">Maternal Grandparents</p>
                        <p>Mr. M. Shanmugavel Achari & Mrs. Vijayalakshmi Ammal (Coimbatore)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Event Details Grid */}
            <section className="py-16 md:py-32 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-20">
              <ScrollReveal>
                <div className="h-full border border-white/60 p-8 md:p-12 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-tr-[5rem] md:rounded-bl-[5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] group hover:bg-white/50 transition-all duration-700">
                  <Calendar className="text-wine mb-8 w-10 h-10 opacity-30 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-display text-[10px] tracking-[0.5em] text-wine/40 mb-8 uppercase">Ceremony Date</h3>
                  <p className="text-serif text-5xl mb-4 text-wine font-light uppercase">May 13</p>
                  <p className="text-serif text-lg text-wine/60 italic font-serif">Wednesday, 2026</p>
                  <div className="mt-8 pt-8 border-t border-gold/10 text-[10px] uppercase tracking-widest text-wine/40 leading-loose">
                    Tamil Year: Parabhava<br />Month: Chithirai<br />Star: Uthirattathi
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="h-full border border-white/60 p-8 md:p-12 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-tl-[5rem] md:rounded-br-[5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] group hover:bg-white/50 transition-all duration-700">
                  <Clock className="text-wine mb-8 w-10 h-10 opacity-30 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-display text-[10px] tracking-[0.5em] text-wine/40 mb-8 uppercase">Auspicious Time</h3>
                  <p className="text-serif text-5xl mb-4 text-wine font-light uppercase">7:00 PM</p>
                  <p className="text-serif text-lg text-wine/60 italic font-serif">Vrischika Lagnam</p>
                  <div className="mt-8 pt-8 border-t border-gold/10 text-[10px] uppercase tracking-widest text-wine/40 leading-loose">
                    Thithi: Dwadashi<br />Yogam: Siddha Yogam<br />Between 7:00 - 8:15 PM
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="h-full border border-white/60 p-8 md:p-12 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-tr-[5rem] md:rounded-bl-[5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] group hover:bg-white/50 transition-all duration-700">
                  <MapPin className="text-wine mb-8 w-10 h-10 opacity-30 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-display text-[10px] tracking-[0.5em] text-wine/40 mb-8 uppercase">The Venue</h3>
                  <p className="text-serif text-4xl mb-4 text-wine font-light uppercase">Bhaskaran Kalyana Mahal</p>
                  <p className="text-serif text-lg text-wine/60 italic font-serif">V.E. Road, Thoothukudi</p>
                  <div className="mt-8 pt-8 border-t border-gold/10">
                    <a href="https://maps.app.goo.gl/tuticorin" target="_blank" className="text-xs text-rose uppercase tracking-widest hover:underline">Get Directions</a>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Hosts Section */}
            <section className="w-full relative py-16 md:py-32 px-6 md:px-12 bg-white/40 backdrop-blur-xl border-y border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] max-w-7xl mx-auto rounded-[2rem] md:rounded-3xl">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-luxury text-3xl md:text-4xl mb-4">Our Loving Family</h2>
                <div className="w-24 h-px bg-gold/30 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 px-2 md:px-12">
                <div>
                  <h4 className="text-wine font-bold uppercase tracking-[0.3em] text-xs mb-8">Groom's Representatives</h4>
                  <ul className="space-y-4 text-wine/70 font-serif italic text-lg opacity-80">
                    <li>K.S. Velsamy & Kuzhalvaai Mozhi</li>
                    <li>K.S. Kalimuthu & Murugalakshmi</li>
                    <li>K.S. Gomathinayagam & Ramalakshmi</li>
                    <li>K.S. Marimuthu & Muthumari</li>
                    <li>K.S. Manikandan & Sankaraselvi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-wine font-bold uppercase tracking-[0.3em] text-xs mb-8">Bride's Representatives</h4>
                  <ul className="space-y-4 text-wine/70 font-serif italic text-lg opacity-80">
                    <li>S. Chermakumar & Padmavathi</li>
                    <li>S. Senthil Arumugam & Vadivu Kala</li>
                    <li>S. Balakrishnan, B.E. (COMCAST, Chennai)</li>
                    <li>S. Sakthi Balakrishnan, B.Sc.</li>
                    <li>S. Malliga Durga, B.E.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Business Partners Section */}
            <section className="py-16 md:py-24 w-full max-w-5xl mx-auto px-6 text-center relative z-20">
              <ScrollReveal>
                <div className="p-8 md:p-12 border border-white/60 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                  <h4 className="text-[10px] uppercase tracking-[0.5em] text-wine/30 mb-8">Special Thanks to</h4>
                  <div className="flex flex-wrap justify-center gap-12 text-wine/60 font-serif italic text-xl">
                    <span>Meena Jewellers</span>
                    <span className="text-gold/30">•</span>
                    <span>Sri Malliga Jewellers</span>
                    <span className="text-gold/30">•</span>
                    <span>APK Groups</span>
                    <span className="text-gold/30">•</span>
                    <span>Mahes Jewellers</span>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Motif Section */}
            <section className="w-full relative py-24 md:py-48 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                <ScrollReveal>
                  <div className="relative p-8 md:p-16 border border-white/60 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
                      <img src={branchTL} alt="decor" className="w-32 h-32 md:w-64 md:h-64 mix-blend-multiply" />
                    </div>
                    <h2 className="text-luxury text-4xl md:text-6xl mb-8 md:mb-12">Sacred <br /> Beginnings</h2>
                    <p className="text-serif text-xl leading-relaxed text-wine/70 italic">
                      As we exchange our vows in the coastal breeze of Thoothukudi,
                      we invite you to witness the sparkle of our new beginning.
                      Enriched by tradition and guided by love, this ceremony marks the first step of our eternal journey.
                    </p>
                    <motion.div
                      className="mt-12 flex items-center gap-4 text-wine font-display tracking-widest text-xs uppercase"
                    >
                      Blessings of the Divine <Heart size={16} className="text-rose" />
                    </motion.div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="aspect-[3/4] max-w-md mx-auto rounded-t-full overflow-hidden border-4 border-white shadow-2xl group">
                    <img
                      src={coupleImg}
                      alt="Wedding Moment"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* RSVP / Short Version Section */}
            <section className="py-32 md:py-64 w-full flex justify-center px-6 relative z-20">
              <ScrollReveal>
                <div className="max-w-4xl w-full border border-white/60 p-8 md:p-32 bg-white/50 backdrop-blur-2xl relative rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                  <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-wine/30">
                    <div className="w-8 md:w-12 h-px bg-current" />
                    <Sparkles size={14} />
                    <div className="w-8 md:w-12 h-px bg-current" />
                  </div>

                  <div className="text-center mt-4 md:mt-0 mb-12 md:mb-20">
                    <h2 className="text-display text-3xl md:text-5xl text-wine mb-4 md:mb-8 tracking-[0.2em] font-light uppercase">Contact Us</h2>
                    <div className="space-y-2 text-wine/60 font-bold tracking-widest">
                      <p>94431 24837</p>
                      <p>94430 24226</p>
                      <p>96293 68626</p>
                    </div>
                  </div>

                  <form className="space-y-16 max-w-xl mx-auto">
                    <input
                      type="text"
                      placeholder="FULL NAME"
                      className="w-full bg-transparent border-b border-wine/10 py-6 text-xl text-center focus:outline-none focus:border-wine/40 transition-colors text-wine placeholder:text-wine/20 uppercase tracking-[0.3em] font-light"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <select className="w-full bg-transparent border-b border-wine/10 py-6 text-base text-center appearance-none cursor-pointer text-wine/80 uppercase tracking-[0.2em] font-light">
                        <option>1 GUEST</option>
                        <option>2 GUESTS</option>
                        <option>FAMILY</option>
                      </select>
                      <select className="w-full bg-transparent border-b border-wine/10 py-6 text-base text-center appearance-none cursor-pointer text-wine/80 uppercase tracking-[0.2em] font-light">
                        <option>ATTENDING</option>
                        <option>REGRETFULLY ABSENT</option>
                      </select>
                    </div>

                    <motion.button
                      whileHover={{ backgroundColor: "#800020", color: "white" }}
                      className="w-full border-2 border-wine/20 text-wine py-8 uppercase tracking-[0.6em] transition-all duration-700 text-xs font-bold rounded-full"
                    >
                      Send Blessing
                    </motion.button>
                  </form>
                </div>
              </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="py-24 md:py-48 w-full max-w-5xl mx-auto px-6 block text-center relative z-20">
              <ScrollReveal>
                <div className="p-8 md:p-24 border border-white/60 bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                  <div className="text-luxury text-2xl md:text-3xl mb-4 italic opacity-80">Ramasubramanian <br className="block md:hidden" />& Malliga Priyadharshini</div>
                  <p className="text-[8px] md:text-[10px] tracking-[0.8em] md:tracking-[1.2em] text-wine/40 uppercase mb-8 ml-[0.8em] md:ml-[1.2em]">Sacred Union • Eternal Joy</p>
                  <div className="flex justify-center gap-8 md:gap-12 text-rose/40">
                    <Music size={20} />
                    <Heart size={20} fill="currentColor" />
                    <Sparkles size={20} />
                  </div>
                  <div className="mt-12 md:mt-24 flex justify-center gap-16 md:gap-32 opacity-10">
                    <img src={petalImg} className="w-8 h-8 md:w-12 md:h-12 mix-blend-multiply" />
                    <img src={petalImg} className="w-8 h-8 md:w-12 md:h-12 mix-blend-multiply -scale-x-100" />
                  </div>
                </div>
              </ScrollReveal>
            </footer>

          </main>

          <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-rose z-[100] origin-left shadow-[0_0_10px_rgba(229,115,115,0.5)]"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
