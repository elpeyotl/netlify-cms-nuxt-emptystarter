export const state = () => ({
  blogPosts: [],
  pages: []
});

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list;
  },
  setPages(state, list) {
    state.pages = list;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {

    // Get Blog posts
    let blogFiles = await require.context(
      "~/assets/content/blog/",
      false,
      /\.json$/
    );
    let blogPosts = blogFiles.keys().map(key => {
      let res = blogFiles(key);
      res.slug = key.slice(2, -5);
      return res;
    });
    await commit("setBlogPosts", blogPosts);

    //Get all Pages
    let pageFiles = await require.context(
      "~/assets/content/pages/",
      false,
      /\.json$/
    );
    let pages = pageFiles.keys().map(key => {
      let res = pageFiles(key);
      res.slug = key.slice(2, -5);
      return res;
    });
    await commit("setPages", pages);
  }
};

export const getters = {
  retrievePage: (state) => (slug) => {
    return state.pages.find(page => page.slug === slug)
  }
}
