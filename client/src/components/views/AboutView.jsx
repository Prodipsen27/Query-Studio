import React from 'react';
import { Sparkles, BarChart3, Database, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="glass-card p-8 rounded-3xl space-y-4 hover:border-primary/20 transition-all group">
    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>

    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const AboutView = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-20 py-10 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
          <Sparkles size={12} />
          Analytical Luminary v2.1
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          The Future of <span className="text-gradient">Data Intelligence</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          QueryCart is an enterprise-grade AI analytics platform that bridges the gap between natural language and complex database structures.
        </p>
      </section>

      {/* Grid Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Zap}
          title="Neural SQL Engine"
          description="Leverage state-of-the-art LLMs to transform your conversational questions into optimized, production-ready SQL queries instantly."
        />
        <FeatureCard 
          icon={BarChart3}
          title="Dynamic Visuals"
          description="Automatic data mapping determines the best visualization strategy—from time-series velocity to categorical distributions."
        />
        <FeatureCard 
          icon={Database}
          title="Direct Integration"
          description="Connect securely to your PostgreSQL, MySQL, or Snowflake clusters with zero data movement—query where your data lives."
        />
        <FeatureCard 
          icon={ShieldCheck}
          title="Enterprise Security"
          description="Military-grade encryption and granular role-based access controls ensure your sensitive business data remains confidential."
        />
        <FeatureCard 
          icon={Zap}
          title="Sub-second Latency"
          description="Our optimized execution layer ensures that even complex analytical queries return results in milliseconds, not minutes."
        />
        <FeatureCard 
          icon={Sparkles}
          title="AI Insights"
          description="Beyond raw data, we provide automated pattern recognition and anomaly detection to help you find the 'why' behind the numbers."
        />
      </section>

      {/* Mission Section */}
      <section className="glass-card p-10 md:p-16 rounded-[3rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-8">

          <h2 className="text-3xl font-bold text-white max-w-xl">
            Democratizing data access for every member of your organization.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            We believe that you shouldn't need a degree in data science to understand how your business is performing. Our mission is to make data exploration as simple as sending a message.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              100% Privacy Focused
            </div>
            <div className="flex items-center gap-2 text-primary font-bold">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Open API Architecture
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <h3 className="text-xl font-bold text-white mb-6">Ready to explore?</h3>
        <button 
          className="px-8 py-4 bg-primary hover:opacity-90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto"
          onClick={() => window.location.reload()} // Quick jump back to studio (hacky but works for this demo)
        >
          Start Analyzing <ArrowRight size={18} />
        </button>
      </section>

    </div>
  );
};

export default AboutView;
