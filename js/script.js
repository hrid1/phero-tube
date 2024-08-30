// console.log("Hi")
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  //   console.log(data);
  displayCategory(data.data);
};

const displayCategory = (data) => {
  const categoryDiv = document.getElementById("category-container");

  data.forEach((item) => {
    // console.log(item.category);
    const newCategory = document.createElement("button");
    newCategory.classList.add("btn", "cat-btn", "rounded-lg", "bg-red-200");
    newCategory.setAttribute("id", `${item.category_id}`);
    newCategory.addEventListener("click", () =>
      handleCategoryBtn(`${item.category_id}`)
    );

    newCategory.innerText = item.category;
    categoryDiv.append(newCategory);
  });
};
// --------------Handle Category Button----------
const handleCategoryBtn = (data) => {
  btnBgChagne(data);
  loadContent(data);
//   console.log(data);
};

// --------------bg-change-of-button-------------
const btnBgChagne = (categoryId) => {
  let allCategoryBtn = document.querySelectorAll(".cat-btn");
  allCategoryBtn = [...allCategoryBtn];

  allCategoryBtn.forEach((element) => {
    if (element.classList.contains("bg-red-500")) {
      element.classList.remove("bg-red-500", "text-white");
      element.classList.add("bg-red-200");
    }
  });

  //   bg red change
  const activeBtn = document.getElementById(categoryId);
  activeBtn.classList.remove("bg-red-200");
  activeBtn.classList.add("bg-red-500", "text-white");
  //   console.log(activeBtn);
};

// ----------load video------------
const loadContent = async (cid = '1001') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${cid}`
  );
  const data = await res.json();
  // console.log(data.data);
  displayVideo(data.data);
};

const displayVideo = (videos) => {
  //   console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  console.log(videos.length);
  if (videos.length === 0) {
    videoContainer.innerHTML = `<div class="flex flex-col gap-4 items-center justify-center col-span-4 h-20 mt-20">
         <i class="fa-sharp fa-solid fa-ban text-5xl text-red-600 "></i>
        <h3 class="mx-auto text-4xl font-bold text-black text-center md:w-1/3">
          Oops!! Sorry, There is no  content here
        </h3>
      </div>
      `;
  }
  videos.forEach((video) => {
    // console.log(video.authors);
    const newVideo = document.createElement("div");
    newVideo.classList.add("card", "card-compact", "bg-base-100");
    newVideo.innerHTML = `

            <div class="h-52">
                 <img
              src="${video.thumbnail}"
              class="rounded-md h-full w-full object-cover"
            />
            </div>
          
          <div class="flex items-start gap-2 mt-4 p-1">
            <!--  -->
            <div class="w-12 h-12 rounded-full">
              <img
                class="w-full h-full rounded-full object-cover"
                src="${video.authors[0]?.profile_picture}"
              />
            </div>

            <!--  -->

            <div>
              <h2 class="card-title">
                ${video.title}
              </h2>
              <p class="flex gap-2">
                <span>  ${video.authors[0]?.profile_name} </span>
                <span class="${
                  video.authors[0]?.verified ? "block" : "hidden"
                } "><i class="fa-duotone fa-solid fa-badge-check"></i></span>
              </p>

              <p>${video.others?.views} views</p>
            </div>
          </div>
        
        `;

    videoContainer.appendChild(newVideo);
  });
};

loadCategory();

loadContent();
