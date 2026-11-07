import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const initialState = {
  startupName: '',
  tagline: '',
  website: '',
  founders: '',
  email: '',
  contact: '',
  linkedin: '',
  teamSize: '',
  stage: '',
  industry: '',
  status: '',
  achievements: '',
  lookingFor: [],
  pitchDeck: null,
  consent: false,
};

const lookingForOptions = [
  'Funding',
  'Mentorship',
  'Tech Support',
  'Marketing',
  'Networking',
  'Talent/Recruitment',
  'Other',
];

const stages = [
  'Idea',
  'Prototype',
  'Early Revenue',
  'Growth',
];

const statuses = [
  'MVP',
  'Beta Users',
  'Paying Customers',
  'Other',
];

const StartupConnectForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'consent') {
      setFormData({ ...formData, consent: checked });
    } else if (type === 'checkbox' && name === 'lookingFor') {
      let updated = [...formData.lookingFor];
      if (checked) {
        updated.push(value);
      } else {
        updated = updated.filter((item) => item !== value);
      }
      setFormData({ ...formData, lookingFor: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed for pitch deck.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB.');
        return;
      }
      setError('');
      setFormData({ ...formData, pitchDeck: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !formData.startupName ||
      !formData.founders ||
      !formData.email ||
      !formData.contact ||
      !formData.teamSize ||
      !formData.stage ||
      !formData.industry ||
      !formData.status ||
      !formData.pitchDeck ||
      !formData.consent
    ) {
      setError('Please fill all required fields and upload your pitch deck.');
      return;
    }

    let pitchDeckUrl = '';
    if (formData.pitchDeck) {
      const fileExt = formData.pitchDeck.name.split('.').pop();
      const fileName = `${Date.now()}_${formData.startupName.replace(/\s+/g, '_')}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('pitch-decks')
        .upload(fileName, formData.pitchDeck);

      if (uploadError) {
        setError('Failed to upload pitch deck: ' + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('pitch-decks')
        .getPublicUrl(data.path);

      pitchDeckUrl = urlData.publicUrl;
    }

    const { error: dbError } = await supabase
      .from('startups')
      .insert([
        {
          startup_name: formData.startupName,
          tagline: formData.tagline,
          website: formData.website,
          founders: formData.founders,
          email: formData.email,
          contact: formData.contact,
          linkedin: formData.linkedin,
          team_size: formData.teamSize,
          stage: formData.stage,
          industry: formData.industry,
          status: formData.status,
          achievements: formData.achievements,
          looking_for: formData.lookingFor,
          pitch_deck_url: pitchDeckUrl,
          consent: formData.consent,
        },
      ]);
    if (dbError) {
      setError('Database error: ' + dbError.message);
      return;
    }

    setSuccess('Form submitted successfully!');
    setFormData(initialState);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-ecell-bg overflow-hidden relative">
      <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-2xl bg-card border border-hairline mt-16 mb-8 relative z-10 shadow-lg">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-ink font-sans mb-2">
            Startup <span className="text-brand-navy">Connect</span>
          </h2>
          <p className="text-ecell-text-muted font-sans font-light">Join the most vibrant entrepreneurial ecosystem.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="startupName" className="block text-sm font-semibold text-ink mb-2 ml-1">Startup Name <span className="text-brand-navy">*</span></label>
            <input
              type="text"
              id="startupName"
              name="startupName"
              autoComplete="organization"
              value={formData.startupName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
              placeholder="e.g. Acme Corp"
              required
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-semibold text-ink mb-2 ml-1">One-line Pitch / Tagline</label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              autoComplete="off"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
              placeholder="What problem do you solve?"
              required
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-semibold text-ink mb-2 ml-1">Website / Social Media Links</label>
            <input
              type="text"
              id="website"
              name="website"
              autoComplete="url"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
              placeholder="https://yourstartup.com"
              required
            />
          </div>

          <div>
            <label htmlFor="founders" className="block text-sm font-semibold text-ink mb-2 ml-1">Founder(s) Name(s) <span className="text-brand-navy">*</span></label>
            <input
              type="text"
              id="founders"
              name="founders"
              autoComplete="name"
              value={formData.founders}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
              placeholder="John Doe, Jane Smith"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2 ml-1">Email <span className="text-brand-navy">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
                placeholder="founder@startup.com"
                required
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-semibold text-ink mb-2 ml-1">Contact Number <span className="text-brand-navy">*</span></label>
              <input
                type="tel"
                id="contact"
                name="contact"
                autoComplete="tel"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="linkedin" className="block text-sm font-semibold text-ink mb-2 ml-1">LinkedIn Profile</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              autoComplete="url"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
              placeholder="https://linkedin.com/in/founder"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="teamSize" className="block text-sm font-semibold text-ink mb-2 ml-1">Team Size <span className="text-brand-navy">*</span></label>
              <input
                type="number"
                id="teamSize"
                name="teamSize"
                min="1"
                autoComplete="off"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
                placeholder="e.g. 5"
                required
              />
            </div>
            <div>
              <label htmlFor="stage" className="block text-sm font-semibold text-ink mb-2 ml-1">Current Stage <span className="text-brand-navy">*</span></label>
              <select
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all"
                required
              >
                <option value="" disabled className="bg-white text-black">Select Stage</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage} className="bg-white text-black">{stage}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold text-ink mb-2 ml-1">Industry / Sector <span className="text-brand-navy">*</span></label>
              <input
                type="text"
                id="industry"
                name="industry"
                autoComplete="off"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500"
                placeholder="e.g. FinTech, AI, EdTech"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-ink mb-2 ml-1">Current Status <span className="text-brand-navy">*</span></label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all"
                required
              >
                <option value="" disabled className="bg-white text-black">Select Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status} className="bg-white text-black">{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="achievements" className="block text-sm font-semibold text-ink mb-2 ml-1">Key Achievements / Milestones</label>
            <textarea
              id="achievements"
              name="achievements"
              rows="3"
              autoComplete="off"
              value={formData.achievements}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink focus:outline-none focus:border-brand-navy transition-all placeholder-gray-500 resize-none"
              placeholder="e.g. 10k users, $5k MRR, Won XYZ Hackathon..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2 ml-1">What are you looking for from E-Cell? <span className="text-brand-navy">*</span></label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {lookingForOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 group cursor-pointer">
                  <input
                    type="checkbox"
                    name="lookingFor"
                    value={option}
                    checked={formData.lookingFor.includes(option)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-400 text-brand-navy focus:ring-brand-navy"
                  />
                  <span className="text-sm text-ecell-text-muted group-hover:text-brand-navy transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="pitchDeck" className="block text-sm font-semibold text-ink mb-2 ml-1">Pitch Deck (PDF, max 5MB) <span className="text-brand-navy">*</span></label>
            <input
              type="file"
              id="pitchDeck"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-hairline-strong text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-navy file:text-brand-cream hover:file:bg-brand-maroon transition-all"
              required
            />
          </div>

          <div className="py-2">
            <label htmlFor="consent" className="flex items-start gap-3 group cursor-pointer">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="h-4 w-4 mt-1 rounded border-gray-400 text-brand-navy focus:ring-brand-navy"
                required
              />
              <span className="text-xs text-ecell-text-muted font-light leading-relaxed">
                I agree to share my startup details with E-Cell BITS Hyderabad for mentorship, collaboration, and promotional purposes.
              </span>
            </label>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/50 text-green-700 text-sm"
            >
              {success}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-base font-bold tracking-wider uppercase bg-brand-navy hover:bg-brand-maroon text-brand-cream shadow-md transition-all duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartupConnectForm;
