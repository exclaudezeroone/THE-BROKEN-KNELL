import type { CSSProperties } from "react";
import type { Panel as PanelContent } from "@/lib/content/schema";
import styles from "./panel.module.css";

type PanelProps = {
  readonly panel: PanelContent;
};

type PanelStyle = CSSProperties & {
  readonly "--panel-ratio-mobile": string;
  readonly "--panel-ratio-desktop": string;
};

const ACCENT_CLASS = {
  blood: styles.blood,
  gold: styles.gold,
  green: styles.green,
} as const;

/** Renders one validated story panel and its accessible text layers. */
export function Panel({ panel }: PanelProps) {
  const panelStyle: PanelStyle = {
    "--panel-ratio-mobile": panel.ratio.mobile,
    "--panel-ratio-desktop": panel.ratio.desktop,
  };

  return (
    <section
      className={`${styles.panel} ${styles[panel.placeholder]}`}
      data-panel={panel.id}
      data-motion={panel.motion}
      style={panelStyle}
    >
      {panel.image ? (
        <picture className={styles.picture} data-layer="" data-depth="0.2">
          {panel.image.sources.map((source) => (
            <source
              key={`${source.srcset}-${source.media ?? "all"}-${source.type ?? "any"}`}
              media={source.media}
              type={source.type}
              srcSet={source.srcset}
            />
          ))}
          <img
            className={styles.image}
            src={panel.image.src}
            srcSet={panel.image.srcset}
            sizes={panel.image.sizes}
            width={panel.image.width}
            height={panel.image.height}
            alt={panel.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : (
        <div
          className={styles.placeholder}
          data-layer=""
          data-depth="0.2"
          role="img"
          aria-label={panel.alt}
        />
      )}

      {panel.accent ? (
        <span
          className={`${styles.accent} ${styles[panel.accent.shape]} ${ACCENT_CLASS[panel.accent.color]}`}
          data-layer=""
          data-depth="0.4"
          aria-hidden="true"
        />
      ) : null}

      {panel.layers.map((layer) => (
        <p
          key={layer.id}
          className={`${styles.layer} ${styles[layer.kind]} ${styles[layer.placement]}`}
          data-item=""
        >
          {layer.speaker ? <span className={styles.speaker}>{layer.speaker}</span> : null}
          {layer.text}
        </p>
      ))}
    </section>
  );
}
