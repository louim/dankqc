const axios = require('axios');
const cheerio = require('cheerio');


async function processPage(pageNumber = 1) {
  const pageUrl = `https://www.sqdc.ca/fr-CA/Rechercher?keywords=*&sortDirection=asc&page=${pageNumber}`
  const page = await axios.get(pageUrl);
  const productSelector = '[data-product-id]';
  const $ = cheerio.load(page.data);

  console.log(`Processing Page ${pageNumber}`);

  const pageItems = [];
  $(productSelector).each((index, productHtml) => {
    const product = $(productHtml);
    const link = product.find('a[aria-hidden="true"]');
    const item = {
      productId: link.data('productid'),
      link: link.prop('href'),
      outOfStock: product.find('.product-outofstock-title.hide').length == 0,
      name: product.find('[data-qa="search-product-title"]').text()
    };

    pageItems.push(item);
  });

  return pageItems;
}

async function loadProducts() {
  const pageForPagination = await axios.get('https://www.sqdc.ca/fr-CA/Rechercher?keywords=*&sortDirection=asc&page=1');
  const $ = cheerio.load(pageForPagination.data);
  const paginationSelector = 'nav[aria-label="Pagination"]';
  const numberOfpages = $('body').find(paginationSelector).first().find('li').length - 2 ;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= numberOfpages; pageNumber++) {
    pages.push(processPage(pageNumber))
  }
  const products = [].concat(...await Promise.all(pages));
  const inStockProducts = products.filter(product => !product.outOfStock);
  // console.log('All products');
  // console.log(products);

  console.log('In stock products');
  console.log(inStockProducts);
}

loadProducts();
