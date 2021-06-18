// constants
const sidebar = document.querySelector("#aside");
const openSidebarBtn = document.querySelector("#open");
const closeSidebarBtn = document.querySelector("#close");
const categories = document.querySelectorAll(".category");
const sectionMain = document.querySelector("main .grid");

// events
openSidebarBtn.onclick = () => {
  sidebar.classList.add("active");
};

closeSidebarBtn.onclick = () => {
  sidebar.classList.remove("active");
};

const dummyDataWithNewFields = dummyData.map((item) => {
  const numberIngredients = item.ingredients.length;
  const totalPrice = item.cartlines
    .reduce(function (acc, obj) {
      return acc + parseNumber(obj.price);
    }, 0)
    .toFixed(2);

  return {
    ...item,
    numberIngredients,
    totalPrice,
  };
});

let renderProductItem = (product) => {
  const { name, totalPrice, numberIngredients, url, time } = product;

  const productHtml = document.createElement("div");
  productHtml.className = "w-full";

  productHtml.innerHTML = `  
        <div class="max-w-screen-md mx-auto h-full">
          <div class="bg-white md:h-48-- rounded-lg shadow-lg flex flex-wrap h-full">
            <div class="w-full">
              <img
                src="${url}" 
                alt=""
                class="object-cover h-38 w-full rounded-t-lg"
              />
            </div>
            <div class="w-full px-4 py-3">
              <h3 class="text-1xl font-bold">${name}</h3>
            </div>

            <div class="w-full flex items-center justify-between px-4 py-3">
              <div>
                <p class="font-medium">Entrega en ${time}</p>
                <div class="flex items-center">
                  <span class="text-xs font-medium text-gray-600">N° Ingredientes</span>
                  <span class="text-xs font-medium ml-1 text-indigo-500">${numberIngredients}</span>
                </div>
              </div>
              <span class="flex items-center h-8 bg-black text-white text-sm px-2 rounded">$${totalPrice}</span>
            </div>
          </div>
        </div>
    `;

  return productHtml;
};

const renderItems = (products) => {
  // clean html
  sectionMain.innerHTML = "";
  products.forEach(function (product) {
    const html = renderProductItem(product);
    document.querySelector("main .grid").appendChild(html);
  });
};

const filterItemsByCategory = (category) => {
  return dummyDataWithNewFields.filter(
    (item) => item.category.id === Number(category)
  );
};

categories.forEach((category) => {
  category.addEventListener("click", (e) => {
    categories.forEach((cat) => {

      let categoryValue = cat.getAttribute("data-category");
      if (cat.classList.contains("active")) {
        cat.classList.remove("active");
      }

      if (
        Number(category.getAttribute("data-category")) === Number(categoryValue)
      ) {
        if (Number(categoryValue) !== 0) {
          renderItems(filterItemsByCategory(categoryValue));
        } else {
          renderItems(dummyDataWithNewFields);
        }
      }
      e.currentTarget.classList.add("active");
    });
  });
});

renderItems(dummyDataWithNewFields);
