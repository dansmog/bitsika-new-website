export function splitBold(text: string): { prefix: string; emphasis: string } {
  const match = text.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (!match) return { prefix: text, emphasis: "" };
  return { prefix: match[1].trim(), emphasis: match[2] };
}
