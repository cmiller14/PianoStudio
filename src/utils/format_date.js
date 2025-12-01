export function formatDate(dateInput) {
    if (!dateInput) return "";

    const date = new Date(dateInput + "T00:00:00"); 

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
