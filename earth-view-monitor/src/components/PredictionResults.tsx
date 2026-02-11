import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Wind,
    Droplets,
    Thermometer,
    Activity,
    AlertTriangle,
    Smile,
    Frown,
    Skull,
    CloudFog,
} from "lucide-react";

interface PredictionResultsProps {
    data: any;
    loading: boolean;
}

const getAQIIcon = (category: string) => {
    switch (category) {
        case "Good":
        case "Satisfactory":
            return <Smile className="h-12 w-12 text-white" />;
        case "Moderate":
        case "Poor":
            return <Frown className="h-12 w-12 text-white" />;
        case "Very Poor":
        case "Severe":
            return <Skull className="h-12 w-12 text-white" />;
        default:
            return <Activity className="h-12 w-12 text-white" />;
    }
};

const getAQIColor = (category: string) => {
    switch (category) {
        case "Good":
            return "bg-green-500";
        case "Satisfactory":
            return "bg-emerald-500";
        case "Moderate":
            return "bg-yellow-500";
        case "Poor":
            return "bg-orange-500";
        case "Very Poor":
            return "bg-red-500";
        case "Severe":
            return "bg-rose-900";
        default:
            return "bg-gray-500";
    }
};

const PredictionResults = ({ data, loading }: PredictionResultsProps) => {
    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4 p-8 min-h-[400px]">
                <div className="relative">
                    <div className="h-16 w-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Wind className="h-6 w-6 text-accent/50 animate-pulse" />
                    </div>
                </div>
                <p className="text-muted-foreground animate-pulse text-sm">
                    Analyzing atmospheric composition...
                </p>
            </div>
        );
    }

    if (!data) return null;

    const { predictions, aqi_category, health_advice } = data;
    const aqiColor = getAQIColor(aqi_category);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Main AQI Card */}
            <motion.div variants={item}>
                <Card className={`border-none shadow-lg overflow-hidden relative ${aqiColor}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <CardContent className="p-6 text-white relative z-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-white/80 font-medium mb-1">Air Quality Index</p>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-6xl font-bold tracking-tight">
                                        {predictions.aqi}
                                    </h2>
                                    <span className="text-xl font-medium opacity-90">AQI</span>
                                </div>
                                <Badge className="mt-3 bg-white/20 hover:bg-white/30 text-white border-none text-sm px-3 py-1 backdrop-blur-md">
                                    {aqi_category}
                                </Badge>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                                {getAQIIcon(aqi_category)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Health Advice */}
            <motion.div variants={item}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            Health Impact
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">{health_advice}</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Pollutant Breakdown */}
            <motion.div variants={item}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <CloudFog className="h-4 w-4" />
                            Pollutant Breakdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(predictions).map(([key, value]: [string, any]) => {
                            if (key === "aqi") return null;
                            return (
                                <div
                                    key={key}
                                    className="bg-background/50 p-3 rounded-lg border border-border/30 hover:border-border/60 transition-colors"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold uppercase text-muted-foreground">
                                            {key}
                                        </span>
                                        <span className="text-sm font-bold">{value}</span>
                                    </div>
                                    <Progress value={Math.min((value / 500) * 100, 100)} className="h-1" />
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default PredictionResults;
