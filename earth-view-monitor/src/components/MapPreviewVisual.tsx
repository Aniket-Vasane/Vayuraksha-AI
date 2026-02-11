import { motion } from "framer-motion";

const MapPreviewVisual = () => {
    return (
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white border-2 border-primary shadow-[10px_10px_0px_0px_rgba(24,24,27,1)] p-8">
            {/* Grid Background - Engineering Graph Paper Style */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            {/* Abstract Map shapes (Outlines) */}
            <svg className="absolute inset-0 w-full h-full text-primary/10" fill="currentColor">
                {/* Simplified India-like shape or abstract landmass */}
                <path d="M150,100 Q200,50 250,100 T350,150 T400,250 T300,350 T200,400 T100,300 T150,100 Z" transform="scale(1.2)" />
            </svg>

            {/* Connecting Data Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M 120 150 L 280 150 L 320 280"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M 320 280 L 180 320 L 120 150"
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* Pulsing Hotspots (Orange for Solid Aesthetic) */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-[30%] left-[30%] w-4 h-4 bg-accent rounded-full border-2 border-white z-10"
            />
            <div className="absolute top-[30%] left-[30%] w-4 h-4 rounded-full bg-accent/20 animate-ping" />

            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-[60%] right-[30%] w-3 h-3 bg-primary rounded-full border-2 border-white z-10"
            />

            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-[30%] left-[40%] w-3 h-3 bg-accent rounded-full border-2 border-white z-10"
            />

            {/* Scanning Bar (Solid, Technical) */}
            <motion.div
                className="absolute left-0 right-0 h-[2px] bg-accent z-20"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute right-0 -top-1 px-1 bg-accent text-[8px] font-bold text-white leading-none">SCANNING</div>
            </motion.div>

            {/* Floating Info Card (Technical Style) */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-white border-2 border-primary p-3 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] z-30"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent flex items-center justify-center text-white font-bold text-xs border border-primary">
                        AI
                    </div>
                    <div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Detection</div>
                        <div className="text-sm font-bold text-primary">PM 2.5 High</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MapPreviewVisual;
