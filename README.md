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

It is completely safe to maintain to separate trees of flagged items. 
Simply set the `namespace` prop on the `FlaggableProvider`

## Development and Testing

There is a _very_ simple test application in `demo/index.html`. It loads `index.jsx`. You can run the 
webpack dev server with:

`$ npm run start`

Test with:

`$ npm run test`
