# React Flaggables

Provide a component, state management, and effect for handling storage of lists of "flagged" items.

## Usage

Simply wrap the section of the component tree that needs to access state information about the currently flagged items:

```
<FlaggableProvider namespace="ns1" defaultState={{
  flagged: {
    ns1: MyGetItemsArrayOfIds(ns1)
  }
}}>
  <AnItem>
    <h2>An Item!</h2>
    <Flag id={id} namespace="ns1" />
  </AnItem>
</FlaggableProvider>
```

## 'Persistent' Storage

Users may pass any (sync) function they like to 'set' the list of flagged items per namespace. This function
should accept parameters of `namespace` and `id`. This function is invoked by `useEffect` in the `Flag` component.

Implementors are responsible for hydrating the list of flagged items per namespace. Something like:

```
const e = document.getElementById('thing');
const namespace = 'ns1';
const currentItems = getItems(namespace);
ReactDOM.render(
  <FlaggableProvider
    namespace={namespace}
    defaultState={{
      flagged: {
        [namespace]: currentItems,
      },
    }}
  >
    <FlagCounter namespace={namespace} label="Favorites" />
    <Flag id="things" namespace={namespace}>Things</Flag>
    <Flag id="things2" namespace={namespace}>Things2</Flag>
    <Flag id="things3" namespace={namespace}>Things3</Flag>
  </FlaggableProvider>, e,
);
```

## Multiple Trees/Namespaces

It is completely safe to maintain separate trees of flagged items. 
Simply set the `namespace` prop on the `FlaggableProvider`

## Usage with React Portals

A common UI workflow might be to have a list in the top of an app. And a list of items in the content section. If the
application can't render both elements in the same tree. Using a Portal can allow implementors to render the flag elemtns
anywhere they choose:

```
/**
 * Wrap flags in a portal so they can be rendered outside of the
 * component tree.
 * @type {NodeListOf<Element>}
 */
const flagDomNodes = document.querySelectorAll('.favorites-flag');
const Flags = () => [...flagDomNodes].map(f => ReactDOM.createPortal(<Flag
  className="fa fa-heart"
  namespace="favorites"
  id={f.getAttribute('data-id')}
/>, f));

const favoritesCounter = document.querySelector('.favorites-counter');
const favs = getItems('favorites');
if (favoritesCounter) {
  ReactDOM.render(
    <FlaggableProvider
      namespace="ecsm-favorites"
      defaultState={{
        flagged: {
          'favorites': favs,
        },
      }}
    >
      <FlagCounter namespace="favorites" label="Favorites" />
      { flagDomNodes.length ? <Flags /> : null }
    </FlaggableProvider>, favoritesCounter,
  );
}

```

## Development and Testing

There is a _very_ simple test application in `demo/index.html`. It loads `index.jsx`. You can run the 
webpack dev server with:

`$ npm run start`

Test with:

`$ npm run test`
