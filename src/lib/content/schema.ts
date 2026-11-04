import { z } from "zod";
import { MOTION_NAMES } from "../scroll/motion-names";

const AspectRatioSchema = z
  .string()
  .regex(/^\d+\s*\/\s*\d+$/, "Oran 'genislik / yukseklik' biciminde olmali");

export const MotionSchema = z.enum(MOTION_NAMES);

const ImageSourceSchema = z
  .object({
    srcset: z.string().min(1),
    media: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
  })
  .strict();

const PanelImageSchema = z
  .object({
    src: z.string().min(1),
    srcset: z.string().min(1).optional(),
    sizes: z.string().min(1).default("100vw"),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    sources: z.array(ImageSourceSchema).default([]),
  })
  .strict();

const TextLayerSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    kind: z.enum(["caption", "speech", "onomatopoeia"]),
    text: z.string().min(1).max(400),
    speaker: z.string().min(1).optional(),
    placement: z
      .enum(["top-left", "top-right", "center", "bottom-left", "bottom-right"])
      .default("bottom-left"),
  })
  .strict();

const AccentSchema = z
  .object({
    shape: z.enum(["slash", "dot", "bar"]),
    color: z.enum(["blood", "gold", "green"]),
  })
  .strict();

export const PanelSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    alt: z.string().min(1).max(240),
    ratio: z
      .object({
        mobile: AspectRatioSchema,
        desktop: AspectRatioSchema,
      })
      .strict(),
    motion: MotionSchema,
    placeholder: z.enum(["paper", "ink", "hatch"]).default("ink"),
    accent: AccentSchema.optional(),
    image: PanelImageSchema.optional(),
    layers: z.array(TextLayerSchema).max(12).default([]),
  })
  .strict();

export const ChapterSummarySchema = z
  .object({
    no: z.number().int().positive(),
    title: z.string().min(1).max(120),
    excerpt: z.string().min(1).max(240),
    published: z.boolean(),
  })
  .strict();

export const SiteContentSchema = z
  .object({
    title: z.string().min(1).max(120),
    tagline: z.string().min(1).max(240),
    about: z.array(z.string().min(1).max(800)).min(1).max(6),
    firstChapter: z.number().int().positive(),
    chapters: z.array(ChapterSummarySchema).min(1),
  })
  .strict();

export const ChapterSchema = ChapterSummarySchema.omit({ published: true })
  .extend({
    panels: z.array(PanelSchema).min(1).max(120),
  })
  .strict();

export type Motion = z.infer<typeof MotionSchema>;
export type Panel = z.infer<typeof PanelSchema>;
export type ChapterSummary = z.infer<typeof ChapterSummarySchema>;
export type SiteContent = z.infer<typeof SiteContentSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
