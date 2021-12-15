module.exports = {
  "stories": ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)", '../client/src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", 'storybook-addon-mock/register'],
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  }
};
