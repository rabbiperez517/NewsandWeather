const newsGrid = document.getElementById("newsGrid");

async function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=86be565cbe024a42b24fefec81506cd8`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data); // debug

    // Clear old news
    newsGrid.innerHTML = "";

    data.articles.forEach(article => {
      // Skip if no image
      if (!article.urlToImage) return;

      const card = document.createElement("div");
      card.classList.add("news_card");

      card.innerHTML = `
        <img src="${article.urlToImage}" alt="News Image">
        <h3>${article.title}</h3>
        <p>${article.description ? article.description.substring(0, 100) + "..." : ""}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;

      newsGrid.appendChild(card);
    });

  } catch (error) {
    console.log("Error fetching news:", error);
  }
}

fetchNews();
