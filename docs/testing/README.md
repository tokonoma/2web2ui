# Testing

This section of our documentation provides guidance on how we test our code.  It is important to note that writing tests is not just a task to confirm your code works as expected, but an exercise to validate your code design.  If your code is hard to test, consider a refactor.


## Tools

These are the notable tools used to get the job done.

 * [Jest](https://jestjs.io/) - This is the test runner (e.g. mocha) that includes an assertion library (e.g. chai), a stubbing/mocking library (e.g. sinon), and test coverage reports (e.g. istanbul).
 * [Enzyme](https://airbnb.io/enzyme/) - This is a utility used to mimic rendering, simulate events, and inspect our components.
 * [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme#assertions) - This is an assertion library that provides enzyme specific matchers (e.g. `toHaveProp`).
 * [Coveralls](https://coveralls.io/) - This is a service used to provide [test coverage analysis](https://github.com/SparkPost/2web2ui/pull/834#issuecomment-466549343) in your pull requests.


## Layers

As described in [The Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html#TheTestPyramid), these are the test layers used for a healthy, fast, and maintainable test suite.

 * Unit
 * [Integration](../../src/__integration__/README.md)


## Principles

These are general rules to follow.

 * Deterministic Test Suite
 * Unit Test First
 * [Sociable Isolation](https://martinfowler.com/articles/practical-test-pyramid.html#SociableAndSolitary) - mock imports in unit tests at your own discretion
 * Explicit, Not Implicit - avoid using [manual mocks](https://jestjs.io/docs/en/manual-mocks)
 * Assert Outputs Not Internals


## Patterns

These are common patterns for testing our basic file types.

 * [Action Creators](patterns/action-creators.md)
 * [Component Calls Prop Function](patterns/component-calls-prop-function.md)
 * [Component Events](pattern/component-events.md)
 * [Component Inspection](patterns/component-inspection.md)
 * [Component Looks Good](patterns/component-looks-good.md)
 * [Component State Changed](patterns/component-state-changed.md)
 * [Component Renders Render Prop](patterns/component-renders-render-prop.md)
 * [Dependency Injection](patterns/dependency-injection.md)
 * [Helpers](patterns/helpers.md)
 * [Reducers](patterns/reducers.md)
 * [Selectors](patterns/selectors.md)
