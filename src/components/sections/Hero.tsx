"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BowlingStage } from "@/components/experience/BowlingStage";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const headline = ["LET’S", "ROLL", "TOGETHER"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div className="absolute -inset-[12%] motion-reduce:inset-0 motion-reduce:transform-none" style={{ y }}>
        <Image
          src="/images/hero.jpg"
          alt="Bowling lanes at Leisure City Bowling Club in Jinnah Park"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover opacity-70"
          style={{ objectPosition: "center 35%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/62 to-navy" />
      </motion.div>
      <div className="container-page relative z-10 grid items-center gap-8 py-24 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:min-h-[86svh] lg:gap-10 lg:py-32">
        <div className="max-w-xl">
          <p className="eyebrow">Jinnah Park · Family bowling</p>
          <h1 className="hero-title mt-3">
            <span className="sr-only">Let’s roll together</span>
            <span aria-hidden="true">
              {headline.map((word, index) => (
                <span key={word} className={index === 2 ? "word text-gradient" : "word"} style={{ animationDelay: `${index * 90}ms` }}>
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-7 text-ink/85 md:text-base md:leading-7">
            Leisure City Bowling Club. Games, gatherings and birthday visits in Jinnah Park, Rawalpindi.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Magnetic>
              <Button href="/book-now">
                Book your game <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Magnetic>
            <Button href="/experience" variant="secondary">
              Explore our experience
            </Button>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            Bookings are WhatsApp requests. A game is confirmed only when the club replies.
          </p>
        </div>
        <div className="relative hidden lg:block">
          <BowlingStage />
        </div>
      </div>
    </section>
  );
}
