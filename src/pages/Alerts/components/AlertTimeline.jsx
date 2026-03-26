import styles from "./AlertTimeline.module.css";

export default function AlertTimeline({ events }) {
  return (
    <div className={styles.timelineWrap}>
      <div className={styles.rail}>
        {events.map((event, index) => (
          <div key={event.id} className={styles.railRow}>
            <div className={styles.line} />
            <span
              className={`material-symbols-outlined ${styles.railIcon} ${
                event.iconColor === "red" ? styles.red : styles.gray
              }`}
              aria-hidden="true"
            >
              {event.icon}
            </span>
            {index !== events.length - 1 && <div className={styles.line} />}
          </div>
        ))}
      </div>

      <div className={styles.cards}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.dateBlock}>
              <div>{event.date}</div>
              <div>{event.time}</div>
            </div>

            <div className={styles.eventMain}>
              <div className={styles.eventTitleRow}>
                <span className={styles.eventTitle}>{event.title}</span>

                {event.pills?.length ? (
                  <div className={styles.pills}>
                    {event.pills.map((pill) => (
                      <span key={pill} className={styles.pill}>
                        {pill}
                      </span>
                    ))}
                  </div>
                ) : null}

                {event.badge ? <span className={styles.errorBadge}>{event.badge}</span> : null}
                {event.meta ? <span className={styles.meta}>{event.meta}</span> : null}

                {event.chevron ? (
                  <span className={`material-symbols-outlined ${styles.chevron}`} aria-hidden="true">
                    chevron_right
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}