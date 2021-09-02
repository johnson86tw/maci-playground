module.exports = {
  lang: "en-US",
  title: "MACI Playground",
  description: "maci playground",
  themeConfig: {
    repo: "chnejohnson/maci-playground",
    docsDir: "docs",

    editLinks: false,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [
      {
        text: "Packages",
        link: "/packages/maci-cli",
        activeMatch: "^/packages/",
      },
      {
        text: "Specifications",
        link: "/specs/01_introduction",
        activeMatch: "^/specs/",
      },
      {
        text: "Official Docs",
        link: "https://appliedzkp.github.io/maci/index.html",
      },
      {
        text: "MACI Github",
        link: "https://github.com/appliedzkp/maci",
      },
    ],

    sidebar: {
      "/packages/": getPackagesSidebar(),
      "/specs/": getSpecsSidebar(),
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
  ];
}

function getPackagesSidebar() {
  return [
    {
      text: "Packages",
      children: [
        { text: "MACI CLI", link: "/packages/maci-cli" },
        { text: "MACI Core", link: "/packages/maci-core" },
        { text: "MACI Domain Objects", link: "/packages/maci-domainobjs" },
        { text: "MACI Crypto", link: "/packages/maci-crypto" },
        { text: "MACI Circuits", link: "/packages/maci-circuits" },
      ],
    },
  ];
}

function getSpecsSidebar() {
  return [
    {
      text: "Specifications",
      children: [
        { text: "Introduction", link: "/specs/01_introduction" },
        { text: "Contract", link: "/specs/02_contract" },
        { text: "Circuits", link: "/specs/03_circuits" },
        { text: "State Root Transition Circuit", link: "/specs/04_state_root_transition_circuit" },
        { text: "Quadratic Vote Tallying Circuit", link: "/specs/05_quadratic_vote_tallying_circuit" },
        { text: "F&Q", link: "/specs/faq" },
      ],
    },
  ];
}
