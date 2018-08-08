# d.school

[Structure](#structure)

[Development](#development)

[CMS Specifics](#cms-specifics)


## Structure

- All dev files are located in the `app/` directory. 
- The styles are written with LESS and are located in the `app/styles/` directory.
- The script files are in `app/scripts/` and they are transpiled using Babel.
- The `template/` directory is a build output aand a submodule thaat references the theme git repo.

## Development

The project can be be run locally via the following npm scripts:

1. `npm install` - Sets up all dependencies.
2. `npm run dev` - Runs the build process and watches for file changes.
3. `npm run server` - Starts the local [SquareSpace dev server](https://developers.squarespace.com/local-development/).

> **Note:** Yarn does not work due to a licensing issue.

We don't have a livereloader on anything except for the styles. For it to work, a [browser extension](http://livereload.com/extensions/) is neeeded.

### Styleguide

#### CSS

We're using the [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) methodology for naming things and encapsulating, with a few additions.

1. Page classes are introduced. They live in the `styles/pages` directory. Page classes are identified by the `Page` prefix to a class wrapper and the prefix `p-` for page specific components. Example:

  ```html
  <section class="PageAbout">
    <h1 class="p-Title">Hello World</h1>
  </section>
  ```
  
  ```css
  .PageAbout .p-Title {
    color: red;
  }
  ```

2. Typography classes, prefixed with `t-`, should have general purpose typography styles that can be extended in other components.

Each “reusable” component should be placed in a directory like `styles/components/[name-of-component]`. These components are always completely decoupled and should not change other components directly. 

Note that all CSS declarations should be ordered in alphabetical order.

#### JS

We're using the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with a few changes found in the `.eslintrc` file. Please make sure all JavaScript lint (run `npm run lint` to test) before making pull requests.

## CMS Specifics

A few things to make note of:

- All of "our" scripts are disabled in the admin.
- To insert a social hey howdy card, use the `Code` block with a single URL in it.
- To create a general purpose hey howdy card, use the `Markdown` block.
