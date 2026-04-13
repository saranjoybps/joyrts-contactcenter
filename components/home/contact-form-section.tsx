import styles from "./contact-form-section.module.css";

export default function ContactFormSection() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-form-title"
    >
      <div className={styles.card}>
        <p className={styles.eyebrow}>Contact us</p>
        <h3 id="contact-form-title" className={styles.title}>
          Let&apos;s talk about your support flow.
        </h3>
        <p className={styles.description}>
          Share a few details and we&apos;ll help you map the best voice setup
          for your team.
        </p>

        <form className={styles.form}>
          <label className={styles.field}>
            <span>Name</span>
            <input type="text" name="name" placeholder="Your name" />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input type="email" name="email" placeholder="you@company.com" />
          </label>

          <label className={styles.field}>
            <span>Company</span>
            <input type="text" name="company" placeholder="Company name" />
          </label>

          <label className={styles.field}>
            <span>What do you need?</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your call volume, routing, or handoff needs"
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            Book a demo
          </button>
        </form>
      </div>
    </section>
  );
}
