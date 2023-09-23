# General Notes

## File Structure

Generally, file structure in this application is very difficult to follow. Naming is a huge issue, as there are no files that truly express the function or noun of what the file is.

### Unecessary Files

- `~/User.html`
- `~/assets/react.svg`
- Every CSS can go in the `index.css` by all appearances. It didn't seem there were any collisions
- `Search.jsx` is only an input and can be added directly to another component

### Unecessary Folders

- excessive folders add complexity to the application. This is not a folder/file routed project, so there's no need to have each "page" or section in its own folder

## Formatting

Formatting in this project is quite poor, and makes it extremely difficult to navigate or read. Please use something like `Prettier` to format your page.

1. download prettier from the extensions store in vs code.
2. Right click on text inside a js file
3. In the context menu select `format document with...`
4. At the top of vs code select `configure default formatter`
5. Select `Prettier` as your formatter

## Supposed Misconceptions

### HTML vs SPA

HTML is only to be used in this application as an entrypoint for React, on index.html. The `<body>` tag should have a `<div>` inside with a 'root' or 'app' id attribute, or some other identifiable naming.

The `User.html` leads me to believe that you are under a misunderstanding of what React does, and how navigations are performed in it. When we navigate, for example `www.home.com` has an `index.html` that is called at `/`. If we navigate in HTML to `www.home.com/User` then we would expect to go to the user.html. However, our React application doesn't have a User route defined on it, and your users will get confused when they are sent to the User route and nothing works.

I suspect this is part of the issue of your page not working. Additionally, it has no access to any of the files inside the `~/src` folder.

### Routes

Routes defined in your application are being defined in a module called React-Router (accompanying React-Router-DOM).

This creates a history object which works along with the navigation scheme inside your browser. To define what gets displayed when you're at a given route, the `<Routes>` tag/component shares one of its children, whichever matches the path you currently are at.

the `<Route>` tag/component is given as a child to `<Routes>`.

I suggest simplifying this by using a route object and `createBrowserRouter` instead. In addition, doing so gives access to `<Outlet>` and `useOutletContext`.

### Controlled Virtual DOM (VDOM) vs DOM in browser

I noticed that inside of React component `User.jsx` (`~/src/components/User.jsx`) you are using `document.getElementBy...` or other element queries. Those are not allowed in React and won't function. React creates a website inside of a website by generating page data, then creating or pruning elements as necessary on the real browser DOM.
