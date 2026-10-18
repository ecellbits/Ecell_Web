
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
console.log("SUPABASE URL:", process.env.REACT_APP_SUPABASE_URL);

const initialState = {
  founderName: '',
  email: '',
  phone: '',
  startupName: '',
  websiteLinkedin: '',
  startupDescription: '',
  industry: '',
  startupStage: '',
  mentorshipAreas: '',
};

const MentorConnectForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showHeader, setShowHeader] = useState(true);

 useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 20) {
      setShowHeader(true);
    } else if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(false);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (
    !formData.founderName ||
    !formData.email ||
    !formData.phone ||
    !formData.startupName ||
    !formData.startupDescription ||
    !formData.industry ||
    !formData.startupStage
   ) {
     setError('Please fill all required fields.');
     return;
   }
  setError('');
  setSuccess('');
  const { supabase } = await import('../supabaseClient');
  const { error: dbError } = await supabase
    .from('mentorship_applications')
    .insert([
      {
        founder_name: formData.founderName,
        email: formData.email,
        phone: formData.phone,
        startup_name: formData.startupName,
        website_linkedin: formData.websiteLinkedin,
        startup_description: formData.startupDescription,
        industry: formData.industry,
        startup_stage: formData.startupStage,
        mentorship_areas: formData.mentorshipAreas,
      },
    ]);
  if (dbError) {
    setError('Database error: ' + dbError.message);
    return;
  }
   setSuccess('Application submitted successfully!');
   setFormData(initialState);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-ecell-bg overflow-hidden relative">
      {/* Background Ambience */}
      <motion.div
  animate={{ y: showHeader ? 0 : -100 }}
  transition={{ duration: 0.3 }}
  className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-ecell-bg/80 backdrop-blur-md border-b border-white/10"
  >
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    </div>
  </motion.div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ecell-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ecell-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-[2rem] glass-dark border border-white/10 mt-16 mb-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-white font-syne mb-2">
            Mentorship <span className="text-ecell-primary">Connect</span>
          </h2>
          <p className="text-gray-400 font-manrope font-light">Apply for the Startup Mentorship Cohort.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
  <label htmlFor="founderName" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Founder Name <span className="text-ecell-primary">*</span>
  </label>
  <input
    type="text"
    id="founderName"
    name="founderName"
    autoComplete="name"
    value={formData.founderName}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="Enter founder name"
    required
  />
</div>

<div>
  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Email <span className="text-ecell-primary">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    autoComplete="email"
    value={formData.email}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="founder@example.com"
    required
  />
</div>

<div>
  <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Phone Number <span className="text-ecell-primary">*</span>
  </label>
  <input
    type="tel"
    id="phone"
    name="phone"
    autoComplete="tel"
    value={formData.phone}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="+91 XXXXX XXXXX"
    required
  />
</div>

<div>
  <label htmlFor="startupName" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Startup Name <span className="text-ecell-primary">*</span>
  </label>
  <input
    type="text"
    id="startupName"
    name="startupName"
    autoComplete="organization"
    value={formData.startupName}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="Enter startup name"
    required
  />
</div>

<div>
  <label htmlFor="websiteLinkedin" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Website / LinkedIn
  </label>
  <input
    type="text"
    id="websiteLinkedin"
    name="websiteLinkedin"
    autoComplete="url"
    value={formData.websiteLinkedin}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="Website or LinkedIn profile"
  />
</div>

<div>
  <label htmlFor="startupDescription" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Short Description of the Startup <span className="text-ecell-primary">*</span>
  </label>
  <textarea
    id="startupDescription"
    name="startupDescription"
    value={formData.startupDescription}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    rows={4}
    placeholder="Briefly describe what your startup does"
    required
  />
</div>

<div>
  <label htmlFor="industry" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Industry / Sector <span className="text-ecell-primary">*</span>
  </label>
  <input
    type="text"
    id="industry"
    name="industry"
    value={formData.industry}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="e.g. FinTech, HealthTech, SaaS"
    required
  />
</div>

<div>
  <label htmlFor="startupStage" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Current Startup Stage <span className="text-ecell-primary">*</span>
  </label>
  <input
    type="text"
    id="startupStage"
    name="startupStage"
    value={formData.startupStage}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    placeholder="e.g. Idea, MVP, Early Revenue"
    required
  />
</div>

<div>
  <label htmlFor="mentorshipAreas" className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
    Areas where you need mentorship
  </label>
  <textarea
    id="mentorshipAreas"
    name="mentorshipAreas"
    value={formData.mentorshipAreas}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ecell-primary transition-all placeholder-gray-600 shadow-inner"
    rows={3}
    placeholder="e.g. MVP validation, GTM, fundraising"
  />
</div>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-ecell-primary/10 border border-ecell-primary/50 text-ecell-primary text-sm"
            >
              {success}
            </motion.div>
          )}

          <button
            type="submit"
            className="btn-premium w-full py-4 rounded-xl text-lg font-bold tracking-wider uppercase transition-all font-manrope"
          >
            Submit Application
          </button>
          <div className="mt-6 text-center font-manrope text-sm text-gray-400">
  <p className="mb-2">For any queries, contact:</p>

  <p className="mb-1">
    Sanay —{" "}
    <a href="tel:+918169523199" className="text-white hover:text-ecell-primary transition-colors">
      +91 81695 23199
    </a>
  </p>

  <p>
    Shami —{" "}
    <a href="tel:+919407045723" className="text-white hover:text-ecell-primary transition-colors">
      +91 94070 45723
    </a>
  </p>
      </div>
        </form>
         </div>
        </div>
  );
};

export default MentorConnectForm;
