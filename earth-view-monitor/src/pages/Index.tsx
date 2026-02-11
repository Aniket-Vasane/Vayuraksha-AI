import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Satellite, Radio, BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Satellite,
    title: "Satellite Data",
    desc: "NASA MERRA-2 aerosol optical depth retrievals for regional pollution estimation",
  },
  {
    icon: Radio,
    title: "Ground Sensors",
    desc: "CPCB ground-level PM10 and AQI monitoring stations across Indian cities",
  },
  {
    icon: BrainCircuit,
    title: "AI Models",
    desc: "Machine learning models fuse multi-source data for prediction and analysis",
  },
];

// Particle dots for hero background
const dots = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 4,
}));

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden atmosphere-gradient">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay" />
        {/* Topo pattern */}
        <div className="absolute inset-0 topo-pattern" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full bg-earth-glow/30"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              Research-grade environmental intelligence
            </motion.div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              AI-Based Air Pollution Monitoring for{" "}
              <span className="text-accent">Sustainable Development</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Integrating satellite remote sensing, ground-station observations, and
              machine learning to monitor, predict, and mitigate urban air pollution
              across India.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold"
              >
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border/50 font-body"
              >
                <Link to="/prediction">Try AI Prediction</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="relative border-t border-border/50 bg-card py-24">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-center text-3xl font-semibold text-foreground"
          >
            Multi-Source Data Fusion
          </motion.h2>
          <p className="mt-3 text-center text-muted-foreground">
            Three data pillars powering actionable pollution intelligence
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative rounded-xl border border-border/50 bg-muted/30 p-8 transition-colors hover:border-accent/30 hover:bg-muted/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-earth-glow transition-colors group-hover:bg-accent/20 group-hover:text-accent">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.desc}
                </p>
                {i < pillars.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-muted-foreground/30 md:block">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
