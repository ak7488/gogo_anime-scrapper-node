const cheerio = require("cheerio");
const axios = require("axios");

async function getSBDownloadLink(ep_page_name) {
    return new Promise(async (resolve, reject) => {
        const page1a1 =
            "#container > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a";
        const page1a2 =
            "#container > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > a";
        const page1quality1 =
            "#container > div > table > tbody > tr:nth-child(2) > td:nth-child(2)";
        const page1quality2 =
            "#container > div > table > tbody > tr:nth-child(3) > td:nth-child(2)";
        const page2a = "#container > div > span > a";

        const res1 = await axios(`https://sbplay.one/d/${ep_page_name}`);
        const $1 = cheerio.load(res1.data);
        const page1Link1Parts = $1(page1a1)
            .attr("onclick")
            .replace(/'|\(|\)|download_video/g, "")
            .split(",");
        const page1Link2Parts = $1(page1a2)
            .attr("onclick")
            .replace(/'|\(|\)|download_video/g, "")
            .split(",");
        const quality1 = $1(page1quality1).html();
        const quality2 = $1(page1quality2).html();
        const page1Link1 = `https://sbplay.one/dl?op=download_orig&id=${page1Link1Parts[0]}&mode=${page1Link1Parts[1]}&hash=${page1Link1Parts[2]}`;
        const page1Link2 = `https://sbplay.one/dl?op=download_orig&id=${page1Link2Parts[0]}&mode=${page1Link2Parts[1]}&hash=${page1Link2Parts[2]}`;

        const res2 = await axios(page1Link1);
        const $2 = cheerio.load(res2.data);
        const videoLink1 = $2(page2a).attr("href");

        const res3 = await axios(page1Link2);
        const $3 = cheerio.load(res3.data);
        const videoLink2 = $3(page2a).attr("href");

        const id = setInterval(() => {
            if (videoLink1 && videoLink2) {
                resolve([
                    {
                        quality: quality1,
                        link: videoLink1,
                    },
                    {
                        quality: quality2,
                        link: videoLink2,
                    },
                ]);
                clearInterval(id);
            }
        }, 500);
    });
}

process.on("message", async (message) => {
    const mes = message.split("_");
    if (mes[0] === "start") {
        const result = await getSBDownloadLink(mes[1]);
        process.send(result);
    }
});
