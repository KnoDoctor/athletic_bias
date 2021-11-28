export function getCookies(req) {
    if (req.headers.cookie) {
        const {
            headers: { cookie },
        } = req;
        return cookie.split(";").reduce((res, item) => {
            const data = item.trim().split("=");
            return { ...res, [data[0]]: data[1] };
        }, {});
    }
    return {};
}
