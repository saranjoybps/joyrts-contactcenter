import Image from "next/image";
import styles from "./tool-stack-section.module.css";

const tools = [
  {
    name: "Exotel",
    role: "Contact center",
    logo: "https://latestlogo.com/wp-content/uploads/2024/02/exotel.svg",
  },
  {
    name: "Vapi",
    role: "Voice agents",
    logo: "https://www.google.com/s2/favicons?domain=vapi.ai&sz=128",
  },
  {
    name: "Bland",
    role: "AI calling",
    logo: "https://www.google.com/s2/favicons?domain=bland.ai&sz=128",
  },
  {
    name: "Twilio",
    role: "Telephony APIs",
    logo: "https://www.google.com/s2/favicons?domain=twilio.com&sz=128",
  },
] as const;

export default function ToolStackSection() {
  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Our stack</p>
        <h2 className={styles.heading}>
          Trusted tools that power the{" "}
          <span className={styles.headingAccent}>voice experience</span>.
        </h2>
        <p className={styles.description}>
          We combine the right telephony and voice platforms to keep every call
          fast, resilient, and ready to scale.
        </p>
      </div>

      <div className={styles.grid}>
        {tools.map((tool) => (
          <article key={tool.name} className={styles.card}>
            <div className={styles.logoShell}>
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                className={styles.logo}
                fill
                sizes="104px"
                unoptimized
              />
            </div>
            <div className={styles.toolName}>{tool.name}</div>
            <div className={styles.toolRole}>{tool.role}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
