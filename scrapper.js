const cheerio = require("cheerio");
const axios = require("axios");

async function newSeason(page) {
    var anime_list = [];

    res = await axios.get(`https://gogoanime.vc/new-season.html?page=${page}`);
    const body = await res.data;
    const $ = cheerio.load(body);

    $("div.main_body div.last_episodes ul.items li").each((index, element) => {
        $elements = $(element);
        name = $elements.find("p").find("a");
        img = $elements.find("div").find("a").find("img").attr("src");
        link = $elements.find("div").find("a").attr("href");
        anime_name = {
            name: name.html(),
            img_url: img,
            anime_id: link.slice(10),
        };
        anime_list.push(anime_name);
    });

    let pageNumbers = [];

    $(
        "#wrapper_bg > section > section.content_left > div > div.anime_name.new_series > div > div > ul > li"
    ).each((index, element) => {
        $elements = $(element);
        pageNo = $elements.find("a").html();
        pageNumbers.push(pageNo);
    });

    return await [anime_list, pageNumbers];
}

async function recentRelease(page) {
    var anime_list = [];

    res = await axios.get(`https://gogoanime.vc/?page=${page}`);
    const body = await res.data;
    const $ = cheerio.load(body);

    $("div.main_body div.last_episodes ul.items li").each((index, element) => {
        $elements = $(element);
        name = $elements.find("p").find("a");
        img = $elements.find("div").find("a").find("img").attr("src");
        link = $elements.find("div").find("a").attr("href");
        anime_name = {
            name: name.html(),
            img_url: img,
            anime_id: link.slice(10),
        };
        anime_list.push(anime_name);
    });

    return await anime_list;
}

async function popular(page) {
    var anime_list = [];

    res = await axios.get(`https://gogoanime.vc/popular.html?page=${page}`);
    const body = await res.data;
    const $ = cheerio.load(body);

    $("div.main_body div.last_episodes ul.items li").each((index, element) => {
        $elements = $(element);
        name = $elements.find("p").find("a");
        img = $elements.find("div").find("a").find("img").attr("src");
        link = $elements.find("div").find("a").attr("href");
        anime_name = {
            name: name.html(),
            img_url: img,
            anime_id: link.slice(10),
        };
        anime_list.push(anime_name);
    });

    return await anime_list;
}

async function search(query, page) {
    var anime_list = [];

    res = await axios.get(
        `https://gogoanime.vc//search.html?keyword=${query}&page=${page}`
    );
    const body = await res.data;
    const $ = cheerio.load(body);

    $("div.main_body div.last_episodes ul.items li").each((index, element) => {
        $elements = $(element);
        name = $elements.find("p").find("a");
        img = $elements.find("div").find("a").find("img").attr("src");
        link = $elements.find("div").find("a").attr("href");
        anime_name = {
            name: name.html(),
            img_url: img,
            anime_id: link.slice(10),
        };
        anime_list.push(anime_name);
    });

    let pageNumbers = [];

    $(
        "#wrapper_bg > section > section.content_left > div > div.anime_name.new_series > div > div > ul > li"
    ).each((index, element) => {
        $elements = $(element);
        pageNo = $elements.find("a").html();
        pageNumbers.push(pageNo);
    });

    return await [anime_list, pageNumbers];
}

async function tags(query, page) {
    var anime_list = [];

    res = await axios.get(`https://gogoanime.vc/genre/${query}?page=${page}`);
    const body = await res.data;
    const $ = cheerio.load(body);

    $("div.main_body div.last_episodes ul.items li").each((index, element) => {
        $elements = $(element);
        name = $elements.find("p").find("a");
        img = $elements.find("div").find("a").find("img").attr("src");
        link = $elements.find("div").find("a").attr("href");
        anime_name = {
            name: name.html(),
            img_url: img,
            anime_id: link.slice(10),
        };
        anime_list.push(anime_name);
    });

    let pageNumbers = [];

    $(
        "#wrapper_bg > section > section.content_left > div > div.anime_name.anime_movies > div > div > ul > li"
    ).each((index, element) => {
        $elements = $(element);
        pageNo = $elements.find("a").html();
        pageNumbers.push(pageNo);
    });

    return await [anime_list, pageNumbers];
}

