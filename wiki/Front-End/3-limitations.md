## TODO & JSX Limitations

1. We could also transpile `require` statements into `import`s so that the browser can serve them properly, without having to polyfill the `require` method.
1. Comments are supported as long as `{}` and `<>` are balanced within them which is pretty normal if you're commenting blocks out.
    %EXAMPLE: ./example/limitations/comments%
    <fork lang="jsx">
      node_modules/.bin/jsx wiki/Front-End/example/limitations/comments.jsx
    </fork>
1. No curly braces in components' attributes are allowed.
    %EXAMPLE: ./example/limitations/curly%
    <fork stderr lang="jsx">
      node_modules/.bin/jsx wiki/Front-End/example/limitations/curly.jsx
    </fork>
1. No `>` sign inside components is permitted. Use `&gt` or take comparisons outside JSX tag.
    %EXAMPLE: ./example/limitations/gt%
    <fork stderr lang="jsx">
      node_modules/.bin/jsx wiki/Front-End/example/limitations/gt.jsx
    </fork>
    ```jsx
    // updated
    const hasNextPage = length > 10
    render(<div title="hello &gt; world">
      {hasNextPage && <span>Next Page</span>}
    </div>)
    ```