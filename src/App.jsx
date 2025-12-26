import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  ChevronRight, 
  Check, 
  LayoutDashboard, 
  Settings, 
  FileText, 
  CreditCard, 
  Monitor, 
  Menu, 
  X,
  ArrowRight,
  Plus,
  Trash2,
  Eye,
  Search,
  MessageSquare,
  Globe,
  Clock,
  Home,
  LogOut,
  ChevronDown
} from 'lucide-react';

// --- INITIAL DATA / CMS DEFAULTS ---
const INITIAL_CONTENT = {
  hero: {
    title: "Automate Your Growth with AI-Powered Intelligence",
    subtitle: "NexusFlow helps teams eliminate busywork and focus on high-impact decisions with autonomous workflows and real-time analytics.",
    cta: "Start Free Trial"
  },
  features: [
    { id: 1, title: "Smart Automation", desc: "Trigger complex workflows based on user behavior.", icon: <Zap /> },
    { id: 2, title: "Deep Analytics", desc: "Understand your churn and LTV with one click.", icon: <BarChart3 /> },
    { id: 3, title: "Enterprise Security", desc: "Bank-grade encryption for all your sensitive data.", icon: <Shield /> }
  ],
  pricing: [
    { id: 1, name: "Starter", price: "0", features: ["Up to 3 projects", "Basic Analytics", "Community Support"] },
    { id: 2, name: "Pro", price: "49", features: ["Unlimited projects", "Advanced AI Insights", "Priority Email Support", "Custom Branding"], popular: true },
    { id: 3, name: "Enterprise", price: "199", features: ["SLA Guarantee", "Dedicated Manager", "White-labeling", "API Access"] }
  ],
  blog: [
    { id: 1, title: "Why AI is the future of SaaS", excerpt: "Exploring the shift from tools to autonomous agents.", date: "Oct 24, 2023", author: "Alex Rivers" },
    { id: 2, title: "Scaling to 10k MRR", excerpt: "The exact framework we used to scale our user base.", date: "Nov 12, 2023", author: "Sarah Chen" },
    { id: 3, title: "Automation vs. Augmentation", excerpt: "Finding the balance in the modern workplace.", date: "Dec 05, 2023", author: "Alex Rivers" }
  ]
};

const BRAND_CONFIG = {
  primaryColor: 'indigo-600',
  fontFamily: 'sans',
  logoText: 'NexusFlow'
};