async function anime(_anime_name) {
    episode_array = [];

    res = await axios.get(`https://gogoanime.vc/category/${_anime_name}`);
    const body = await res.data;
    const $ = cheerio.load(body);

    img_url = $("div.anime_info_body_bg  img").attr("src");
    anime_name = $("div.anime_info_body_bg  h1").text();
    anime_about = $(
        "div.main_body  div:nth-child(2) > div.anime_info_body_bg > p:nth-child(5)"
    ).text();

    anime_about = $(
        "div.main_body  div:nth-child(2) > div.anime_info_body_bg > p:nth-child(5)"
    ).text();

    //add the new code here
    el = $("#episode_page");

    ep_start = 1;

    ep_end = el.children().last().find("a").attr("ep_end");

    for (let i = ep_start; i <= ep_end; i++) {
        episode_array.push(`${_anime_name}-episode-${i}`);
    }

    anime_result = {
        name: anime_name,
        img_url: img_url,
        about: anime_about,
        episode_id: episode_array,
    };

    return await anime_result;
}

async function watchAnime(episode_id) {
    res = await axios.get(`https://gogoanime.vc/${episode_id}`);
    const body = await res.data;
    $ = cheerio.load(body);

    episode_link = $("li.dowloads > a").attr("href");

    ep = await getDownloadLink(episode_link);

    return await ep;
}

// const epLink = async (link) => {
//     const res = await axios(link);
//     const body = await res.data;
//     const $2 = cheerio.load(body);
//     const videoUrl = $2("#container > div > span > a").attr("href");
//     return await videoUrl;
// };

// const sbDownloadLink = async () => {
//     return new Promise(async (resolve, reject) => {
//         const res = await axios("https://sbplay.one/d/lxm7bnpd7d9h.html");
//         const body = await res.data;
//         const $ = cheerio.load(body);
//         let urls = [];

//         $("#container > div > table > tbody > tr").each(
//             async (index, element) => {
//                 const $element = $(element);
//                 let d = $element.find("a").attr("onclick");
//                 if (!d) return;
//                 d = d.match(/'([^']+)'/g).map((e) => e.replace(/'/g, ""));
//                 d = `https://sbplay.one/dl?op=download_orig&id=${d[0]}&mode=${d[1]}&hash=${d[2]}`;
//                 const videoUrl = await epLink(d);

//                 const qualtiy = $element.find("td:nth-child(2)").html();
//                 urls.push({
//                     ep_link: videoUrl,
//                     quality: "watch " + qualtiy,
//                 });
//                 if (urls.length === 2) {
//                     resolve(urls);
//                 }
//             }
//         );
//     });
// };

//dragon-quest-dai-no-daibouken-2020-episode-45

async function getDownloadLink(episode_link) {
    ep_array = [];

    res = await axios.get(episode_link);
    const body = await res.data;
    $ = cheerio.load(body);

    $("div.mirror_link div").each((index, element) => {
        ep_name = $(element).find("a").html();
        ep_link = $(element).find("a").attr("href");

        ep_dic = {
            quality: ep_name.replace("Download\n", "watch").replace(/ +/g, ""),
            ep_link: ep_link,
        };

        ep_array.push(ep_dic);
    });

    return await urls;
}

const a = (d) => {
    const promise = new Promise(async (resolve, reject) => {
        res3 = await axios(d);
        const body3 = await res3.data;
        $3 = cheerio.load(body3);
        videoUrl = $3("#container > div > span > a").attr("href");
        setTimeout(() => {
            resolve(videoUrl);
        }, 500);
    });
    return promise;
};

//lxm7bnpd7d9h.html
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

module.exports = {
    popular,
    newSeason,
    search,
    anime,
    watchAnime,
    recentRelease,
    tags,
    getSBDownloadLink,
};
