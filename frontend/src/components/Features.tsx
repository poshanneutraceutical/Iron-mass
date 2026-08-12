import {
  Dumbbell,
  ShieldCheck,
  Zap,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Muscle Growth",
    desc: "Scientifically formulated supplements engineered to maximize lean muscle gains and accelerate recovery.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    desc: "Manufactured in certified facilities using premium ingredients with strict quality control standards.",
  },
  {
    icon: Zap,
    title: "Peak Performance",
    desc: "Increase strength, endurance and workout intensity with advanced performance nutrition.",
  },
  {
    icon: Trophy,
    title: "Champion's Choice",
    desc: "Designed for athletes, bodybuilders and fitness enthusiasts who refuse to settle for average.",
  },
];

export default function Features() {
  return (
    <section

    className="relative py-24 bg-[#090909] overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.10),transparent_60%)]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                data-reveal
                data-delay={index * 100}
                className="
                  reveal
                  group
                  rounded-3xl
                  border
                  border-[#d4af37]/20
                  bg-[#111111]
                  p-8
                  hover:border-[#d4af37]
                  hover:-translate-y-2
                  transition-all
                  duration-200
                  hover:shadow-[0_0_35px_rgba(212,175,55,0.18)]
                "
              >

                <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition-all duration-250">

                  <Icon
                    size={30}
                    className="text-[#d4af37] group-hover:text-black transition-colors"
                  />

                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#d4af37] transition-colors">

                  {feature.title}

                </h3>

                <p className="text-gray-400 leading-7">

                  {feature.desc}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}