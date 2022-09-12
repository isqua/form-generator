# Form Generator

Without elaborating, check out [the demo](https://isqua.github.io/form-generator/).

This is a react app I created as a test assignment to show my front-end skills. The task was:

> Сreate an application in React & TypeScript where a user can generate forms from JSON declaration. They enter JSON and see the form. That’s it!

## App Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so I reuse what it offers.

I also added [eslint](https://npmjs.com/package/eslint) with some popular presets, you may check out the full configuration in [.eslintrc.json](./.eslintrc.json). I use `@typescript-eslint`, `eslint` and `eslint-plugin-react` recommended presets mostly for code issues coverage, and `airbnb` presets mostly for code style. So I’m sticking to these rules, e.g. they [prefers](https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react.js#L525-L530) function declaration over arrow functions for components.

So, from a bird's eye view, the structure is as follows:

1. [index.tsx](./src/index.tsx) is an entrypoint. It finds the root DOM element and render the App.
1. [app/](./src/app) contains any app-level code.
    - [App.tsx](./src/app/App.tsx) is where the app is described. It can render several features and do the routing, but currently there is only one feature.
1. [features/](./src/features/) contains feature-specific code, directory per feature:
    - [FormGenerator](./src/features/FormGenerator/) is the main feature that allows a user to type in JSON and get a Form Preview.
        - [FormGenerator.tsx](./src/features/FormGenerator/FormGenerator.tsx) implements the full feature, the user scenario
        - [model/](./src/features/FormGenerator/model/) directory describes the data model and data flow of the feature. This is implemented with React [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook in a redux way.
        - [widgets/](./src/features/FormGenerator/widgets/) directory contains feature-specific domain-oriented widgets.
        - [types/](./src/features/FormGenerator/types/) directory describes feature-specific typings.
1. [shared/](./src/shared/) directory contains utils and non-specific components.

## Deep Dive into FormGenerator

The [FormGenerator](./src/features/FormGenerator/) feature workflow is as follows:
1. The [FormParser](./src/features/FormGenerator/widgets/FormParser/FormParser.tsx) takes user input and dispatches state change.
1. The [reducer](./src/features/FormGenerator/model/reducer.ts) handles this action and validates user input according to the [schema](./src/features/FormGenerator/schema/form.ts). Then it builds a new state with a *parsed* schema and/or validation errors. E.g., if there are some validation errors, we should not change or delete the schema, to show the last *valid* form.
1. Finally, the [FormBuilder](./src/features/FormGenerator/widgets/FormBuilder/FormBuilder.tsx) renders a form by the schema from the state (last valid state, I mean).

### How to add a new input type

1. First of all, describe the new input type: [FormGenerator/types](./src/features/FormGenerator/types/form.ts).
1. Then, write a schema in the [Ajv](https://ajv.js.org/guide/getting-started.html) to validate the input declaration. Don’t forget to add it to the general `formInputSchema`: [FormGenerator/schema](./src/features/FormGenerator/schema/input.ts) + [tests](./src/features/FormGenerator/schema/validate.test.ts).
1. Then teach the FormBuilder to render your new component: [FormGenerator/widgets/FormBuilder/FormField](./src/features/FormGenerator/widgets/FormBuilder/FormField.tsx) + [tests](./src/features/FormGenerator/widgets/FormBuilder/FormBuilder.test.tsx).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Uses [react-scripts](https://www.npmjs.com/package/react-scripts).

### `npm test`

Launches the test runner in the interactive watch mode.

Uses [react-scripts](https://www.npmjs.com/package/react-scripts), [jest](https://www.npmjs.com/package/jest) and [React Testing Library](https://www.npmjs.com/package/@testing-library/react).

### `npm run build`

Builds the app for production to the `build` folder.

Uses [react-scripts](https://www.npmjs.com/package/react-scripts).

### `npm run lint`

Runs code linters to check dumb errors and code style.

Uses [eslint](https://www.npmjs.com/package/eslint).

### `npm run lint:fix`

Fixes code issues and style.

Uses [eslint](https://www.npmjs.com/package/eslint).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## License

This app is [GPL licensed](./LICENSE).