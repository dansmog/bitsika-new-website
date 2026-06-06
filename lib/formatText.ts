export function splitBold(text: string): { prefix: string; emphasis: string } {
  const match = text.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (!match) return { prefix: text, emphasis: "" };
  return { prefix: match[1].trim(), emphasis: match[2] };
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
