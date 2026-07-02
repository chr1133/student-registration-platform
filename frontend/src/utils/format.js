const AVATAR_COLORS = ["#6366f1", "#ef6c4d", "#10b981", "#ec4899", "#06b6d4", "#d4a017"];

export const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("") || "?";
};

export const getAvatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export const formatDate = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};