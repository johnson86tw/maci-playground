module.exports = {
  lang: "en-US",
  title: "MACI Docs",
  description: "maci docs",
  themeConfig: {
    repo: "chnejohnson/maci-playground",
    docsDir: "docs",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [],

    sidebar: {
      "/": getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: "Introduction",
      children: [
        { text: "What is MACI?", link: "/" },
        { text: "Getting Started", link: "/getting-started" },
      ],
    },
    {
      text: "Packages",
      children: [
        { text: "MACI CLI", link: "/maci-cli" },
        { text: "MACI Core", link: "/maci-core" },
      ],
    },
  ];
}
