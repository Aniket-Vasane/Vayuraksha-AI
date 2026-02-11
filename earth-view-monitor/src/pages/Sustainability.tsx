import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Radar, Building2, Scale, Target } from "lucide-react";

const insights = [
  {
    icon: Radar,
    title: "Early Pollution Detection",
    desc: "Satellite-based aerosol monitoring enables early warning systems that detect pollution events days before ground stations register spikes — critical for public health advisories.",
  },
  {
    icon: Building2,
    title: "Sustainable Urban Planning",
    desc: "Data-driven spatial analysis of pollution hotspots informs green corridor placement, traffic rerouting, and industrial zoning decisions for cleaner city design.",
  },
  {
    icon: Scale,
    title: "Environmental Policy Support",
    desc: "Rigorous, multi-source evidence empowers policymakers to draft targeted air quality regulations backed by satellite and ground-truth validation.",
  },
];

const sdgs = [
  {
    number: 11,
    title: "Sustainable Cities and Communities",
    color: "hsl(33 90% 55%)",
    desc: "Making cities inclusive, safe, resilient, and sustainable through pollution intelligence.",
  },
  {
    number: 13,
    title: "Climate Action",
    color: "hsl(153 55% 35%)",
    desc: "Urgent action to combat climate change by monitoring atmospheric pollutants at scale.",
  },
];

const Sustainability = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Sustainability Insights
          </h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            How AI-driven pollution monitoring supports the United Nations Sustainable
            Development Goals
          </p>
        </motion.div>

        {/* Insight Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm transition-colors hover:border-accent/30">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-earth-glow">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* SDG Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              UN Sustainable Development Goals
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sdgs.map((sdg, i) => (
              <motion.div
                key={sdg.number}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="h-1.5" style={{ backgroundColor: sdg.color }} />
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg font-heading text-xl font-bold text-white"
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.number}
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-foreground">
                          SDG {sdg.number}: {sdg.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {sdg.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sustainability;
