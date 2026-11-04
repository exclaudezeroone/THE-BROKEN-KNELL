import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";
import type { ZodIssue, ZodType } from "zod";
import { ChapterSchema, SiteContentSchema, type Chapter, type SiteContent } from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export class ContentValidationError extends Error {
  /** Creates an error that identifies the invalid content file and fields. */
  constructor(filePath: string, issues: ZodIssue[]) {
    const details = issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");

    super(`Gecersiz icerik (${filePath}): ${details}`);
    this.name = "ContentValidationError";
  }
}

async function loadYaml<T>(filePath: string, schema: ZodType<T>): Promise<T> {
  const absolutePath = path.join(CONTENT_ROOT, filePath);
  const source = await readFile(absolutePath, "utf8");
  const raw: unknown = parse(source);
  const result = schema.safeParse(raw);

  if (!result.success) {
    throw new ContentValidationError(filePath, result.error.issues);
  }

  return result.data;
}

/** Loads and validates global site copy and the chapter index. */
export function loadSiteContent(): Promise<SiteContent> {
  return loadYaml("site.yaml", SiteContentSchema);
}

/** Loads and validates one chapter by its positive chapter number. */
export function getChapter(chapterNo: number): Promise<Chapter> {
  if (!Number.isSafeInteger(chapterNo) || chapterNo < 1) {
    return Promise.reject(new TypeError("Bolum numarasi pozitif bir tam sayi olmali"));
  }

  return loadYaml(`bolumler/bolum-${chapterNo}.yaml`, ChapterSchema);
}

/** Returns the minimal published chapter index needed by navigation pages. */
export async function listChapters(): Promise<{ no: number; title: string }[]> {
  const site = await loadSiteContent();

  return site.chapters
    .filter((chapter) => chapter.published)
    .map(({ no, title }) => ({ no, title }));
}
