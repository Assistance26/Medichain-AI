import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, Shield, Clock } from "lucide-react";

function HomePage() {
    const location = useLocation();
    console.log("hello we are in ai Doctor page");

    const ques = location.state?.initialMessage;
    console.log(ques);
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-center px-6 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-blue-200 rounded-full"
                        initial={{ 
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0
                        }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* Floating Icons */}
            <motion.div
                className="absolute top-10 right-10"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Brain className="w-12 h-12 text-blue-500" />
            </motion.div>

            <motion.div
                className="absolute bottom-20 left-10"
                animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            >
                <Sparkles className="w-12 h-12 text-yellow-500" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                {/* Hero Section */}
                <motion.h1 
    initial={{ opacity: 0, y: -20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.6 }}
    className="text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg"
>
    Your AI Health Assistant 🤖
</motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2, duration: 0.6 }} 
                    className="text-xl text-gray-700 max-w-2xl mb-8 leading-relaxed"
                >
                    Get instant answers to your health questions, personalized advice, and expert medical insights.
                </motion.p>

                {/* Feature Cards */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                    {[
                        {
                            icon: <Clock className="w-8 h-8 text-blue-500" />,
                            title: "24/7 Access",
                            description: "Get medical information anytime, anywhere"
                        },
                        {
                            icon: <Brain className="w-8 h-8 text-purple-500" />,
                            title: "AI-Powered",
                            description: "Advanced AI technology for accurate responses"
                        },
                        {
                            icon: <Shield className="w-8 h-8 text-indigo-500" />,
                            title: "Evidence-Based",
                            description: "Reliable medical information and advice"
                        },
                        {
                            icon: <Sparkles className="w-8 h-8 text-blue-500" />,
                            title: "Personalized",
                            description: "Tailored health guidance for your needs"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                            className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                {feature.icon}
                                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                            </div>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/chatbot" state={{initialMessage: ques
                    }}>
                        <button className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg overflow-hidden transition-all duration-300">
                            <span className="relative z-10">Start Chatting with AI →</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default HomePage;