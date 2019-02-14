# Testing Conventions

* `tests/` folders are to be included as a sibling to the files they test, with all test files for that folder contained inside the `tests/` directory there.

* We use jest for testing and, as much as possible, for all unit test mocking. See our [jest guide](./docs/jest.md) for how we accomplish this black magic.

* Always prefer to use built in jest assertions over generic equality comparisons:
    ```javascript
    // do this
    expect(fn).toHaveBeenCalledWith(arg1, arg2);

    // not this
    expect(fn.mock.calls[0]).toEqual([arg1, arg2]);
    ```

* We use *a lot* of snapshot testing. It works great for anything serializable. We first thought we would keep these tests separate in their own files but that turned out to be a silly idea, Jason. Now we just incorporate them into any test where they make sense, so you'll see lots of `tests/__snapshots__` directories all over.

* We use a good amount of enzyme for any kind of logic testing (simulating actions in a component) or for shallow rendering, usually so we can snapshot test something without testing all of its dependency components.

* We believe in direct regular old unit testing wherever possible, mostly for helpers. In other words, if we don't have to involve react in a test, we don't.

* We try not to unit test redux, i.e. no tests for connected components or for mapStateToProps functions etc., we mock connected state and actions and pull any mapStateToProps logic into selectors where they can be tested more easily. We do sometimes use redux-mock-store to test chains of dispatches, but in those cases we just end up snapshot testing the dispatch chain.
