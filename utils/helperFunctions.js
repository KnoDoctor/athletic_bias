export function convertToSlug(Text) {
    try {
        return Text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    } catch (e) {
        console.log(e);
    }
}
