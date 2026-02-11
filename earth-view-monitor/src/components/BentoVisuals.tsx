import { motion } from "framer-motion";

export const SatelliteVisual = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            {/* Radar Circles - Solid Lines */}
            <div className="absolute w-[180%] h-[180%] border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[140%] h-[140%] border border-primary/20 rounded-full animate-[spin_25s_linear_infinite_reverse] border-dashed" />
            <div className="absolute w-[100%] h-[100%] border border-primary/30 rounded-full" />

            {/* Scanning Line - Solid Amber */}
            <div className="absolute w-[50%] h-[2px] bg-accent left-[50%] top-[50%] origin-left animate-[spin_4s_linear_infinite]" />

            {/* Blips - Solid Dots */}
            <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/3 left-1/3 w-3 h-3 bg-primary rounded-full"
            />
            <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-accent rounded-full"
            />
        </div>
    );
};

export const SensorVisual = () => {
    return (
        <div className="absolute inset-0 flex items-end justify-center gap-3 pb-8 px-8 opacity-80 group-hover:opacity-100 transition-opacity">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: [`${20 + Math.random() * 30}%`, `${40 + Math.random() * 50}%`, `${20 + Math.random() * 30}%`]
                    }}
                    transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1
                    }}
                    className="w-full bg-primary rounded-t-sm" // Solid Black bars
                />
            ))}
        </div>
    );
};

export const NeuralVisual = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full text-primary">
                <motion.line
                    x1="10%" y1="10%" x2="50%" y2="50%"
                    stroke="currentColor" strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.line
                    x1="90%" y1="20%" x2="50%" y2="50%"
                    stroke="currentColor" strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.line
                    x1="20%" y1="90%" x2="50%" y2="50%"
                    stroke="currentColor" strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.0 }}
                />
            </svg>

            {/* Nodes - Solid Dots */}
            <div className="absolute top-[10%] left-[10%] w-3 h-3 bg-primary rounded-full" />
            <div className="absolute top-[20%] right-[10%] w-3 h-3 bg-primary rounded-full" />
            <div className="absolute bottom-[10%] left-[20%] w-3 h-3 bg-primary rounded-full" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-accent rounded-full animate-pulse" />
        </div>
    );
};
