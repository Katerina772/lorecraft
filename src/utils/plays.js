export function getPlaysData() {
  return JSON.parse(localStorage.getItem("plays") || "{}");
}

export function getPlays(questId) {
  return getPlaysData()[questId] || 0;
}

export function incrementPlays(questId) {
  const data = getPlaysData();
  data[questId] = (data[questId] || 0) + 1;
  localStorage.setItem("plays", JSON.stringify(data));
}
