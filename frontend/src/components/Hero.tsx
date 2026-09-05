import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Zap,
  Star,
  Award,
} from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -70,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 70,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050505]"
    >
      {/* ========================= */}
      {/* Premium Background */}
      {/* ========================= */}

      <div className="absolute inset-0">

        {/* Background Image */}

        <img
          src="/hero-bg.jpg"
          alt="IronMass Athlete"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/75" />

        {/* Gold Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        {/* Gold Glow */}

        <div className="absolute -left-40 top-20 h-[650px] w-[650px] rounded-full bg-[#d4af37]/10 blur-[170px]" />

        <div className="absolute right-0 bottom-0 h-[550px] w-[550px] rounded-full bg-[#d4af37]/10 blur-[170px]" />

        {/* Noise */}

        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]" />

      </div>

      {/* Grid */}

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-36 pb-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
                      {/* Label */}

                      <motion.div
                        custom={0}
                        variants={fadeLeft}
                        className="flex items-center gap-4 mb-8"
                      >
                        <div className="w-16 h-[2px] bg-[#d4af37]" />

                        <span className="uppercase tracking-[0.45em] text-[#d4af37] text-sm font-semibold">
                          PREMIUM SPORTS NUTRITION
                        </span>
                      </motion.div>

                      {/* Main Heading */}

                      <motion.h1
                        custom={0.15}
                        variants={fadeUp}
                        className="text-6xl md:text-7xl xl:text-8xl font-black uppercase leading-[0.9]"
                      >
                        <span className="text-white">
                          UNLEASH
                        </span>

                        <br />

                        <span className="text-[#d4af37]">
                          YOUR
                          STRENGTH
                        </span>
                      </motion.h1>

                      {/* Description */}

                      <motion.p
                        custom={0.25}
                        variants={fadeUp}
                        className="mt-8 max-w-xl text-lg leading-9 text-gray-300"
                      >
                        Iron Mass delivers elite sports nutrition engineered
                        for athletes, bodybuilders and fitness enthusiasts
                        who demand uncompromising quality, explosive strength,
                        superior endurance and maximum muscle recovery.
                        Every formula is crafted using premium ingredients,
                        scientifically backed dosages and world-class
                        manufacturing standards.
                      </motion.p>

                      {/* CTA Buttons */}

                      <motion.div
                        custom={0.35}
                        variants={fadeUp}
                        className="flex flex-wrap gap-5 mt-12"
                      >
                        <a
                          href="#arsenal"
                          className="
                            group
                            inline-flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-[#d4af37]
                            px-8
                            py-4
                            font-bold
                            uppercase
                            tracking-widest
                            text-black
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:shadow-[0_0_40px_rgba(212,175,55,.35)]
                          "
                        >
                          Explore Products

                          <ArrowRight
                            size={18}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </a>

                        <a
                          href="#story"
                          className="
                            inline-flex
                            items-center
                            rounded-xl
                            border
                            border-[#d4af37]/30
                            px-8
                            py-4
                            font-semibold
                            uppercase
                            tracking-widest
                            text-white
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:border-[#d4af37]
                            hover:bg-[#d4af37]/10
                          "
                        >
                          Learn More
                        </a>
                      </motion.div>

                      {/* Premium Feature Cards */}

                      <motion.div
                        custom={0.45}
                        variants={fadeUp}
                        className="grid sm:grid-cols-2 gap-6 mt-14"
                      >

                        <div
                          className="
                            rounded-3xl
                            border
                            border-[#d4af37]/20
                            bg-white/[0.04]
                            backdrop-blur-xl
                            p-6
                          "
                        >

                          <div className="w-14 h-14 rounded-2xl bg-[#d4af37] flex items-center justify-center text-black mb-5">

                            <ShieldCheck size={28} />

                          </div>

                          <h3 className="text-xl font-bold text-white mb-3">
                            Certified Quality
                          </h3>

                          <p className="text-gray-400 leading-7">
                            Every batch undergoes strict laboratory testing
                            to ensure purity, safety and premium performance.
                          </p>

                        </div>

                        <div
                          className="
                            rounded-3xl
                            border
                            border-[#d4af37]/20
                            bg-white/[0.04]
                            backdrop-blur-xl
                            p-6
                          "
                        >

                          <div className="w-14 h-14 rounded-2xl bg-[#d4af37] flex items-center justify-center text-black mb-5">

                            <Zap size={28} />

                          </div>

                          <h3 className="text-xl font-bold text-white mb-3">
                            Maximum Performance
                          </h3>

                          <p className="text-gray-400 leading-7">
                            Engineered for explosive strength,
                            endurance, recovery and elite athletic
                            performance.
                          </p>

                        </div>

                      </motion.div>

                    </motion.div>

                    {/* RIGHT CONTENT */}

                    <motion.div
                      custom={0.2}
                      variants={fadeRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative hidden lg:flex justify-center items-center min-h-[760px]"
                    >
                                {/* Premium Gold Glow */}

                                <div className="absolute w-[650px] h-[650px] rounded-full bg-[#d4af37]/15 blur-[170px]" />

                                {/* Floating Background Ring */}

                                <motion.div
                                  animate={{
                                    rotate: 360,
                                  }}
                                  transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="
                                    absolute
                                    w-[560px]
                                    h-[560px]
                                    rounded-full
                                    border
                                    border-[#d4af37]/10
                                  "
                                />

                                {/* Main Athlete */}

                                <motion.img
                                  src="/assets/images/gym.png.jpeg"
                                  alt="IronMass Athlete"
                                  custom={0.3}
                                  variants={fadeRight}
                                  animate={{
                                    y: [0, -12, 0],
                                  }}
                                  transition={{
                                    y: {
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    },
                                  }}
                                  className="
                                    relative
                                    z-10
                                    max-h-[760px]
                                    object-contain
                                    drop-shadow-[0_0_70px_rgba(212,175,55,.25)]
                                  "
                                />

                                {/* Floating Card - Premium */}

                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    x: -50,
                                  }}
                                  whileInView={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  transition={{
                                    delay: 0.7,
                                    duration: 0.8,
                                  }}
                                  className="
                                    absolute
                                    left-0
                                    top-28
                                    rounded-3xl
                                    border
                                    border-[#d4af37]/20
                                    bg-[#111111]/80
                                    backdrop-blur-xl
                                    p-6
                                    shadow-2xl
                                  "
                                >

                                  <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37] flex items-center justify-center">

                                      <Award
                                        className="text-black"
                                        size={28}
                                      />

                                    </div>

                                    <div>

                                      <h3 className="text-white font-bold text-lg">
                                        Premium Formula
                                      </h3>

                                      <p className="text-sm text-gray-400">
                                        Scientifically Engineered
                                      </p>

                                    </div>

                                  </div>

                                </motion.div>

                                {/* Floating Card - Trusted */}

                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    x: 50,
                                  }}
                                  whileInView={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  transition={{
                                    delay: 0.9,
                                    duration: 0.8,
                                  }}
                                  className="
                                    absolute
                                    right-0
                                    bottom-24
                                    rounded-3xl
                                    border
                                    border-[#d4af37]/20
                                    bg-[#111111]/80
                                    backdrop-blur-xl
                                    p-6
                                    shadow-2xl
                                  "
                                >

                                  <div className="flex items-center gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-[#d4af37] flex items-center justify-center">

                                      <Star
                                        className="text-black"
                                        size={28}
                                      />

                                    </div>

                                    <div>

                                      <h3 className="text-white font-bold text-lg">
                                        Trusted Brand
                                      </h3>

                                      <p className="text-sm text-gray-400">
                                        Athletes Across India
                                      </p>

                                    </div>

                                  </div>

                                </motion.div>

                              </motion.div>

                            </div>

                            {/* Premium Statistics */}

                            <motion.div
                              initial="hidden"
                              whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                              className="
                                grid
                                grid-cols-2
                                lg:grid-cols-4
                                gap-6
                                mt-24
                              "
                            >
                                      {[
                                        {
                                          number: "25+",
                                          label: "Premium Products",
                                        },
                                        {
                                          number: "100%",
                                          label: "Quality Tested",
                                        },
                                        {
                                          number: "50K+",
                                          label: "Happy Customers",
                                        },
                                        {
                                          number: "24/7",
                                          label: "Customer Support",
                                        },
                                      ].map((item, index) => (
                                        <motion.div
                                          key={item.label}
                                          custom={index}
                                          variants={fadeUp}
                                          className="
                                            relative
                                            overflow-hidden
                                            rounded-3xl
                                            border
                                            border-[#d4af37]/20
                                            bg-[#111111]/70
                                            backdrop-blur-xl
                                            p-8
                                            text-center
                                            group
                                          "
                                        >

                                          {/* Hover Glow */}

                                          <div
                                            className="
                                              absolute
                                              inset-0
                                              opacity-0
                                              group-hover:opacity-100
                                              transition-opacity
                                              duration-300
                                              bg-[radial-gradient(circle_at_center,rgba(212,175,55,.12),transparent_70%)]
                                            "
                                          />

                                          <h2
                                            className="
                                              relative
                                              text-5xl
                                              font-black
                                              text-[#d4af37]
                                            "
                                          >
                                            {item.number}
                                          </h2>

                                          <p
                                            className="
                                              relative
                                              mt-3
                                              text-xs
                                              uppercase
                                              tracking-[0.35em]
                                              text-gray-400
                                            "
                                          >
                                            {item.label}
                                          </p>

                                        </motion.div>
                                      ))}

                                    </motion.div>

                                  </div>

                                  {/* Bottom Fade */}

                                  <div
                                    className="
                                      absolute
                                      bottom-0
                                      left-0
                                      right-0
                                      h-40
                                      bg-gradient-to-t
                                      from-[#0b0b0b]
                                      via-[#0b0b0b]/70
                                      to-transparent
                                      z-20
                                    "
                                  />

                                  {/* Scroll Indicator */}

                                  <motion.a
                                    href="#arsenal"
                                    initial={{
                                      opacity: 0,
                                      y: 20,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: [0, 8, 0],
                                    }}
                                    transition={{
                                      delay: 0.8,
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                    className="
                                      absolute
                                      bottom-8
                                      left-1/2
                                      -translate-x-1/2
                                      z-30
                                      flex
                                      flex-col
                                      items-center
                                      gap-2
                                      text-white/70
                                      hover:text-[#d4af37]
                                      transition-colors
                                    "
                                  >

                                    <span
                                      className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.45em]
                                        font-semibold
                                      "
                                    >
                                      Scroll
                                    </span>

        <ChevronDown
          size={22}
          className="text-[#d4af37]"
        />
      </motion.a>
    </section>
  );
}