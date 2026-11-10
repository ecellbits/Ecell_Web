import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './common/SEO';
import { supabase } from '../supabaseClient';
import './common/content-pages.css';

const fields = [
  { name: 'founder_name', label: 'Founder name', type: 'text', autoComplete: 'name', placeholder: 'John Doe', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'john.doe@example.com', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'startup_name', label: 'Startup name', type: 'text', autoComplete: 'organization', placeholder: 'Acme', required: true },
  { name: 'website_linkedin', label: 'Website / LinkedIn', type: 'url', autoComplete: 'url', required: false },
  { name: 'startup_description', label: 'Short description of the startup', multiline: true, required: true },
  { name: 'industry', label: 'Industry / sector', type: 'text', required: true },
  { name: 'startup_stage', label: 'Current startup stage', type: 'text', required: true },
  { name: 'mentorship_areas', label: 'Areas where you need mentorship', multiline: true, required: false },
];

export default function MentorConnectForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(fields.map((field) => [field.name, String(data.get(field.name) ?? '').trim()]));
    if (fields.some((field) => field.required && !payload[field.name])) {
      setError('Please complete every required field.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const { error: databaseError } = await supabase.from('mentorship_applications').insert([payload]);
      if (databaseError) throw databaseError;
      setSuccess(true);
      form.reset();
    } catch {
      setError('We couldn’t submit your application. Please try again, or contact Sanay or Shami below. Your answers have been kept.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="content-page" data-theme="light">
      <SEO
        title="Mentorship Connect"
        description="Apply for the E-Cell BITS Hyderabad startup mentorship cohort."
        url="https://www.ecellbits.com/mentor-connect"
        keywords={['Startup Mentorship', 'Founder’s First']}
        image="https://www.ecellbits.com/navbarlogo.png"
      />
      <div className="content-container content-form-container">
        <header className="content-hero">
          <Link to="/startup-mentorship" className="content-link">← About the program</Link>
          <h1>Mentorship Connect</h1>
          <p className="content-lead">Apply for the Startup Mentorship Cohort.</p>
          <p className="content-muted">Fields marked * are required.</p>
        </header>
        <form onSubmit={submit} className="mentorship-form" aria-busy={submitting}>
          <fieldset disabled={submitting}>
            {fields.map((field) => (
              <div className="content-field" key={field.name}>
                <label htmlFor={field.name}>
                  {field.label}{field.required ? ' *' : ''}
                </label>
                {field.multiline ? (
                  <textarea id={field.name} name={field.name} required={field.required} rows={4} maxLength={5000} />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    required={field.required}
                    maxLength={500}
                  />
                )}
              </div>
            ))}
            <p className="content-muted">
              By submitting, you share these details with E-Cell BITS Hyderabad for the mentorship cohort.
            </p>
            <button type="submit" className="content-button content-button-primary">
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
          </fieldset>
          {error && <p className="content-form-error" role="alert">{error}</p>}
          {success && (
            <p className="content-form-success" role="status">
              Application submitted successfully. Thank you for applying!
            </p>
          )}
        </form>
        <section className="content-section">
          <h2>Questions about the cohort?</h2>
          <p>Sanay — <a className="content-link" href="tel:+918169523199">+91 81695 23199</a></p>
          <p>Shami — <a className="content-link" href="tel:+919407045723">+91 94070 45723</a></p>
        </section>
      </div>
    </main>
  );
}
