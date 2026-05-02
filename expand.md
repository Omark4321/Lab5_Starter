# Expand Your Horizons

## 1. Why is it important to put thought into IDs and Classes when working at the intersection of HTML, CSS, and JS?

IDs and classes are basically the contract between HTML, CSS, and JS. If you change an ID in HTML your CSS selector breaks AND your `getElementById` call in the JS breaks at the same time. So whatever you name them ends up being a load-bearing part of your codebase, even though it kinda feels like an afterthought when you're writing markup.

Naming them semantically matters too. If you call a class `red-button` and then the design changes, you end up with a class called "red" that's actually blue, which is the kind of thing that haunts a project for years. Better to name based on what it IS, like `primary-button`, not what it looks like right now.

The other thing is the difference between IDs and classes. IDs should be unique on a page, classes can repeat. If you grab elements by class but treat them like a single thing you'll get bit by `getElementsByClassName` returning a list and you forget the `[0]` index. Just thinking for 5 seconds about which one you actually need saves a lot of debugging.

## 2. What are some advantages of using Data Attributes? Are there any disadvantages? When you respond, think about how Data Attributes might interact with CSS and JS. Are there any potentially negative implications for using Data Attributes when it comes to Microdata?

Data attributes are custom attrs starting with `data-` like `data-user-id="42"`. You access them in JS via `element.dataset.userId` (note the camelCase conversion) or the longer `getAttribute('data-user-id')`. CSS can read them too with attribute selectors like `[data-state="open"]`, which is super handy for styling based on state without needing extra classes.

Big advantage is you can stash arbitrary info on elements without making up fake attributes that the HTML spec doesn't know about. Before data attrs, people would just throw random attributes on stuff and hope nothing broke, which was bad for validators and screen readers. Now you have a sanctioned place to put your own data.

Disadvantages... you can overdo it and end up with state living in the DOM that should really live in your JS state somewhere. Also it's still a string, so if you stuff JSON in there you're constantly parsing/stringifying which gets messy.

Microdata is a totally different thing tho. Microdata uses `itemscope`/`itemprop` for semantic web stuff that search engines actually parse and understand. If you tried to use data attributes for SEO purposes thinking Google would read them, you'd be wrong. Google doesn't care about your `data-` attrs. So don't confuse the two, they look similar but solve totally different problems.

## 3. What is the (DOM) Shadow Root and ShadowDOM and what are some advantages and disadvantages of using it?

Wait, the prompt said DOM fragment. Let me answer that one.

A DocumentFragment is basically a lightweight DOM node that exists in memory without being attached to anything. You can build up a bunch of children inside it, and then when you append the whole fragment to the actual DOM, only the kids get inserted, not the fragment itself.

The reason this is powerful is performance. Every time you directly append to the live DOM, the browser may trigger reflow and repaint. If you're doing 1000 inserts in a loop that's 1000 chances for the browser to recompute layout. With a fragment you do 999 of those inserts off-DOM (free, no reflow) and then one single insert into the live DOM. Way faster for big batches.

It's also nice because you can pass a fragment around as a single object, which feels cleaner than passing an array of nodes.

## 4. What is the difference between the DOM and the Virtual DOM?

The DOM is the real thing: the actual tree of nodes that the browser is rendering and that you can poke at with `document.querySelector` etc. Updating it is "expensive" because changes can trigger style recalcs, layouts, paints.

The Virtual DOM is a JS-object representation of what the DOM should look like. Frameworks like React keep one of these in memory. When state changes, the framework builds a new virtual tree, diffs it against the old one, and only writes the differences to the real DOM.

You gain a few things. First, perf when you have lots of state changes - you batch them into one efficient DOM update instead of triggering reflow over and over. Second, way nicer dev experience because it's declarative. You just say "given this state, the UI should look like this" and the framework figures out the diff. No manually tracking which DOM nodes need updating.

What you lose: there's overhead to maintaining the virtual tree in memory plus running the diffing algorithm on every render. For very simple apps it can actually be slower than direct DOM manipulation. And there's an extra layer between you and the real DOM, so when something weird happens you have to debug through React's reconciler instead of just stepping through your own code.

## 5. Why do we use the className attribute in JavaScript instead of the standard class?

Because `class` is a reserved word in JavaScript. ES6 added the `class` keyword for class declarations, so the parser can't really let you do `element.class = "foo"` without ambiguity. They went with `className` instead to dodge the conflict. Same exact reason `for` on labels becomes `htmlFor` in JSX.

It's basically a leaky abstraction caused by JS keyword choices. You can argue they should've reserved `className` from the start so it'd feel less weird, but here we are. Worth noting that newer DOM API gives you `element.classList` which is way nicer than fiddling with the className string directly.

## 6. What is the difference between using an event listener like `addEventListener` and the `onclick` (or any `on*` for that matter) attribute? What are some advantages and disadvantages of one or the other?

The big difference is `addEventListener` lets you attach multiple handlers to the same event. If you call `element.addEventListener('click', fn1)` and then again with `fn2`, both run when you click. With `onclick` (the property assignment), the second one overwrites the first because you're just setting a property.

`addEventListener` also gives you options like `{ once: true }`, `{ passive: true }`, and choosing between capture and bubble phases. None of that exists with `onclick`. So it's just way more flexible.

Disadvantages: it's more verbose, and if you ever want to remove a handler you need to call `removeEventListener` with a reference to the same function. So you can't use an anonymous arrow inline if you wanna unhook it later. With `onclick` you can just do `element.onclick = null` and you're done.

`onclick` is dead simple but limited and feels old-school. For anything other than throwaway code I'd just always reach for `addEventListener`.
