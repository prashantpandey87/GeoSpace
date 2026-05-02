'use client'

import '../styles/pages/Contact.css'

const Contact = () => {
  const handleSubmit=(event)=>{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formInput= Object.fromEntries(formData.entries())
   console.log(formInput)
  }
  return (
    <section className="contact-main">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            required
            autoComplete="off"
            name="username"
            placeholder="Enter your name"
          />
          <input
            type="email"
            required
            autoComplete="off"
            name="email"
            placeholder="Enter your email"
          />
          <textarea
            placeholder="Enter your message"
            required
            name="message"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
