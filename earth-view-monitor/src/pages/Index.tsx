import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Satellite,
  Radio,
  BrainCircuit,
  ArrowRight,
  Wind,
  Map as MapIcon,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SatelliteVisual, SensorVisual, NeuralVisual } from "@/components/BentoVisuals";
import MapPreviewVisual from "@/components/MapPreviewVisual";

const features = [
  {
    icon: Satellite,
    title: "Orbital Intelligence",
    desc: "Real-time aerosol optical depth data from NASA MERRA-2 satellites.",
    color: "bg-white",
    text: "text-primary",
    delay: 0.1,
    Visual: SatelliteVisual,
  },
  {
    icon: Radio,
    title: "Ground-Truth Sensors",
    desc: "Precision calibrated PM10 & PM2.5 readings from CPCB stations.",
    color: "bg-white",
    text: "text-primary",
    delay: 0.2,
    Visual: SensorVisual,
  },
  {
    icon: BrainCircuit,
    title: "Neural Forecasting",
    desc: "Advanced ML models fusing multi-modal data for hyper-local prediction.",
    color: "bg-white",
    text: "text-primary",
    delay: 0.3,
    Visual: NeuralVisual,
  },
];

const Index = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
        {/* Minimal Grid Background - Increased Opacity for Visibility */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.07)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Solid Abstract Shapes */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full border-[20px] border-secondary/50"
        />
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full border-[40px] border-secondary/30"
        />

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-5 mt-10 inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-widest uppercase bg-primary text-white"
            >
              Vayuraksha AI v2.0
            </motion.div>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-primary leading-[0.9]">
              Breathe <br />
              <span className="text-accent underline decoration-4 decoration-primary underline-offset-8">Smarter.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-body">
              The definitive platform for hyper-local air quality intelligence. Precision monitoring meets neural forecasting.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-lg bg-primary text-white hover:bg-accent hover:text-white rounded-none transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,1)]"
              >
                <Link to="/prediction">
                  Launch Engine
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-10 text-lg border-2 border-primary bg-transparent text-primary hover:bg-accent rounded-none transition-all duration-300"
              >
                <Link to="/dashboard">
                  <Globe className="mr-2 h-5 w-5 " />
                  Global Data
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features - Solid Style */}
      <section className="py-32 relative z-10 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left mb-16 border-l-4 border-accent pl-6"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
              Hard Science.
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl font-body">
              Analyzing millions of data points every second with research-grade accuracy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[500px]">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                className={`group relative flex flex-col justify-end p-8 border-2 border-primary 
        ${i === 1
                    ? "shadow-[12px_12px_0px_0px_rgba(249,115,22,1)]"
                    : "bg-white shadow-[8px_8px_0px_0px_rgba(24,24,27,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(249,115,22,1)]"
                  }
        transition-all duration-300 overflow-hidden min-h-[400px]`}
              >
                {/* Visual Background */}
                <feature.Visual />

                <div className="relative z-10 pointer-events-none">
                  <div
                    className={`mb-6 inline-flex p-3 border shadow-sm ${i === 1
                      ? "bg-white text-primary border-white"
                      : "bg-primary text-white border-primary"
                      }`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>

                  <h3
                    className={`font-heading text-3xl font-bold mb-3 tracking-tight ${i === 1 ? "bg-accent" : "text-primary bg-accent"
                      }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`leading-relaxed text-base ${i === 1 ? "text-white bg-black px-1" : "text-muted-foreground"
                      }`}
                  >
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Map Preview Section */}
      <section className="py-32 bg-white border-y border-border relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-secondary text-primary border border-border">
                Visual Intelligence
              </div>
              <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 text-primary leading-tight">
                Map the <br />
                <span className="text-accent">Invisible.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-body">
                Our interactive 3D-accelerated map engine allows you to visualize air quality trends across the subcontinent with pinpoint precision.
              </p>

              <ul className="space-y-6 mb-10">
                {[
                  "Hyper-local AQI heatmaps",
                  "7-day predictive forecasting",
                  "Health-risk assessment layers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="h-2 w-2 bg-accent rotate-45" />
                    <span className="text-lg font-medium text-primary">{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="h-12 px-8 bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white rounded-none transition-colors">
                <Link to="/prediction">Live Map Demo <MapIcon className="ml-2 w-4 h-4" /></Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Map Preview Visual Component */}
              <MapPreviewVisual />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-primary text-white border-t border-primary">
        <div className="container px-4 text-center">
          <h3 className="font-heading text-3xl font-bold mb-6 tracking-tighter">Vayuraksha AI</h3>
          <p className="text-white/60 mb-10 max-w-md mx-auto">Empowering sustainable development through intelligence.</p>
          <div className="flex justify-center gap-10 text-sm font-medium tracking-wide">
            <a href="#" className="text-white/80 hover:text-accent transition-colors">PRIVACY</a>
            <a href="#" className="text-white/80 hover:text-accent transition-colors">TERMS</a>
            <a href="#" className="text-white/80 hover:text-accent transition-colors">DOCS</a>
          </div>
          <div className="mt-12 text-xs text-white/40 uppercase tracking-widest">
            © 2024 Vayuraksha AI. Engineered for Earth.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
