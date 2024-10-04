const loadAllPost = async category => {
  document.getElementById('post-container').innerHTML = '';
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ''
    }`
  );

  const data = await response.json();
  displayAllPost(data.posts);
};

const displayAllPost = posts => {
  const postContainer = document.getElementById('post-container');
  posts.forEach(post => {
    const div = document.createElement('div');

    div.innerHTML = `
  <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#f3f3f5] rounded-3xl">
        <div class="indicator">
          <span class="indicator-item badge ${
            post.isActive ? 'bg-green-600' : 'bg-red-500'
          }"></span>
          <div class="avatar">
            <div class="w-24 rounded-xl">
              <img src="${post.image}" />
            </div>
          </div>
        </div>
        <div class="space-y-4 w-full">
          <div class="flex gap-4 opacity-60">
            <p>${post.category}</p>
            <p>author: ${post.author.name}</p>
          </div>
          <h3 class="text-2xl font-bold opacity-70">${post.title}</h3>
          <p class="opacity-40">${post.description}</p>
          <hr class="border border-dashed border-gray-300" />
          <div class="flex justify-between ">
            <div class="flex gap-4">
              <div class="space-x-2 flex items-center">
                <i class="fa-solid fa-comment-dots"></i>
                <p>${post.comment_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                <i class="fa-solid fa-eye"></i>
                <p>${post.view_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-clock"></i>
                <p>${post.posted_time} mins ago</p>
              </div>
            </div>
            <div class="opacity-100">
              <button onclick="markAsRead('${post.description}', '${
      post.view_count
    }')" id="addToList"
    )}' class="addToList btn btn-circle bg-green-500  btn-sm">
                <i class="fa-regular fa-envelope-open text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    postContainer.appendChild(div);
  });
};

const markAsRead = (description, view_count) => {
  const markAsReadContainer = document.getElementById('markAsReadContainer');
  const div = document.createElement('div');
  div.innerHTML = `
              <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
                <div class="lg:w-4/5 w-11/12">
                  ${description}
                </div>
                <div class="lg:w-1/5 w-4/12 flex justify-end">
                  <p>
                    <i class="fa-solid fa-eye"></i>
                      ${view_count}
                  </p>
                </div>
              </div>
  `;
  markAsReadContainer.appendChild(div);
  handleCount();
};

const handleCount = () => {
  const prevCount = document.getElementById('markAsReadCounter').innerText;
  const convertedCounter = parseInt(prevCount);
  const sum = convertedCounter + 1;
  document.getElementById('markAsReadCounter').innerText = sum;
};

const handleSearchByCategory = () => {
  const searchText = document.getElementById('searchPosts').value;
  loadAllPost(searchText);
};

loadAllPost();
