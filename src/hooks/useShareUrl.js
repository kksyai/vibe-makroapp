import { useState } from "react";
import { getShareUrl, copyToClipboard } from "../utils/share";

export function useShareUrl(items) {
  const [copied, setCopied] = useState(false);

  async function shareList() {
    try {
      const url = getShareUrl(items);
      if (!url) return false;

      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return true;
      }
    } catch (err) {
      console.error("Failed to share list:", err);
    }
    return false;
  }

  return { shareList, copied };
}
