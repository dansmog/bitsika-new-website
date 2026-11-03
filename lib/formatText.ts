export function splitBold(text: string): { prefix: string; emphasis: string } {
  const match = text.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (!match) return { prefix: text, emphasis: "" };
  return { prefix: match[1].trim(), emphasis: match[2] };
}

/**
 * Splits text on every `**marked**` span, e.g. "Buy **here** now" →
 * [{ text: "Buy ", link: false }, { text: "here", link: true }, …].
 */
export function splitAsteriskLinks(
  text: string,
): Array<{ text: string; link: boolean }> {
  return text
    .split(/\*\*([^*]+?)\*\*/)
    .map((part, i) => ({ text: part, link: i % 2 === 1 }))
    .filter((part) => part.text);
}

export function splitAsteriskLink(text: string): {
  prefix: string;
  link: string;
  suffix: string;
} {
  const match = text.match(/^(.*?)\*\*([^*]+?)\*\*(.*)$/);
  if (!match) return { prefix: text, link: "", suffix: "" };
  return { prefix: match[1], link: match[2], suffix: match[3] };
}