export default function App() {
  const [view, setView] = useState('landing'); 
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [brand, setBrand] = useState(BRAND_CONFIG);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  
  const leadSectionRef = useRef(null);

  const goHome = () => {
    setView('landing');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToLeads = () => {
    setView('landing');
    setIsMenuOpen(false);
    setTimeout(() => {
      leadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (emailInput) {
      setLeads([...leads, { email: emailInput, date: new Date().toLocaleDateString() }]);
      setEmailInput("");
      const msg = document.getElementById('success-toast');
      if (msg) {
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 3000);
      }
    }
  };

  // Shared Navbar Logic to handle both Public and Admin navigation
  const NavLinks = ({ className = "", onAction = () => {} }) => (
    <div className={className}>
      <button 
        onClick={() => { goHome(); onAction(); }} 
        className={`hover:text-indigo-600 transition font-medium ${view === 'landing' ? 'text-indigo-600' : 'text-slate-600'}`}
      >
        Home
      </button>
      <button 
        onClick={() => { setView('landing'); onAction(); setTimeout(() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'}), 100); }} 
        className="text-slate-600 hover:text-indigo-600 transition font-medium text-left"
      >
        Features
      </button>
      <button 
        onClick={() => { setView('landing'); onAction(); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}), 100); }} 
        className="text-slate-600 hover:text-indigo-600 transition font-medium text-left"
      >
        Pricing
      </button>
      <button 
        onClick={() => { setView('resources'); onAction(); }} 
        className={`hover:text-indigo-600 transition font-medium ${view === 'resources' ? 'text-indigo-600' : 'text-slate-600'}`}
      >
        Resources
      </button>
    </div>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <div id="success-toast" className="hidden fixed top-20 right-4 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-right-4">
        Success! Your trial access is on the way.
      </div>

      <nav className="fixed top-0 w-full z-[60] bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 cursor-pointer" onClick={goHome}>
            <Rocket className="w-6 h-6" />
            <span>{brand.logoText}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLinks className="flex gap-8" />
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
            <button onClick={() => setView('admin')} className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition text-sm font-medium">
              <LayoutDashboard size={16} /> Admin
            </button>
            <button onClick={scrollToLeads} className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 font-bold">
              {content.hero.cta}
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-6 space-y-4 absolute w-full left-0 shadow-2xl animate-in slide-in-from-top duration-200">
            <NavLinks className="flex flex-col gap-4" onAction={() => setIsMenuOpen(false)} />
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button onClick={() => {setView('admin'); setIsMenuOpen(false);}} className="flex items-center gap-2 text-slate-600 py-2 font-medium"><LayoutDashboard size={18} /> Admin Portal</button>
              <button onClick={scrollToLeads} className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold w-full text-center shadow-lg">{content.hero.cta}</button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {view === 'resources' ? (
          <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900">Resource Library</h1>
              <p className="text-slate-500 text-lg">Guides, insights, and updates from the NexusFlow team.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {content.blog.map(post => (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition group">
                  <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300">
                    <Monitor size={48} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase mb-3"><Clock size={12} /> {post.date}</div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="pt-4 border-t text-sm font-medium text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-[10px]">{post.author.charAt(0)}</div>
                      {post.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <header className="pt-40 pb-20 px-4 text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">{content.hero.title}</h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">{content.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={scrollToLeads} className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                  {content.hero.cta} <ArrowRight size={20} />
                </button>
              </div>
            </header>
            
            <section id="features" className="py-24 px-4 bg-white">
              <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                {content.features.map(f => (
                  <div key={f.id} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all hover:shadow-lg">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">{f.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                    <p className="text-slate-600">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section id="pricing" className="py-24 px-4 bg-slate-50">
              <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                {content.pricing.map(plan => (
                  <div key={plan.id} className={`p-8 rounded-3xl bg-white border ${plan.popular ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-200'}`}>
                    <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg font-normal text-slate-400">/mo</span></div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((ft, i) => <li key={i} className="flex items-center gap-2 text-slate-600 text-sm"><Check size={16} className="text-indigo-600" /> {ft}</li>)}
                    </ul>
                    <button onClick={scrollToLeads} className={`w-full py-3 rounded-xl font-bold ${plan.popular ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Get Started</button>
                  </div>
                ))}
              </div>
            </section>

            <section ref={leadSectionRef} className="py-24 px-4">
              <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[2.5rem] p-12 text-center text-white shadow-2xl">
                <h2 className="text-4xl font-bold mb-4">Start your trial today</h2>
                <p className="text-indigo-100 mb-8 max-w-md mx-auto">No credit card required. Cancel anytime.</p>
                <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" placeholder="Work email" className="flex-1 px-5 py-4 rounded-xl text-slate-900 outline-none" required value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition">Get Access</button>
                </form>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="py-20 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-6"><Rocket className="text-indigo-500" /> {brand.logoText}</div>
            <p className="text-sm leading-relaxed">Scaling businesses with intelligence and speed.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li className="cursor-pointer hover:text-white" onClick={() => {setView('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'}), 100)}}>Features</li>
              <li className="cursor-pointer hover:text-white" onClick={() => {setView('landing'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}), 100)}}>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li className="cursor-pointer hover:text-white" onClick={() => setView('resources')}>Blog</li>
              <li className="cursor-pointer hover:text-white">Help Center</li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-6">Admin</h4>
             <button onClick={() => setView('admin')} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition flex items-center gap-2">
               <LayoutDashboard size={14} /> Go to Portal
             </button>
          </div>
        </div>
      </footer>
    </div>
  );

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('content');
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* TOP NAVIGATION BAR FOR ADMIN */}
        <nav className="fixed top-0 w-full z-[70] bg-white border-b border-slate-200 shadow-sm h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-indigo-600 cursor-pointer" onClick={goHome}>
              <Rocket size={24} />
              <span className="hidden sm:inline">{brand.logoText} Admin</span>
            </div>
            <div className="hidden lg:flex items-center gap-6 ml-8">
               <NavLinks className="flex gap-6 text-sm" />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={goHome} className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition text-sm font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Eye size={16} /> <span className="hidden lg:inline">Live Preview</span>
            </button>
            <button onClick={() => setView('landing')} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition">
              <LogOut size={16} /> <span className="hidden sm:inline">Exit Portal</span>
            </button>
            <button className="lg:hidden p-2 text-slate-600 border rounded-lg" onClick={() => setAdminMenuOpen(!adminMenuOpen)}>
              {adminMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <div className="flex flex-1 pt-16 h-screen overflow-hidden">
          {/* SIDEBAR NAVIGATION */}
          <aside className={`${adminMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static w-72 h-full bg-white border-r border-slate-200 z-[65] transition-transform duration-300 flex flex-col`}>
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="mb-4 px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</div>
              <nav className="space-y-1">
                {[
                  { id: 'content', label: 'Page Content', icon: <FileText size={18} /> },
                  { id: 'leads', label: 'Lead CRM', icon: <Users size={18} />, count: leads.length },
                  { id: 'pricing', label: 'Subscriptions', icon: <CreditCard size={18} /> },
                  { id: 'blog', label: 'Resource Library', icon: <Globe size={18} /> },
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setAdminMenuOpen(false); }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3">{item.icon} {item.label}</div>
                    {item.count > 0 && <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-white/20' : 'bg-slate-100'}`}>{item.count}</span>}
                  </button>
                ))}
              </nav>

              <div className="mt-8 mb-4 px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settings</div>
              <button onClick={() => setActiveTab('design')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition ${activeTab === 'design' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Settings size={18} /> Brand & SEO
              </button>
            </div>
            
            <div className="p-4 border-t border-slate-100 lg:hidden">
              <div className="flex flex-col gap-2">
                <NavLinks className="flex flex-col gap-2 text-sm" onAction={() => setAdminMenuOpen(false)} />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">AD</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">Admin User</div>
                  <div className="text-[10px] text-slate-500 truncate">admin@nexusflow.io</div>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </aside>

          {/* CONTENT AREA */}
          <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-10">
            <div className="max-w-5xl mx-auto">
              <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">Portal / {activeTab}</div>
                  <h1 className="text-3xl font-extrabold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition">Reset View</button>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">Save Changes</button>
                </div>
              </header>

              {activeTab === 'content' && (
                <div className="grid gap-6">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800"><Rocket size={20} className="text-indigo-600" /> Landing Hero</h3>
                    <div className="space-y-6">
                      <div className="grid gap-2">
                        <label className="text-xs font-black uppercase text-slate-400">Headline</label>
                        <input className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 ring-indigo-50 outline-none font-bold text-slate-800" value={content.hero.title} onChange={e => setContent({...content, hero: {...content.hero, title: e.target.value}})} />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-xs font-black uppercase text-slate-400">Sub-headline</label>
                        <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 ring-indigo-50 outline-none text-slate-600" value={content.hero.subtitle} onChange={e => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-full max-w-sm">
                      <Search size={18} className="text-slate-400" />
                      <input placeholder="Search leads..." className="bg-transparent border-none outline-none text-sm w-full" />
                    </div>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase">
                      <tr>
                        <th className="px-8 py-4">User Email</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Captured</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.length === 0 ? (
                        <tr><td colSpan="3" className="px-8 py-20 text-center text-slate-400 italic">No incoming leads yet. Check back later!</td></tr>
                      ) : (
                        leads.map((l, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition">
                            <td className="px-8 py-5 font-bold text-slate-800">{l.email}</td>
                            <td className="px-8 py-5"><span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase">Active Trial</span></td>
                            <td className="px-8 py-5 text-right text-slate-500 text-sm">{l.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {['pricing', 'blog', 'design'].includes(activeTab) && (
                <div className="bg-white p-20 rounded-[2rem] border border-slate-200 shadow-sm text-center">
                   <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6"><Settings className="animate-spin-slow" size={40} /></div>
                   <h2 className="text-2xl font-extrabold text-slate-900">Customizer Active</h2>
                   <p className="text-slate-500 mt-2 max-w-sm mx-auto">This module is currently syncing with the live Landing Page data. Your changes will reflect instantly.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  };

  return (
    <div className="app-root">
      {view === 'admin' ? <AdminDashboard /> : <LandingPage />}
    </div>
  );
}