import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Heart, CheckCircle, Sparkles, MapPin, GraduationCap, Stethoscope, Compass, Image } from 'lucide-react';

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      alert("Please manually fill all required fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', note: '' });
      } else {
        alert("The server received your request but hit a snag saving it.");
      }
    } catch (error) {
      alert("Could not reach backend framework.");
    }
  };

  return (
    // Rebuilt with warm-stone background layers and elegant rose tint boundaries
    <div style={{ backgroundColor: '#fffbfb' }} className="min-h-screen text-stone-800 font-sans scroll-smooth pt-16">
      
      {/* 1. FIXED TOP NAVIGATION BAR */}
      <nav style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #fcecee' }} className="fixed top-0 left-0 right-0 h-16 z-50 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div style={{ backgroundColor: '#e8a7a1' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
          <span style={{ color: '#4a3735' }} className="font-serif font-bold tracking-wide text-base md:text-lg">
            Swara Maternity Clinic
          </span>
        </div>
        <a href="#book" style={{ backgroundColor: '#d98b84' }} className="hover:bg-[#cb7972] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
          Book Appointment
        </a>
      </nav>

      {/* 2. HERO HEADER - Warm, inviting rose-gold gradient cloud frame */}
      <header style={{ backgroundImage: 'linear-gradient(to bottom, #fdf1f0, #fffbfb)', borderBottom: '1px solid #fcecee' }} className="relative text-center px-6 py-28 md:py-36 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #fcdedb', color: '#bc7069' }} className="inline-flex items-center gap-2 shadow-sm px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#e8a7a1] animate-pulse" /> Gentle Care for Mother & Child
          </div>

          <div className="space-y-4">
            <h1 style={{ color: '#3a2725' }} className="text-5xl md:text-7xl font-serif font-bold tracking-tight">Dr. B Pruthvi</h1>
            <div style={{ backgroundColor: '#e8a7a1' }} className="w-24 h-0.5 mx-auto rounded-full my-4"></div>
            <p style={{ color: '#b56d66' }} className="text-xl md:text-2xl font-serif tracking-wide font-medium italic">Obstetrician & Gynecologist</p>
          </div>

          <p className="text-base md:text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Bringing <strong style={{ color: '#3a2725' }} className="font-semibold">20 years of trusted clinical excellence</strong> and gentle guidance to your motherhood journey at <span style={{ color: '#b56d66', fontWeight: '600' }}>Swara Maternity Clinic</span>.
          </p>

          <div className="pt-4">
            <a href="#book" style={{ backgroundImage: 'linear-gradient(to right, #d98b84, #cb7972)' }} className="text-white font-semibold px-10 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2.5 text-sm tracking-wide">
              <Calendar className="w-5 h-5" /> Schedule Your Visit
            </a>
          </div>
        </div>
      </header>

      {/* 3. TRUST STATS BAR */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div style={{ border: '1px solid #fcecee' }} className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-8 rounded-3xl shadow-sm">
          <div className="text-center p-3 border-r border-stone-100 last:border-none">
            <p style={{ color: '#cb7972' }} className="text-3xl md:text-4xl font-serif font-bold">20</p>
            <p className="text-xs font-semibold uppercase text-stone-400 mt-2 tracking-widest">Years Experience</p>
          </div>
          <div className="text-center p-3 border-r border-stone-100 last:border-none">
            <p style={{ color: '#cb7972' }} className="text-3xl md:text-4xl font-serif font-bold">Pure</p>
            <p className="text-xs font-semibold uppercase text-stone-400 mt-2 tracking-widest">Maternal Focus</p>
          </div>
          <div className="text-center p-3 border-r border-stone-100 last:border-none">
            <p style={{ color: '#cb7972' }} className="text-3xl md:text-4xl font-serif font-bold">Holistic</p>
            <p className="text-xs font-semibold uppercase text-stone-400 mt-2 tracking-widest">Wellness</p>
          </div>
          <div className="text-center p-3 last:border-none">
            <p style={{ color: '#cb7972' }} className="text-3xl md:text-4xl font-serif font-bold">Calm</p>
            <p className="text-xs font-semibold uppercase text-stone-400 mt-2 tracking-widest">Private Space</p>
          </div>
        </div>
      </section>

      {/* 4. MEET THE DOCTOR BACKGROUND SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <ScrollReveal>
            {/* Soft Pastel Rose Blueprint Box */}
            <div 
              style={{ backgroundColor: '#fff4f3', border: '2px dashed #f5d4d1', borderRadius: '24px', aspectRatio: '3/4' }} 
              className="w-full flex flex-col items-center justify-center text-center p-6 shadow-sm group"
            >
              <Image style={{ width: '40px', height: '40px', color: '#e8a7a1', marginBottom: '12px' }} />
              <h4 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#4a3735' }}>Doctor Profile Photo</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8c7674' }}>Your side-pose portrait will load here seamlessly.</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-7 space-y-6">
          <ScrollReveal>
            <div className="space-y-2">
              <span style={{ color: '#cb7972' }} className="text-xs font-bold uppercase tracking-widest block">Clinical Leadership</span>
              <h2 style={{ color: '#3a2725' }} className="text-3xl md:text-4xl font-serif font-bold">Meet Dr. B Pruthvi</h2>
            </div>
            <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg">
              Dr. B Pruthvi is a highly respected Senior Consultant Obstetrician and Gynecologist based in Bengaluru. Over the past two decades, she has dedicated her career to providing empathetic, evidence-based care to expecting mothers, navigating high-risk pregnancy pathways with calm composure and precision.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div style={{ backgroundColor: '#fff0ef', color: '#cb7972' }} className="p-2 rounded-lg mt-0.5"><GraduationCap className="w-5 h-5" /></div>
                <div>
                  <h4 style={{ color: '#3a2725' }} className="font-semibold text-sm">MD / MBBS in Obstetrics & Gynecology</h4>
                  <p className="text-xs text-stone-500 font-light">Renowned University Medical Institution Foundations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div style={{ backgroundColor: '#fff0ef', color: '#cb7972' }} className="p-2 rounded-lg mt-0.5"><Stethoscope className="w-5 h-5" /></div>
                <div>
                  <h4 style={{ color: '#3a2725' }} className="font-semibold text-sm">Specialization Frameworks</h4>
                  <p className="text-xs text-stone-500 font-light">Advanced Laparoscopic Procedures, Infertility Care, and Maternal-Fetal Health.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. CLINIC ENVIRONMENT GALLERY SECTION */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #fcecee', borderBottom: '1px solid #fcecee' }} className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <ScrollReveal>
            <div className="text-center space-y-2">
              <span style={{ color: '#cb7972' }} className="text-xs font-bold uppercase tracking-widest block">The Sanctuary</span>
              <h2 style={{ color: '#3a2725' }} className="text-3xl font-serif font-bold">Swara Maternity Clinic</h2>
              <p className="text-sm text-stone-500 max-w-md mx-auto font-light">Step into an intimate, completely sanitized, and quiet clinical environment designed to keep your stress parameters flat.</p>
            </div>
          </ScrollReveal>

          {/* Warm Cream Offline Blueprint Image Grids */}
          <div className="grid sm:grid-cols-3 gap-6">
            <ScrollReveal>
              <div style={{ backgroundColor: '#fffbfb', border: '1px solid #fcdedb', borderRadius: '16px', aspectRatio: '16/9' }} className="w-full flex flex-col items-center justify-center p-4 text-center shadow-sm">
                <Image style={{ width: '24px', height: '24px', color: '#e8a7a1', marginBottom: '6px' }} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#4a3735' }}>Consultation Suite</span>
                <span style={{ fontSize: '11px', color: '#b59a98', marginTop: '2px' }}>Interior Room Slot</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div style={{ backgroundColor: '#fffbfb', border: '1px solid #fcdedb', borderRadius: '16px', aspectRatio: '16/9' }} className="w-full flex flex-col items-center justify-center p-4 text-center shadow-sm">
                <Image style={{ width: '24px', height: '24px', color: '#e8a7a1', marginBottom: '6px' }} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#4a3735' }}>Waiting Sanctuary</span>
                <span style={{ fontSize: '11px', color: '#b59a98', marginTop: '2px' }}>Lounge Reception Slot</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div style={{ backgroundColor: '#fffbfb', border: '1px solid #fcdedb', borderRadius: '16px', aspectRatio: '16/9' }} className="w-full flex flex-col items-center justify-center p-4 text-center shadow-sm">
                <Image style={{ width: '24px', height: '24px', color: '#e8a7a1', marginBottom: '6px' }} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#4a3735' }}>Diagnostics Desk</span>
                <span style={{ fontSize: '11px', color: '#b59a98', marginTop: '2px' }}>Scanning Workspace Slot</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. MAP LOCATION COMPONENT */}
      <section className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 space-y-4">
          <ScrollReveal>
            <div style={{ backgroundColor: '#fff0ef', color: '#cb7972' }} className="inline-flex p-2.5 rounded-xl"><MapPin className="w-6 h-6" /></div>
            <h3 style={{ color: '#3a2725' }} className="text-2xl font-serif font-bold">Clinic Location & Mapping</h3>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Swara Maternity Clinic is centrally located in Bengaluru, making it easily accessible for routine checkups. Our building features dedicated private parking spaces underneath for expectant mothers.
            </p>
            <div className="text-xs text-stone-500 font-medium space-y-1 pt-2">
              <p>📍 12th Main Road, Near Primary Hub,</p>
              <p>Jayanagar / Indiranagar Sector, Bengaluru, KA</p>
              <p style={{ color: '#cb7972' }} className="font-semibold pt-1">🕒 Coordination: +91 96117 49077</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-7">
          <ScrollReveal>
            <div style={{ backgroundColor: '#fff4f3', border: '1px dashed #f5d4d1', borderRadius: '24px', height: '288px' }} className="w-full relative flex flex-col items-center justify-center p-6 text-center shadow-inner">
              <Compass style={{ width: '36px', height: '36px', color: '#e8a7a1', marginBottom: '8px' }} className="animate-pulse" />
              <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', color: '#4a3735' }}>Interactive Map Canvas</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#8c7674', maxWidth: '300px' }}>When deployed online, this box will cleanly frame your live Google Maps pinpoint widget asset smoothly.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. APPOINTMENT BOOKING FORM */}
      <section id="book" style={{ borderTop: '1px solid #fcecee' }} className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-3">
            <h2 style={{ color: '#3a2725' }} className="text-3xl font-serif font-bold">Book Your Private Consultation</h2>
            <p className="text-sm text-stone-500 font-light max-w-md mx-auto">Select your preferred date window. Our desk coordinator will reach out to ensure a prompt allocation.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ border: '1px solid #fcecee' }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border relative overflow-hidden">
            <div style={{ backgroundImage: 'linear-gradient(to right, #fcdedb, #e8a7a1, #fcdedb)' }} className="absolute top-0 left-0 right-0 h-1.5"></div>
            
            {submitted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/98 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center z-10"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                <h4 style={{ color: '#3a2725' }} className="text-2xl font-serif font-bold">Request Dispatched</h4>
                <p className="text-sm text-stone-500 max-w-sm mt-2">Dr. B Pruthvi has been updated. Review choice notification metrics arriving in your mailbox stream.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Patient Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ border: '1px solid #f2e2e1' }} className="w-full px-4 py-3 bg-stone-50 rounded-xl outline-none text-sm focus:bg-white transition-all" placeholder="e.g. Ananya Sharma" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Contact Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={{ border: '1px solid #f2e2e1' }} className="w-full px-4 py-3 bg-stone-50 rounded-xl outline-none text-sm focus:bg-white transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Patient Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ border: '1px solid #f2e2e1' }} className="w-full px-4 py-3 bg-stone-50 rounded-xl outline-none text-sm focus:bg-white transition-all" placeholder="patient.name@gmail.com" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Preferred Date</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange} style={{ border: '1px solid #f2e2e1' }} className="w-full px-4 py-3 bg-stone-50 rounded-xl text-sm text-stone-600 focus:bg-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Preferred Window</label>
                  <select required name="time" value={formData.time} onChange={handleInputChange} style={{ border: '1px solid #f2e2e1' }} className="w-full px-4 py-3 bg-stone-50 rounded-xl text-sm text-stone-600 bg-white focus:bg-white transition-all">
                    <option value="">Select a window</option>
                    <option value="morning">Morning (09:30 AM - 01:00 PM)</option>
                    <option value="evening">Evening (05:00 PM - 08:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Specific Notes / Trimester Requirements (Optional)</label>
                <textarea rows="3" name="note" value={formData.note} onChange={handleInputChange} style={{ border: '1px solid #f2e2e1' }} className="w-full px-4 py-3 bg-stone-50 rounded-xl text-sm resize-none focus:bg-white transition-all" placeholder="Let us know how we can best make your checkup safe..."></textarea>
              </div>

              <button type="submit" style={{ backgroundImage: 'linear-gradient(to right, #d98b84, #cb7972)' }} className="w-full text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all tracking-wider text-sm transform hover:-translate-y-0.5">
                Request Appointment Placement
              </button>
            </form>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}