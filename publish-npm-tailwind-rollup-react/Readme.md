# Attempt to publish NPM package using Tailwind, React and Rollup

The guide followed: [Making an NPM package for a React component library with Tailwind CSS] (https://dev.to/samrobbins85/making-an-npm-package-for-a-react-component-library-with-tailwind-css-a0h) by Sam Robbins

## Errors spotted in the guide

The end result won't work because Sam didn't included Babel configuration in rollup which results in syntaxerror as Rollup cannot read JSX.

You need to install @rollup/plugin-bable @babel/core and @babel/preset-react and add extra config to rollup.config (see the file in this repo)

## Differences in this repo compared to Sam's example

I'm using three free example components from [TailwindUI] (https://tailwindui.com/)
As these components are importing elements from Node then to to male Rollup understand this you need to install @rollup/plugin-nodre-resolve and configure rollup.config accordingly (see an example in this repo).
I'm also using @rollup/plugin-replace to make Rollup build for production. I configured it because when I ran rollup using <code>NODE_ENV=production rollup -c</code> in terminal then the output.js remined over 100+kb.

## End result

When running either <code>rollup -c</code> or <code>NODE_ENV=production rollup -c</code> in terminal then the output.js generated is 100+kb which is not ideal as it should be around 10kb per full project: [Tailwind perfomance] (https://tailwindcss.com/docs/optimizing-for-production)

Install package: <code>npm i publish-npm-tailwind-rollup-react</code>

Import to a project: <code>import { Hero } from "publish-npm-tailwind-rollup-react"</code>

Result: The package does not include Tailwind CSS styles by default. It works only if Tailwind UI is configured in Gatsby. But only in development mode. It won't work in production.
