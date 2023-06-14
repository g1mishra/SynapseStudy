"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission delay
    setIsSubmitting(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 2000);
    toast.success("Message sent successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="text-black-tertiary">
      <div className="form-control">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered rounded-none my-2 bg-[#E2E2E2]"
          placeholder="Your name"
          required
        />
      </div>
      <div className="form-control">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered rounded-none my-2 bg-[#E2E2E2]"
          placeholder="Your email"
          required
        />
      </div>
      <div className="form-control">
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea input-bordered rounded-none my-2 bg-[#E2E2E2]"
          placeholder="Type your message here.."
          rows={6}
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn bg-purple max-w-max" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
