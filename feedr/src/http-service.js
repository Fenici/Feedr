const articleURL="https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=4f5c246873f741b28ffe7f3f88251e8a";


class HttpService {
  getArticle = () => {
    return fetch(articleURL).then(res => res.json()).catch((err) => {
      console.log(err);
    })
  }
}

export default HttpService;
